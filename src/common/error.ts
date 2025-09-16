export class OcppError extends Error {
  static readonly NotImplemented = 'NotImplemented';
  static readonly NotSupported = 'NotSupported';
  static readonly InternalError = 'InternalError';
  static readonly ProtocolError = 'ProtocolError';
  static readonly SecurityError = 'SecurityError';
  static readonly FormationViolation = 'FormationViolation';
  static readonly PropertyConstraintViolation = 'PropertyConstraintViolation';
  static readonly OccurenceConstraintViolation = 'OccurenceConstraintViolation';
  static readonly TypeConstraintViolation = 'TypeConstraintViolation';
  static readonly GenericError = 'GenericError';

  code: string;
  details: any;
  info: string | undefined;

  constructor(code: string, info?: string, details?: any | any[]) {
    super(code);
    this.code = code;
    this.info = info;
    this.details = details;
  }
}
