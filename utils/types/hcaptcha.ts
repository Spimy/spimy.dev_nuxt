export interface HCaptcha {
  verified: boolean;
  expired: boolean;
  token: string;
  eKey: string;
  error: Error;
}
