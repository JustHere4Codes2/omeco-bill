// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/bill',
      pathPrefix: false,
    }
  ]
})