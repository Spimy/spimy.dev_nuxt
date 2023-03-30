import { AuthCheckResponse } from '@/utils/types/responses';

export const localLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('sessionId');
  navigateTo('/login');
};

// Delete the session on the auth backen and logout locally
export const logout = () => {
  if (process.client) {
    const sessionId = localStorage?.getItem('sessionId');
    if (!sessionId) return localLogout();

    useAuthFetch<{ status: number }>(`/sessions?id=${sessionId}`, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) return localLogout();
    });
  }
};

// Check if user is authenticated with auth backend
export const checkAuthentication = async () => {
  return await useAuthFetch<AuthCheckResponse>('/auth/check').then((response) => {
    if (response?.status === 200) {
      const { setUserData } = useUser();
      setUserData(response._data!.user);
      return { isAuthenticated: true, data: response._data };
    }
    return { isAuthenticated: false, data: response?._data };
  });
};
