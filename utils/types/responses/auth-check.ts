import { User } from '@/utils/types/user';

export interface AuthCheckResponse {
  message: string;
  user: User;
}
