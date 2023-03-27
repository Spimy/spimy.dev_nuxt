export default defineNuxtRouteMiddleware((to) => {
  checkAuthentication().then(({ isAuthenticated, data }) => {
    if (!isAuthenticated && to.path !== '/login') {
      logout();

      /**
       * `insertBefore` error happens due to fast navigation
       * Routing from login to admin is within the login page itself
       *
       * This is bad because if the user manages to snatch the access token,
       * they'd be able to access the admin page without being an admin;
       * This route aims to fix that from happening
       *
       * In the login page, if the user is not admin, they will not be directed to
       * the admin page which means this route check should be safe
       *
       * WHEN WILL THIS BE FIXED?? IT'S STILL AN OPEN ISSUE ON GITHUB
       * GitHub issue: https://github.com/nuxt/nuxt/issues/13350
       */
    } else if (isAuthenticated && data?.user.role !== 'admin') {
      logout();
    } else if (isAuthenticated && to.path === '/login') {
      navigateTo('/admin');
    }
  });
});
