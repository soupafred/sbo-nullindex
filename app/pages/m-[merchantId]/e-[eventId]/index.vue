<template>
  <div>Ticket Detail</div>
  {{ store.name }}
</template>

<script setup lang="ts">
import { useApplication } from '~/stores/application';

definePageMeta({
  layout: 'merchant'
});
const store = useApplication();
</script>
