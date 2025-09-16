import { SecureContextOptions } from 'tls';

export type OcppVersion = '1.6' | '2.0.1';

export interface OcppConfiguration {
  /** OCPP version */
  version: OcppVersion;
  /** Url suffix used for version */
  path?: string;
}

export interface OcppModuleOptions {
  /**
   * Enables debug logging
   *
   * @default false
   */
  debug?: boolean | false;

  /**
   * Port used for WebSocket server
   *
   * @default 9220
   */
  port?: number;
  /**
   * TLS configuration for WebSocket
   *
   * @default No secure connection
   */
  options?: SecureContextOptions | undefined;
  /**
   * Versions supported by the module
   *
   * @default OCPP 1.6
   */
  versions?: OcppConfiguration[] | undefined;
}
