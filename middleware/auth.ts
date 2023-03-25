export default defineNuxtRouteMiddleware((to) => {
  checkAuthentication().then((response) => {
    const { isAuthenticated, user } = response;
    const isAdmin = user?.role === 'admin';

    if ((!isAuthenticated || (isAuthenticated && !isAdmin)) && to.path !== '/login') {
      logout();
    } else if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
    }
  });
});
