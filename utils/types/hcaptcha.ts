export interface HCaptcha {
  verified: boolean;
  expired: boolean;
  token: string;
  eKey: string;
  error: Error;
}

export interface HCaptchaHandlerOptions {
  verifyHandler: () => void;
  errorHandler?: (error: Error) => void;
  expireHandler?: () => void;
}
