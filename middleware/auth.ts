export default defineNuxtRouteMiddleware((to) => {
  checkAuthentication().then((response) => {
    const { isAuthenticated, user } = response;
    const isAdmin = user?.role === 'admin';

    if ((!isAuthenticated || (isAuthenticated && !isAdmin)) && to.path === '/admin') {
      logout();
    } else if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
    }
  });
});
