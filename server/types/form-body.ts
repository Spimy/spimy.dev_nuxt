export interface FormBody {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  hCaptcha: {
    verified: boolean;
    expired: boolean;
    token: string;
    ekey: string;
    error: Error;
  };
}
