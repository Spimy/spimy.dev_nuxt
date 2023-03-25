import { HCaptcha } from '@/utils/types/hcaptcha';

export class HCaptchaHandler {
  constructor(private hCaptcha: HCaptcha, private verifySuccessCallback: Function) {}

  onExpire = () => {
    this.hCaptcha.verified = false;
    this.hCaptcha.token = '';
    this.hCaptcha.eKey = '';
    this.hCaptcha.expired = true;
    console.log('hCaptcha has expired...');
  };

  onError = (err: Error) => {
    this.hCaptcha.token = '';
    this.hCaptcha.eKey = '';
    this.hCaptcha.error = err;
    console.log(`Error submitting hCaptcha: ${err}`);
  };

  onVerify = (token: string, ekey: string) => {
    this.hCaptcha.verified = true;
    this.hCaptcha.token = token;
    this.hCaptcha.eKey = ekey;
    this.verifySuccessCallback();
  };
}
