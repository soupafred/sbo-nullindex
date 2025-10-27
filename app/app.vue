<template>
  <div class="min-h-screen hidden md:block">
    <UApp>
      <NuxtLoadingIndicator />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
  <div class="min-h-screen flex items-center justify-center md:hidden px-4">
    <p class="text-center text-lg font-extralight">This site is not available for Mobile View.</p>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const color = computed(() => (colorMode.value === 'dark' ? '#1b1718' : 'white'));

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
});

const title = 'Something - Backoffice';
const description = 'A modern and professional tool for event passes/tickets management.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterCard: 'summary_large_image'
});
</script>
