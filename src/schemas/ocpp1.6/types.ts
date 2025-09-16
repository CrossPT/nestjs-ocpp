/* eslint-disable */
/** Execute `npm run compileSchema` to regenerate **/

/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface AuthorizeRequest {
  idTag: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface AuthorizeResponse {
  idTagInfo: {
    expiryDate?: string;
    parentIdTag?: string;
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
  };
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface BootNotificationRequest {
  chargePointVendor: string;
  chargePointModel: string;
  chargePointSerialNumber?: string;
  chargeBoxSerialNumber?: string;
  firmwareVersion?: string;
  iccid?: string;
  imsi?: string;
  meterType?: string;
  meterSerialNumber?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface BootNotificationResponse {
  status: "Accepted" | "Pending" | "Rejected";
  currentTime: string;
  interval: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface CancelReservationRequest {
  reservationId: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface CancelReservationResponse {
  status: "Accepted" | "Rejected";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203CertificateSignedReq {
  certificateChain: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type CertificateSignedStatusEnumType = "Accepted" | "Rejected";

export interface UrnOCPPCp1620203CertificateSignedConf {
  status: CertificateSignedStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ChangeAvailabilityRequest {
  connectorId: number;
  type: "Inoperative" | "Operative";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ChangeAvailabilityResponse {
  status: "Accepted" | "Rejected" | "Scheduled";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ChangeConfigurationRequest {
  key: string;
  value: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ChangeConfigurationResponse {
  status: "Accepted" | "Rejected" | "RebootRequired" | "NotSupported";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ClearCacheRequest {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ClearCacheResponse {
  status: "Accepted" | "Rejected";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ClearChargingProfileRequest {
  id?: number;
  connectorId?: number;
  chargingProfilePurpose?: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
  stackLevel?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ClearChargingProfileResponse {
  status: "Accepted" | "Unknown";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface DataTransferRequest {
  vendorId: string;
  messageId?: string;
  data?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface DataTransferResponse {
  status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
  data?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type HashAlgorithmEnumType = "SHA256" | "SHA384" | "SHA512";

export interface UrnOCPPCp1620203DeleteCertificateReq {
  certificateHashData: CertificateHashDataType;
}
export interface CertificateHashDataType {
  hashAlgorithm: HashAlgorithmEnumType;
  issuerNameHash: string;
  issuerKeyHash: string;
  serialNumber: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type DeleteCertificateStatusEnumType = "Accepted" | "Failed" | "NotFound";

export interface UrnOCPPCp1620203DeleteCertificateConf {
  status: DeleteCertificateStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface DiagnosticsStatusNotificationRequest {
  status: "Idle" | "Uploaded" | "UploadFailed" | "Uploading";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface DiagnosticsStatusNotificationResponse {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type MessageTriggerEnumType =
  | "BootNotification"
  | "LogStatusNotification"
  | "FirmwareStatusNotification"
  | "Heartbeat"
  | "MeterValues"
  | "SignChargePointCertificate"
  | "StatusNotification";

export interface UrnOCPPCp1620203ExtendedTriggerMessageReq {
  requestedMessage: MessageTriggerEnumType;
  connectorId?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type TriggerMessageStatusEnumType = "Accepted" | "Rejected" | "NotImplemented";

export interface UrnOCPPCp1620203ExtendedTriggerMessageConf {
  status: TriggerMessageStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface FirmwareStatusNotificationRequest {
  status: "Downloaded" | "DownloadFailed" | "Downloading" | "Idle" | "InstallationFailed" | "Installing" | "Installed";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface FirmwareStatusNotificationResponse {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetCompositeScheduleRequest {
  connectorId: number;
  duration: number;
  chargingRateUnit?: "A" | "W";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetCompositeScheduleResponse {
  status: "Accepted" | "Rejected";
  connectorId?: number;
  scheduleStart?: string;
  chargingSchedule?: {
    duration?: number;
    startSchedule?: string;
    chargingRateUnit: "A" | "W";
    chargingSchedulePeriod: {
      startPeriod: number;
      limit: number;
      numberPhases?: number;
    }[];
    minChargingRate?: number;
  };
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetConfigurationRequest {
  key?: string[];
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetConfigurationResponse {
  configurationKey?: {
    key: string;
    readonly: boolean;
    value?: string | number;
  }[];
  unknownKey?: string[] | null;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetDiagnosticsRequest {
  location: string;
  retries?: number;
  retryInterval?: number;
  startTime?: string;
  stopTime?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetDiagnosticsResponse {
  fileName?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type CertificateUseEnumType = "CentralSystemRootCertificate" | "ManufacturerRootCertificate";

export interface UrnOCPPCp1620203GetInstalledCertificateIdsReq {
  certificateType: CertificateUseEnumType;
}

export type GetInstalledCertificateStatusEnumType = "Accepted" | "NotFound";

export interface UrnOCPPCp1620203GetInstalledCertificateIdsConf {
  /**
   * @minItems 1
   */
  certificateHashData?: [CertificateHashDataType, ...CertificateHashDataType[]];
  status: GetInstalledCertificateStatusEnumType;
}

/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetLocalListVersionRequest {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface GetLocalListVersionResponse {
  listVersion: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type LogEnumType = "DiagnosticsLog" | "SecurityLog";

export interface UrnOCPPCp1620203GetLogReq {
  log: LogParametersType;
  logType: LogEnumType;
  requestId: number;
  retries?: number;
  retryInterval?: number;
}
export interface LogParametersType {
  remoteLocation: string;
  oldestTimestamp?: string;
  latestTimestamp?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type LogStatusEnumType = "Accepted" | "Rejected" | "AcceptedCanceled";

export interface UrnOCPPCp1620203GetLogConf {
  status: LogStatusEnumType;
  filename?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface HeartbeatRequest {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface HeartbeatResponse {
  currentTime: string;
}

export interface UrnOCPPCp1620203InstallCertificateReq {
  certificateType: CertificateUseEnumType;
  certificate: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type InstallCertificateStatusEnumType = "Accepted" | "Failed" | "Rejected";

export interface UrnOCPPCp1620203InstallCertificateConf {
  status: InstallCertificateStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type UploadLogStatusEnumType =
  | "BadMessage"
  | "Idle"
  | "NotSupportedOperation"
  | "PermissionDenied"
  | "Uploaded"
  | "UploadFailure"
  | "Uploading";

export interface UrnOCPPCp1620203LogStatusNotificationReq {
  status: UploadLogStatusEnumType;
  requestId?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203LogStatusNotificationConf {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface MeterValuesRequest {
  connectorId: number;
  transactionId?: number;
  /**
   * @minItems 1
   */
  meterValue: [
    {
      timestamp: string;
      /**
       * @minItems 1
       */
      sampledValue: [
        {
          value: string | number;
          context?:
            | "Interruption.Begin"
            | "Interruption.End"
            | "Sample.Clock"
            | "Sample.Periodic"
            | "Transaction.Begin"
            | "Transaction.End"
            | "Trigger"
            | "Other";
          format?: "Raw" | "SignedData";
          measurand?:
            | "Energy.Active.Export.Register"
            | "Energy.Active.Import.Register"
            | "Energy.Reactive.Export.Register"
            | "Energy.Reactive.Import.Register"
            | "Energy.Active.Export.Interval"
            | "Energy.Active.Import.Interval"
            | "Energy.Reactive.Export.Interval"
            | "Energy.Reactive.Import.Interval"
            | "Power.Active.Export"
            | "Power.Active.Import"
            | "Power.Offered"
            | "Power.Reactive.Export"
            | "Power.Reactive.Import"
            | "Power.Factor"
            | "Current.Import"
            | "Current.Export"
            | "Current.Offered"
            | "Voltage"
            | "Frequency"
            | "Temperature"
            | "SoC"
            | "RPM";
          phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
          location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
          unit?:
            | "Wh"
            | "kWh"
            | "varh"
            | "kvarh"
            | "W"
            | "kW"
            | "VA"
            | "kVA"
            | "var"
            | "kvar"
            | "A"
            | "V"
            | "K"
            | "Celcius"
            | "Celsius"
            | "Fahrenheit"
            | "Percent"
            | "Hertz";
        },
        ...{
          value: string | number;
          context?:
            | "Interruption.Begin"
            | "Interruption.End"
            | "Sample.Clock"
            | "Sample.Periodic"
            | "Transaction.Begin"
            | "Transaction.End"
            | "Trigger"
            | "Other";
          format?: "Raw" | "SignedData";
          measurand?:
            | "Energy.Active.Export.Register"
            | "Energy.Active.Import.Register"
            | "Energy.Reactive.Export.Register"
            | "Energy.Reactive.Import.Register"
            | "Energy.Active.Export.Interval"
            | "Energy.Active.Import.Interval"
            | "Energy.Reactive.Export.Interval"
            | "Energy.Reactive.Import.Interval"
            | "Power.Active.Export"
            | "Power.Active.Import"
            | "Power.Offered"
            | "Power.Reactive.Export"
            | "Power.Reactive.Import"
            | "Power.Factor"
            | "Current.Import"
            | "Current.Export"
            | "Current.Offered"
            | "Voltage"
            | "Frequency"
            | "Temperature"
            | "SoC"
            | "RPM";
          phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
          location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
          unit?:
            | "Wh"
            | "kWh"
            | "varh"
            | "kvarh"
            | "W"
            | "kW"
            | "VA"
            | "kVA"
            | "var"
            | "kvar"
            | "A"
            | "V"
            | "K"
            | "Celcius"
            | "Celsius"
            | "Fahrenheit"
            | "Percent"
            | "Hertz";
        }[]
      ];
    },
    ...{
      timestamp: string;
      /**
       * @minItems 1
       */
      sampledValue: [
        {
          value: string | number;
          context?:
            | "Interruption.Begin"
            | "Interruption.End"
            | "Sample.Clock"
            | "Sample.Periodic"
            | "Transaction.Begin"
            | "Transaction.End"
            | "Trigger"
            | "Other";
          format?: "Raw" | "SignedData";
          measurand?:
            | "Energy.Active.Export.Register"
            | "Energy.Active.Import.Register"
            | "Energy.Reactive.Export.Register"
            | "Energy.Reactive.Import.Register"
            | "Energy.Active.Export.Interval"
            | "Energy.Active.Import.Interval"
            | "Energy.Reactive.Export.Interval"
            | "Energy.Reactive.Import.Interval"
            | "Power.Active.Export"
            | "Power.Active.Import"
            | "Power.Offered"
            | "Power.Reactive.Export"
            | "Power.Reactive.Import"
            | "Power.Factor"
            | "Current.Import"
            | "Current.Export"
            | "Current.Offered"
            | "Voltage"
            | "Frequency"
            | "Temperature"
            | "SoC"
            | "RPM";
          phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
          location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
          unit?:
            | "Wh"
            | "kWh"
            | "varh"
            | "kvarh"
            | "W"
            | "kW"
            | "VA"
            | "kVA"
            | "var"
            | "kvar"
            | "A"
            | "V"
            | "K"
            | "Celcius"
            | "Celsius"
            | "Fahrenheit"
            | "Percent"
            | "Hertz";
        },
        ...{
          value: string | number;
          context?:
            | "Interruption.Begin"
            | "Interruption.End"
            | "Sample.Clock"
            | "Sample.Periodic"
            | "Transaction.Begin"
            | "Transaction.End"
            | "Trigger"
            | "Other";
          format?: "Raw" | "SignedData";
          measurand?:
            | "Energy.Active.Export.Register"
            | "Energy.Active.Import.Register"
            | "Energy.Reactive.Export.Register"
            | "Energy.Reactive.Import.Register"
            | "Energy.Active.Export.Interval"
            | "Energy.Active.Import.Interval"
            | "Energy.Reactive.Export.Interval"
            | "Energy.Reactive.Import.Interval"
            | "Power.Active.Export"
            | "Power.Active.Import"
            | "Power.Offered"
            | "Power.Reactive.Export"
            | "Power.Reactive.Import"
            | "Power.Factor"
            | "Current.Import"
            | "Current.Export"
            | "Current.Offered"
            | "Voltage"
            | "Frequency"
            | "Temperature"
            | "SoC"
            | "RPM";
          phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
          location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
          unit?:
            | "Wh"
            | "kWh"
            | "varh"
            | "kvarh"
            | "W"
            | "kW"
            | "VA"
            | "kVA"
            | "var"
            | "kvar"
            | "A"
            | "V"
            | "K"
            | "Celcius"
            | "Celsius"
            | "Fahrenheit"
            | "Percent"
            | "Hertz";
        }[]
      ];
    }[]
  ];
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface MeterValuesResponse {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface RemoteStartTransactionRequest {
  connectorId?: number;
  idTag: string;
  chargingProfile?: {
    chargingProfileId: number;
    transactionId?: number;
    stackLevel: number;
    chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
    chargingProfileKind: "Absolute" | "Recurring" | "Relative";
    recurrencyKind?: "Daily" | "Weekly";
    validFrom?: string;
    validTo?: string;
    chargingSchedule: {
      duration?: number;
      startSchedule?: string;
      chargingRateUnit: "A" | "W";
      chargingSchedulePeriod: {
        startPeriod: number;
        limit: number;
        numberPhases?: number;
      }[];
      minChargingRate?: number;
    };
  };
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface RemoteStartTransactionResponse {
  status: "Accepted" | "Rejected";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface RemoteStopTransactionRequest {
  transactionId: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface RemoteStopTransactionResponse {
  status: "Accepted" | "Rejected";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ReserveNowRequest {
  connectorId: number;
  expiryDate: string;
  idTag: string;
  parentIdTag?: string;
  reservationId: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ReserveNowResponse {
  status: "Accepted" | "Faulted" | "Occupied" | "Rejected" | "Unavailable";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ResetRequest {
  type: "Hard" | "Soft";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface ResetResponse {
  status: "Accepted" | "Rejected";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203SecurityEventNotificationReq {
  type: string;
  timestamp: string;
  techInfo?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203SecurityEventNotificationConf {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface SendLocalListRequest {
  listVersion: number;
  localAuthorizationList?: {
    idTag: string;
    idTagInfo?: {
      expiryDate?: string;
      parentIdTag?: string;
      status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
    };
  }[];
  updateType: "Differential" | "Full";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface SendLocalListResponse {
  status: "Accepted" | "Failed" | "NotSupported" | "VersionMismatch";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface SetChargingProfileRequest {
  connectorId: number;
  csChargingProfiles: {
    chargingProfileId: number;
    transactionId?: number;
    stackLevel: number;
    chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
    chargingProfileKind: "Absolute" | "Recurring" | "Relative";
    recurrencyKind?: "Daily" | "Weekly";
    validFrom?: string;
    validTo?: string;
    chargingSchedule: {
      duration?: number;
      startSchedule?: string;
      chargingRateUnit: "A" | "W";
      chargingSchedulePeriod: {
        startPeriod: number;
        limit: number;
        numberPhases?: number;
      }[];
      minChargingRate?: number;
    };
  };
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface SetChargingProfileResponse {
  status: "Accepted" | "Rejected" | "NotSupported";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203SignCertificateReq {
  csr: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type GenericStatusEnumType = "Accepted" | "Rejected";

export interface UrnOCPPCp1620203SignCertificateConf {
  status: GenericStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type FirmwareStatusEnumType =
  | "Downloaded"
  | "DownloadFailed"
  | "Downloading"
  | "DownloadScheduled"
  | "DownloadPaused"
  | "Idle"
  | "InstallationFailed"
  | "Installing"
  | "Installed"
  | "InstallRebooting"
  | "InstallScheduled"
  | "InstallVerificationFailed"
  | "InvalidSignature"
  | "SignatureVerified";

export interface UrnOCPPCp1620203SignedFirmwareStatusNotificationReq {
  status: FirmwareStatusEnumType;
  requestId?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203SignedFirmwareStatusNotificationConf {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UrnOCPPCp1620203SignedUpdateFirmwareReq {
  retries?: number;
  retryInterval?: number;
  requestId: number;
  firmware: FirmwareType;
}
export interface FirmwareType {
  location: string;
  retrieveDateTime: string;
  installDateTime?: string;
  signingCertificate: string;
  signature: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export type UpdateFirmwareStatusEnumType =
  | "Accepted"
  | "Rejected"
  | "AcceptedCanceled"
  | "InvalidCertificate"
  | "RevokedCertificate";

export interface UrnOCPPCp1620203SignedUpdateFirmwareConf {
  status: UpdateFirmwareStatusEnumType;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StartTransactionRequest {
  connectorId: number;
  idTag: string;
  meterStart: number;
  reservationId?: number;
  timestamp: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StartTransactionResponse {
  idTagInfo: {
    expiryDate?: string;
    parentIdTag?: string;
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
  };
  transactionId: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StatusNotificationRequest {
  connectorId: number;
  errorCode:
    | "ConnectorLockFailure"
    | "EVCommunicationError"
    | "GroundFailure"
    | "HighTemperature"
    | "InternalError"
    | "LocalListConflict"
    | "NoError"
    | "OtherError"
    | "OverCurrentFailure"
    | "PowerMeterFailure"
    | "PowerSwitchFailure"
    | "ReaderFailure"
    | "ResetFailure"
    | "UnderVoltage"
    | "OverVoltage"
    | "WeakSignal";
  info?: string;
  status:
    | "Available"
    | "Preparing"
    | "Charging"
    | "SuspendedEVSE"
    | "SuspendedEV"
    | "Finishing"
    | "Reserved"
    | "Unavailable"
    | "Faulted";
  timestamp?: string;
  vendorId?: string;
  vendorErrorCode?: string;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StatusNotificationResponse {}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StopTransactionRequest {
  idTag?: string;
  meterStop: number;
  timestamp: string;
  transactionId: number;
  reason?:
    | "EmergencyStop"
    | "EVDisconnected"
    | "HardReset"
    | "Local"
    | "Other"
    | "PowerLoss"
    | "Reboot"
    | "Remote"
    | "SoftReset"
    | "UnlockCommand"
    | "DeAuthorized";
  transactionData?: {
    timestamp: string;
    sampledValue: {
      value: string;
      context?:
        | "Interruption.Begin"
        | "Interruption.End"
        | "Sample.Clock"
        | "Sample.Periodic"
        | "Transaction.Begin"
        | "Transaction.End"
        | "Trigger"
        | "Other";
      format?: "Raw" | "SignedData";
      measurand?:
        | "Energy.Active.Export.Register"
        | "Energy.Active.Import.Register"
        | "Energy.Reactive.Export.Register"
        | "Energy.Reactive.Import.Register"
        | "Energy.Active.Export.Interval"
        | "Energy.Active.Import.Interval"
        | "Energy.Reactive.Export.Interval"
        | "Energy.Reactive.Import.Interval"
        | "Power.Active.Export"
        | "Power.Active.Import"
        | "Power.Offered"
        | "Power.Reactive.Export"
        | "Power.Reactive.Import"
        | "Power.Factor"
        | "Current.Import"
        | "Current.Export"
        | "Current.Offered"
        | "Voltage"
        | "Frequency"
        | "Temperature"
        | "SoC"
        | "RPM";
      phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
      location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
      unit?:
        | "Wh"
        | "kWh"
        | "varh"
        | "kvarh"
        | "W"
        | "kW"
        | "VA"
        | "kVA"
        | "var"
        | "kvar"
        | "A"
        | "V"
        | "K"
        | "Celcius"
        | "Celsius"
        | "Fahrenheit"
        | "Percent";
    }[];
  }[];
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface StopTransactionResponse {
  idTagInfo?: {
    expiryDate?: string;
    parentIdTag?: string;
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
  };
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface TriggerMessageRequest {
  requestedMessage:
    | "BootNotification"
    | "DiagnosticsStatusNotification"
    | "FirmwareStatusNotification"
    | "Heartbeat"
    | "MeterValues"
    | "StatusNotification";
  connectorId?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface TriggerMessageResponse {
  status: "Accepted" | "Rejected" | "NotImplemented";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UnlockConnectorRequest {
  connectorId: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UnlockConnectorResponse {
  status: "Unlocked" | "UnlockFailed" | "NotSupported";
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UpdateFirmwareRequest {
  location: string;
  retries?: number;
  retrieveDate: string;
  retryInterval?: number;
}
/**
 * DO NOT MODIFY
 * Execute `npm run compileSchema` to regenerate **/

export interface UpdateFirmwareResponse {}
