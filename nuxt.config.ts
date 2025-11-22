// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/devtools',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'user-locale',
      redirectOn: 'root'
    },
    locales: [
      { code: 'en', name: 'English', file: 'en-US.json' },
      { code: 'jp', name: '日本語', file: 'ja-JP.json' },
      { code: 'kh', name: 'ភាសាខ្មែរ', file: 'km-KH.json' }
    ]
  },
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css',
    cssLayer: 'base',
    serverBundle: {
      collections: ['circle-flags', 'flagpack', 'logos', 'simple-icons', 'custom']
    },
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
        normalizeIconName: false
      }
    ]
  },
  typescript: { typeCheck: true }
});
