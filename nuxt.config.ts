// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', '@pinia/nuxt', '@pinia/nuxt'],
  primevue: {
    autoImport: true,
    importTheme: { from: '@/mytheme.ts' },
  },
  css: [
    '~/assets/main.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
  ],
});
