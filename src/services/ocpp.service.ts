import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  OCPP_CONTROLLER_META,
  OCPP_LOGGER_TOKEN,
  OCPP_MESSAGE_META,
  OCPP_SOCKET_PORT_TOKEN,
  OCPP_TLS_OPTIONS_TOKEN,
  OCPP_VERSIONS_TOKEN,
} from '../ocpp.constants';
import { DiscoveryService, ModulesContainer, Reflector } from '@nestjs/core';
import { SchemaRegistryService } from './schema.service';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { OcppClient, OcppError } from '../common';
import { WebSocket, WebSocketServer } from 'ws';
import { OcppVersion } from '../interfaces/ocpp.version';
import { OcppConnection } from '../common/connection';
import { IncomingMessage } from 'http';
import { SecureContextOptions } from 'tls';
import { OcppConfiguration } from '../interfaces';

@Injectable()
export class OcppService implements OnModuleInit {
  private readonly logger = new Logger(OCPP_LOGGER_TOKEN);
  private readonly clients: Map<string, OcppClient> = new Map();
  private readonly supported: string[];
  private readonly messageHandlers: Map<
    string,
    { version: OcppVersion; handler: (clientId: string, payload: any) => Promise<any> }
  > = new Map();
  private readonly wss: WebSocketServer;

  constructor(
    private readonly schemaRegistry: SchemaRegistryService,
    @Inject() private readonly discoveryService: DiscoveryService,
    @Inject(OCPP_VERSIONS_TOKEN) private readonly versions: OcppConfiguration[],
    @Inject(OCPP_SOCKET_PORT_TOKEN) private readonly port: number,
    @Inject(OCPP_TLS_OPTIONS_TOKEN) private readonly tlsOptions?: SecureContextOptions,
  ) {
    this.supported = this.versions.map((r) => r.version as string);
    const sup = this.supported;
    this.wss = new WebSocketServer({
      port: this.port,
      ...this.tlsOptions,
      handleProtocols(protocols: Set<string>) {
        for (const protocol of protocols) {
          if (sup.includes(protocol)) {
            return protocol; // Accept this subprotocol
          }
        }
        return false; // Reject connection if no supported protocol is found
      },
    });
  }

  onModuleInit() {
    this.registerHandlers();
    this.setupWebSocketServer();
  }

  private registerHandlers() {
    const controllers: InstanceWrapper[] = [];

    console.log(controllers);
    for (const controller of controllers) {
      const instance = controller.instance;
      const proto = Object.getPrototypeOf(instance);
      const version = undefined;
      //const version = this.reflector.get<string>(OCPP_CONTROLLER_META, instance.constructor) as OcppVersion;

      if (!version) continue;
      const methodNames = Object.getOwnPropertyNames(proto).filter(
        (name) => name !== 'constructor' && typeof proto[name] === 'function',
      );

      for (const methodName of methodNames) {
        console.log(methodName);
        const messageType = undefined;
        //const messageType = this.reflector.get<string>(OCPP_MESSAGE_META, proto[methodName]);
        if (messageType) {
          const handler = (clientId: string, payload: any) => proto[methodName].call(instance, clientId, payload);
          if (!handler) return;
          const key = SchemaRegistryService.generateKey(version, methodName);
          this.messageHandlers.set(key, { version, handler });
          this.logger.log(`Registered handler for ${messageType} (${version})`);
        }
      }
    }
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const clientId = OcppService.getIdentifier(req.url);
      if (clientId == undefined) throw new OcppError(OcppError.ProtocolError, 'Malformed client connection');

      const protocol = req.headers['sec-websocket-protocol'] || '';
      if (!this.supported.includes(protocol)) {
        throw new OcppError(OcppError.ProtocolError, 'Unsupported protocol');
      }

      const connection = new OcppConnection(protocol as OcppVersion, ws, undefined);
      const client = new OcppClient(clientId);
      client.setConnection(connection);
      this.clients.set(clientId, client);
      this.logger.log(`New OCPP ${protocol} charging station connected: ${clientId}`);
    });

    this.logger.log(`Server listening on port ${this.port}`);
  }

  static getIdentifier(url: string | undefined): string | undefined {
    try {
      if (url) {
        const encodedCpId = url.split('/').pop();
        if (encodedCpId) {
          return decodeURI(encodedCpId.split('?')[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }

  public getClient(id: string): OcppClient | undefined {
    return this.clients.get(id);
  }
}
