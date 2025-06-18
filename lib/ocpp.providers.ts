import { Provider } from '@nestjs/common';
import { OcppModuleOptions } from './interfaces';
import { getOptionsToken, getToken } from './utils';

export function createOcppProviders(options: OcppModuleOptions[]): Provider[] {
  return options.map((option) => ({
    provide: getToken(option.name),
    useFactory: (o: OcppModuleOptions) => {
      return o.name;
    },
    inject: [getOptionsToken(option.name)],
  }));
}
