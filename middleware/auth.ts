export default defineNuxtRouteMiddleware((to) => {
  checkAuthentication().then((response) => {
    const { isAuthenticated, user } = response;
    const isAdmin = user?.role === 'admin';

    if (!isAuthenticated && to.path === '/admin') {
      navigateTo('/login');
      return response;
    }

    if (isAuthenticated && !isAdmin && to.path === '/admin') {
      logout();
      navigateTo('/login');
      return;
    }

    if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
      return response;
    }
  });
});
