export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/login' && from.path !== 'login') return;

  checkAuthentication().then(({ isAuthenticated, data }) => {
    if (!isAuthenticated && to.path !== '/login') {
      logout();

      /**
       * Ignore path from login because that route is handled by the client after logging in
       * This is to avoid fast routing which causes error with `insertBefore`
       *
       * WHEN WILL THIS BE FIXED?? IT'S STILL AN OPEN ISSUE ON GITHUB
       * GitHub issue: https://github.com/nuxt/nuxt/issues/13350
       */
    } else if (isAuthenticated && data?.user.role !== 'admin' && from.path !== '/login') {
      logout();
    } else if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
    }
  });
});
