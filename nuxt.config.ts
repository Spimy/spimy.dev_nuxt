const DOMAIN = 'https://spimy.dev';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
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
      link: [{ rel: 'canonical', href: DOMAIN }]
    }
  },

  build: { transpile: ['@fortawesome/vue-fontawesome'] },

  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL
  },

  typescript: { shim: false },
  modules: ['@nuxtjs/color-mode'],
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/theme.scss',
    '@/assets/scss/animations/block-fade-in.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/colors.scss";'
        }
      }
    }
  },

  nitro: {
    plugins: ['~/server/database/index.ts']
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  }
});
