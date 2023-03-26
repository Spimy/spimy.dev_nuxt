const DOMAIN = 'https://www.spimy.dev';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
      meta: [
        { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
        {
          name: 'keywords',
          content: 'spimy, portfolio, william, programming, projects, code, javascript, typescript, skills, contact'
        },
        { property: 'og:site:name', content: "Spimy's Portfolio" },
        { property: 'og:see_also', content: DOMAIN },
        { property: 'og:image', content: `${DOMAIN}/logos/character.png` },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: `${DOMAIN}/logos/character.png` },
        { name: 'theme-color', content: '#3760dc' }
      ],
      link: [
        { rel: 'canonical', href: DOMAIN },
        { rel: 'icon', href: 'favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  routeRules: {
    '/api': { cors: true }
  },

  build: { transpile: ['@fortawesome/vue-fontawesome'] },

  runtimeConfig: {
    mongoUrl: process.env.MONGODB_URI,
    static_secret: process.env.STATIC_SECRET,

    email: {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      destination: process.env.EMAIL_TO
    },

    hcaptcha_secret: process.env.HCAPTCHA_SECRET,

    public: {
      hcaptcha_sitekeys: {
        contact: process.env.HCAPTCHA_SITEKEY_CONTACT,
        login: process.env.HCAPTCHA_SITEKEY_LOGIN
      },
      auth_backend: process.env.AUTH_BACKEND
    }
  },

  typescript: { shim: false },
  modules: ['@nuxtjs/color-mode', '@nuxt/image-edge'],
  css: ['@/assets/scss/main.scss', '@/assets/scss/theme.scss', '@fortawesome/fontawesome-svg-core/styles.css'],

  nitro: {
    plugins: ['~/server/database/index.ts']
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  image: {
    domains: ['static.spimy.dev']
  }
});
