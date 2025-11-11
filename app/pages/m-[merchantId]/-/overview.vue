<template>
  <UContainer>
    <div class="py-10">
      <h1 class="text-2xl font-bold">Overview</h1>
      <p v-if="!merchantStore.itemGetting" class="text-lg">
        All assets from <strong>{{ merchantStore.item?.name || '[Failed to load data]' }}</strong>
      </p>
      <USkeleton v-else class="h-7 min-w-55 max-w-100" />
    </div>
  </UContainer>
  <USeparator />
  <UContainer> a </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'merchant'
});

const merchantStore = useMerchantStore();
</script>
