export interface User {
  _id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  bio: string;
  avatar: string;
  verified: boolean;
}
