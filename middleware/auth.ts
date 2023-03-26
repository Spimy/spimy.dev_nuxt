export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/login' && from.path !== 'login') return;

  checkAuthentication().then((isAuthenticated) => {
    if (!isAuthenticated && to.path !== '/login') {
      logout();
    } else if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
    }
  });
});
