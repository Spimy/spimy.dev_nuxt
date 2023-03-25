export const localLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  navigateTo('/login');
};

// Check if user is authenticated locally
export const isAuthenticated = () => {
  return !(!localStorage.getItem('accessToken') && !localStorage.getItem('refreshToken'));
};
