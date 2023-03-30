import { HCaptcha } from '@/utils/types/hcaptcha';

export interface FormBody {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  hCaptcha: HCaptcha;
}
