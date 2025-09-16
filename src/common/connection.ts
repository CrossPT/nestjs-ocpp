import { WebSocket } from 'ws';
import { OcppError } from './error';
import { Logger } from '@nestjs/common';
import { v4 } from 'uuid';
import { OcppVersion } from '../interfaces/ocpp.version';
import { OCPP_LOGGER_TOKEN } from '../ocpp.constants';
import { SchemaRegistryService } from '../services';

const CALL_MESSAGE = 2; // Chargepoint -> Central System
const CALLRESULT_MESSAGE = 3; // Central System -> Chargepoint
const CALLERROR_MESSAGE = 4; // Central System -> Chargepoint

export class OcppConnection {
  private readonly logger = new Logger(OCPP_LOGGER_TOKEN);
  pendingCalls: any = {};
  version: OcppVersion;
  socket: WebSocket;

  constructor(
    version: OcppVersion,
    socket: WebSocket,
    private registry?: SchemaRegistryService,
  ) {
    this.socket = socket;
    this.version = version;
    this.socket.on('message', (message) => {
      this.onMessage(message.toString());
    });
  }

  onMessage(message: string) {
    try {
      const [type, ...body] = JSON.parse(message);

      console.log(message);

      if (type === CALL_MESSAGE && body.length === 3) {
        const [messageId, action, payload] = body;
        this.onCall(messageId, action, payload);
      } else if (type === CALLRESULT_MESSAGE && body.length === 2) {
        const [messageId, payload] = body;
        this.onCallResult(messageId, payload);
      } else if (type === CALLERROR_MESSAGE && body.length === 3) {
        const [messageId, code, description, details] = body;
        this.onCallError(messageId, code, description, details);
      } else {
        throw new OcppError(OcppError.ProtocolError);
      }
    } catch (err) {
      if (err instanceof SyntaxError || err instanceof Error) {
        this.logger.warn(err);
      }
    }
  }

  public callRequest(request: string, payload: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        const messageId = v4();
        const result = JSON.stringify([CALL_MESSAGE, messageId, request, payload]);
        this.socket.send(result);
        this.pendingCalls[messageId] = { resolve, reject };
        setTimeout(() => {
          this.onCallError(messageId, OcppError.InternalError, 'No response from client', {});
        }, 10000);
      } catch (e) {
        reject(e);
      }
    });
  }

  public callResult(messageId: string, action: string, responsePayload: any) {
    try {
      const result = JSON.stringify([CALLRESULT_MESSAGE, messageId, responsePayload]);
      this.socket.send(result);
    } catch (err) {
      if (err instanceof SyntaxError) {
        this.callError(messageId, new OcppError(OcppError.InternalError, 'Response payload is invalid'));
        this.logger.error(err.message);
      }
    }
  }

  public callError(messageId: string, error: OcppError) {
    try {
      const result = JSON.stringify([CALLERROR_MESSAGE, messageId, error.code, error.message, error.details || {}]);
      this.socket.send(result);
    } catch (e) {
      console.error(e);
    }
  }

  private onCallError(messageId: string, code: string, description: string, details: any) {
    if (this.pendingCalls[messageId]) {
      const { reject } = this.pendingCalls[messageId];
      if (reject) {
        reject(new OcppError(code, description, details));
      }
      delete this.pendingCalls[messageId];
    }
  }

  private onCallResult(messageId: string, payload: any) {
    if (this.pendingCalls[messageId]) {
      const { resolve } = this.pendingCalls[messageId];
      if (resolve) {
        resolve(payload);
      }
      delete this.pendingCalls[messageId];
    }
  }

  private async onCall(messageId: string, request: any, payload: any) {
    console.log('OI');
    try {
      const response = await new Promise(async (resolve, reject) => {
        console.log('AQUI');
        this.registry!.validateRequest(this.version, request, payload);

        setTimeout(() => {
          reject(new OcppError(OcppError.InternalError, 'No response from the handler'));
        }, 10000);

        /*
        const result = await this.dispatcher.dispatch(
          handler!.controller,
          handler!.methodName,
          this.version,
          request,
          payload,
        );*/
        const result = {};

        this.registry!.validateResponse(this.version, request, result);
        resolve(result);
      });
      this.callResult(messageId, request, response);
    } catch (err) {
      console.log(err);
      if (err instanceof OcppError) {
        this.callError(messageId, err);
      } else {
        this.callError(
          messageId,
          new OcppError(
            OcppError.InternalError,
            'An internal error occurred and the receiver was not able to process the requested Action',
          ),
        );
      }
    }
  }
}
