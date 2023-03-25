export default defineNuxtRouteMiddleware((to) => {
  // skip middleware on server
  if (process.server) return;

  const authenticated = isAuthenticated();

  if (!authenticated && to.path === '/admin') {
    return navigateTo('/login');
  }

  if (authenticated && to.path === '/login') {
    return navigateTo('/admin');
  }
});
