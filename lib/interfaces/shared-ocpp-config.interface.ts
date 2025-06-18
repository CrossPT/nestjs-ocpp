import { ModuleMetadata, Type, FactoryProvider, Provider } from '@nestjs/common';
import { OcppRootModuleOptions } from './ocpp-module-options.interface';

/**
 * @publicApi
 */
export interface SharedOcppConfigurationFactory {
  createSharedConfiguration(): Promise<OcppRootModuleOptions> | OcppRootModuleOptions;
}

/**
 * @publicApi
 */
export interface SharedOcppAsyncConfiguration extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Existing Provider to be used.
   */
  useExisting?: Type<SharedOcppConfigurationFactory>;

  /**
   * Type (class name) of provider (instance to be registered and injected).
   */
  useClass?: Type<SharedOcppConfigurationFactory>;

  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory?: (...args: any[]) => Promise<OcppRootModuleOptions> | OcppRootModuleOptions;

  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: FactoryProvider['inject'];

  /**
   * Extra providers to be registered in the module context.
   */
  extraProviders?: Provider[];
}
