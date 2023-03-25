import { AuthCheckResponse } from '@/utils/types/responses';

export const localLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  navigateTo('/login');
};

// Check if user is authenticated with auth backend
export const checkAuthentication = async () => {
  return await useAuthFetch<AuthCheckResponse>('/auth/check').then((response) => {
    if (response?.status === 200) {
      return {
        isAuthenticated: true,
        user: response._data?.user
      };
    }
    return {
      isAuthenticated: false,
      user: null
    };
  });
};
