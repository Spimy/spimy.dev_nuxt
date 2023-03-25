import { AuthCheckResponse } from '@/utils/types/responses';

export const localLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  navigateTo('/login');
};

// Check if user is authenticated locally
export const checkAuthentication = async () => {
  return await useAuthFetch<AuthCheckResponse>('/check').then((response) => {
    if (response.status === 200) return true;
    return false;
  });
};
