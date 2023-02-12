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
          content:
            'spimy, portfolio, william, programming, projects, code, javascript, typescript, skills, contact'
        },
        { property: 'og:site:name', content: "Spimy's Portfolio" },
        { property: 'og:see_also', content: DOMAIN },
        { property: 'og:image', content: `${DOMAIN}/logos/character.png` },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: `${DOMAIN}/logos/character.png` }
      ],
      link: [{ rel: 'canonical', href: DOMAIN }]
    }
  },

  typescript: { shim: false },
  modules: ['@nuxtjs/color-mode'],
  css: ['@/assets/scss/main.scss', '@/assets/scss/theme.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/colors.scss";'
        }
      }
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  }
});
