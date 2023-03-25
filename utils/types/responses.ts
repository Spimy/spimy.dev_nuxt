import { User } from '@/utils/types/user';

export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: User;
  sessionId: string;
  message: string;
}

export interface AuthCheckResponse {
  message: string;
  user: User;
}
