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

  onExpire = () => {
    this.hCaptchaConfig.verified = false;
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.expired = true;
    this.handlerOptions.expireHandler?.();
    console.log('hCaptcha has expired...');
  };

  onError = (error: Error) => {
    this.hCaptchaConfig.token = '';
    this.hCaptchaConfig.eKey = '';
    this.hCaptchaConfig.error = error;
    this.handlerOptions.errorHandler?.(error);
    console.log(`Error submitting hCaptcha: ${error}`);
  };

  onVerify = (token: string, ekey: string) => {
    this.hCaptchaConfig.verified = true;
    this.hCaptchaConfig.token = token;
    this.hCaptchaConfig.eKey = ekey;
    this.handlerOptions.verifyHandler();
  };

  get hCaptcha(): HCaptcha {
    return this.hCaptchaConfig;
  }
}
