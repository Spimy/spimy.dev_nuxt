// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})
