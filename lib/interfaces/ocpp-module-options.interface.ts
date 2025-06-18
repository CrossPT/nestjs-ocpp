import { FactoryProvider, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { OcppVersion } from 'lib/enums/version';
import { SecureContextOptions } from 'tls';

/**
 * @publicApi
 */
export interface OcppRootModuleOptions {
  /**
   * URL suffix
   */
  url?: string;
}

/**
 * @publicApi
 */
export interface OcppModuleOptions extends OcppRootModuleOptions {
  /**
   * Server name
   *
   * @default default
   */
  name?: string;
  /**
   * Shared configuration key
   *
   * @default default
   */
  configKey?: string;
  /**
   * Configuration for secure connections
   *
   * @default default
   */
  options?: SecureContextOptions;
  /**
   * Supported versions for OCPP protocol
   *
   * @default "1.6"
   */
  versions?: OcppVersion[] | [OcppVersion.ocpp16];
  /**
   * Port used for websocket connection
   *
   * @default 9220
   */
  port?: number;
}

/**
 * @publicApi
 */
export interface OcppOptionsFactory {
  createOCPPOptions: Promise<OcppModuleOptions> | OcppModuleOptions;
}

/**
 * @publicApi
 */
export interface OcppModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Server name
   *
   * @default default
   */
  name?: string;
  /**
   * Shared configuration key
   *
   * @default default
   */
  configKey?: string;
  /**
   * Existing Provider to be used
   */
  useExisting?: Type<OcppOptionsFactory>;

  /**
   * Type (class name) of provider (instance to be registered and injected).
   */
  useClass?: Type<OcppOptionsFactory>;

  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory?: (...args: any[]) => Promise<OcppModuleOptions> | OcppModuleOptions;

  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: FactoryProvider['inject'];

  /**
   * Extra providers to be registered in the module context.
   */
  extraProviders?: Provider[];
}
