export interface HCaptcha {
  verified: boolean;
  expired: boolean;
  token: string;
  eKey: string;
  error: Error;
}

export interface HCaptchaHandlerOptions {
  verifyHandler: Function;
  errorHandler?: Function;
  expireHandler?: Function;
}
