import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OcppRootModuleOptions } from './interfaces';
import { getSharedConfigToken } from './utils';

/**
 * @publicApi
 */
@Module({})
export class OcppModule {
  private static coreModuleDefinition = {
    global: true,
    module: OcppModule,
    imports: [],
    providers: [],
  };

  /**
   * Registers a globally available configuration.
   *
   * @param ocppConfig shared OCPP configuration object
   */
  static forRoot(ocppConfig: OcppRootModuleOptions): DynamicModule;

  /**
   * Registers a globally available configuration under a specified "configKey".
   *
   * @param configKey a key under which the configuration should be available
   * @param sharedBullConfig shared bull configuration object
   */
  static forRoot(configKey: string, bullConfig: OcppRootModuleOptions): DynamicModule;

  static forRoot(keyOrConfig: string | OcppRootModuleOptions, ocppConfig?: OcppRootModuleOptions): DynamicModule {
    const [configKey, sharedOCppConfig] =
      typeof keyOrConfig === 'string' ? [keyOrConfig, ocppConfig] : [undefined, keyOrConfig];

    const sharedOcppConfigProvider: Provider = {
      provide: getSharedConfigToken(configKey),
      useValue: sharedOCppConfig,
    };

    return {
      global: true,
      module: OcppModule,
      providers: [sharedOcppConfigProvider],
      exports: [sharedOcppConfigProvider],
    };
  }
}
