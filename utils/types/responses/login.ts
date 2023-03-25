export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}
