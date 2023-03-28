import { HCaptcha, HCaptchaHandlerOptions } from '@/utils/types/hcaptcha';

export class HCaptchaHandler {
  private hCaptchaConfig: HCaptcha;

  constructor(private handlerOptions: HCaptchaHandlerOptions) {
    this.hCaptchaConfig = reactive({
      verified: false,
      expired: false,
      token: '',
      eKey: '',
      error: new Error()
    });
  }

  expireHandler = () => {
    this.hCaptchaConfig.verified = false;
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.expired = true;
    this.handlerOptions.onExpire?.();
    console.log('hCaptcha has expired...');
  };

  errorHandler = (error: Error) => {
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.error = error;
    this.handlerOptions.onError?.(error);
    console.log(`Error submitting hCaptcha: ${error}`);
  };

  verifyHandler = (token: string, ekey: string) => {
    this.hCaptchaConfig.verified = true;
    this.hCaptchaConfig.token = token;
    this.hCaptchaConfig.eKey = ekey;
    this.handlerOptions.onVerify();
  };

  get hCaptcha(): HCaptcha {
    return this.hCaptchaConfig;
  }
}
