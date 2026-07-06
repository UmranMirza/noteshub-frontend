// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
 colorMode: {
    preference: 'system', // light | dark | system
    fallback: 'light',
    classSuffix: '',
  },
  css: [
  '~/assets/css/main.css'
],

 runtimeConfig: {
  public: {
    apiBase: '',
  },
},
})