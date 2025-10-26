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
    'pinia-plugin-persistedstate'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    // baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'user-locale',
      redirectOn: 'root'
    },
    locales: [
      { code: 'en', name: 'en-US', file: 'en-US.json' },
      { code: 'jp', name: 'ja-JP', file: 'ja-JP.json' },
      { code: 'kh', name: 'km-KH', file: 'km-KH.json' }
    ]
  },
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css',
    cssLayer: 'base',
    serverBundle: {
      collections: ['circle-flags', 'flagpack', 'heroicons', 'logos', 'simple-icons', 'custom']
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
