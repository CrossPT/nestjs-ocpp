import { DynamicModule, Module } from '@nestjs/common';
import { OcppModuleOptions } from './interfaces';
import { SchemaRegistryService } from './services';
import { OCPP_VERSIONS_TOKEN, OCPP_SOCKET_PORT_TOKEN, OCPP_TLS_OPTIONS_TOKEN } from './ocpp.constants';
import { OcppService } from './services/ocpp.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
})
export class OcppModule {
  static forRoot(options?: OcppModuleOptions): DynamicModule {
    const versions = options?.versions?.length
      ? options.versions
      : [
          {
            version: '1.6',
            path: '/',
          },
        ];

    return {
      module: OcppModule,
      providers: [
        { provide: OCPP_VERSIONS_TOKEN, useValue: versions },
        {
          provide: OCPP_SOCKET_PORT_TOKEN,
          useValue: options?.port ?? 9220,
        },
        {
          provide: OCPP_TLS_OPTIONS_TOKEN,
          useValue: options?.options ?? null,
        },
        {
          provide: SchemaRegistryService,
          useFactory: () => {
            const service = new SchemaRegistryService();
            versions.forEach((v) => service.loadSchemasForVersion(v.version));
            return service;
          },
        },
        OcppService,
      ],
      exports: [OCPP_VERSIONS_TOKEN, OCPP_SOCKET_PORT_TOKEN, OCPP_TLS_OPTIONS_TOKEN, OcppService],
    };
  }
}
