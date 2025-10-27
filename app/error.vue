<script setup lang="ts">
useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
});

useHead({
  htmlAttrs: {
    lang: 'en'
  }
});

const notFound = ref({
  title: $t('not-found'),
  detail: $t('not-found-detail'),
  button: $t('not-found-back')
});
</script>

<template>
  <UApp>
    <UError
      redirect="/"
      :clear="{
        color: 'neutral',
        size: 'xl',
        class: 'rounded-full',
        label: notFound?.button
      }"
      :error="{
        statusCode: 404,
        statusMessage: notFound?.title,
        message: notFound?.detail
      }"
    />
  </UApp>
</template>
