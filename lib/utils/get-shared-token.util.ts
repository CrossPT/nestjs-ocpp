export const OCPP_CONFIG_DEFAULT_TOKEN = 'OCPP_CONFIG(default)';

export function getSharedConfigToken(configKey?: string): string {
  return configKey ? `OCPP_CONFIG(${configKey})` : OCPP_CONFIG_DEFAULT_TOKEN;
}
