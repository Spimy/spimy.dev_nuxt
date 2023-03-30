export interface HCaptcha {
  verified: boolean;
  expired: boolean;
  token: string;
  eKey: string;
  error: Error;
}

export interface HCaptchaHandlerOptions {
  onVerify: () => void;
  onError?: (error: Error) => void;
  onExpire?: () => void;
}
