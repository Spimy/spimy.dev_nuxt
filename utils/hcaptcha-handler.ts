import { HCaptcha } from '@/utils/types/hcaptcha';

export class HCaptchaHandler {
  private hCaptchaConfig: HCaptcha;

  constructor(private verifySuccessCallback: Function) {
    this.hCaptchaConfig = reactive({
      verified: false,
      expired: false,
      token: '',
      eKey: '',
      error: new Error()
    });
  }

  onExpire = () => {
    this.hCaptchaConfig.verified = false;
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.expired = true;
    console.log('hCaptcha has expired...');
  };

  onError = (err: Error) => {
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.error = err;
    console.log(`Error submitting hCaptcha: ${err}`);
  };

  onVerify = (token: string, ekey: string) => {
    this.hCaptchaConfig.verified = true;
    this.hCaptchaConfig.token = token;
    this.hCaptchaConfig.eKey = ekey;
    this.verifySuccessCallback();
  };

  get hCaptcha(): HCaptcha {
    return this.hCaptchaConfig;
  }
}
