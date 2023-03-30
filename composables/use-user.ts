import { User } from '@/utils/types/user';

export default () => {
  const userData = useState<User>('user', () => ({
    _id: '',
    email: '',
    username: '',
    role: 'user',
    bio: '',
    avatar: '',
    verified: false
  }));

  const setUserData = (user: User) => {
    userData.value = user;
  };

  return {
    userData,
    setUserData
  };
};
