export default defineNuxtRouteMiddleware((to) => {
  checkAuthentication().then((isAuthenticated) => {
    if (!isAuthenticated && to.path === '/admin') {
      navigateTo('/login');
      return isAuthenticated;
    }

    if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
      return isAuthenticated;
    }
  });
});
