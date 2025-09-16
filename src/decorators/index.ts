import { SetMetadata } from '@nestjs/common';
import { OCPP_CONTROLLER_META, OCPP_MESSAGE_META } from '../ocpp.constants';
import { OcppVersion } from '../interfaces';

export interface OcppControllerOptions {
  version: OcppVersion;
}

export const OcppController = (options: OcppControllerOptions) => SetMetadata(OCPP_CONTROLLER_META, options.version);

export const OcppMessage = (messageType: string) => SetMetadata(OCPP_MESSAGE_META, messageType);
