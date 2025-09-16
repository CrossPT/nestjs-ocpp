import { Injectable, Logger } from '@nestjs/common';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { OcppError } from '../common/error';
import { OCPP_LOGGER_TOKEN } from '../ocpp.constants';

@Injectable()
export class SchemaRegistryService {
  private readonly logger = new Logger(OCPP_LOGGER_TOKEN);
  private readonly ajv;
  private requestValidators = new Map<string, ValidateFunction>();
  private responseValidators = new Map<string, ValidateFunction>();

  constructor() {
    this.ajv = new Ajv({ strict: false });
    addFormats(this.ajv);
  }

  static generateKey(version: string, action: string): string {
    return `${version}::${action}`;
  }

  loadSchemasForVersion(version: string) {
    const folder = resolve(__dirname, '..', 'schemas', version, 'json');
    if (!existsSync(folder)) {
      this.logger.error(`Schemas for ${version} was not found!`);
      return;
    }
    const files = readdirSync(folder).filter((file) => file.endsWith('.json'));

    files.forEach((file) => {
      const actionMatch = file.match(/^([A-Z][A-Za-z0-9]*?)(Request|Response)?\.json$/);
      if (!actionMatch) return;
      const schema = JSON.parse(readFileSync(join(folder, file), 'utf-8'));
      delete schema.$schema;
      const [, action, type] = actionMatch;
      const key = SchemaRegistryService.generateKey(version, action);

      if (type === 'Response') {
        this.responseValidators.set(key, this.ajv.compile(schema));
      } else {
        this.requestValidators.set(key, this.ajv.compile(schema));
      }
    });
  }

  validateRequest(version: string, action: string, payload: unknown) {
    return this.validate(version, action, payload);
  }

  validateResponse(version: string, action: string, payload: unknown) {
    return this.validate(version, action, payload, false);
  }

  validate(version: string, action: string, payload: unknown, request: boolean = true) {
    const validator = request
      ? this.requestValidators.get(SchemaRegistryService.generateKey(version, action))
      : this.responseValidators.get(SchemaRegistryService.generateKey(version, action));
    if (!validator) {
      throw new Error(`Missing request schema for ${version} ${action}`);
    }
    const valid = validator(payload);
    if (!valid) {
      validator.errors?.forEach((error) => {
        if (error.keyword === 'additionalProperties') {
          throw new OcppError(
            OcppError.FormationViolation,
            'Payload for Action is syntactically incorrect or not conform the PDU structure for' + ' Action',
            error,
          );
        } else if (['maxLength', 'enum'].includes(error.keyword)) {
          throw new OcppError(
            OcppError.PropertyConstraintViolation,
            'Payload is syntactically correct but at least one field contains an invalid value',
            error,
          );
        } else if (['type'].includes(error.keyword)) {
          throw new OcppError(
            OcppError.TypeConstraintViolation,
            'Payload for Action is syntactically correct but at least one of the fields violates data type',
            error,
          );
        } else if (error.keyword === 'required') {
          throw new OcppError(OcppError.ProtocolError, 'Payload for Action is incomplete', error);
        } else {
          throw new OcppError(
            OcppError.FormationViolation,
            'Payload for Action is syntactically incorrect or not conform the PDU structure for Action',
            error,
          );
        }
      });
    }
  }
}
