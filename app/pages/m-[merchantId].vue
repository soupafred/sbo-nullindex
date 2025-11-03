<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const appHeaderStore = useApplicationHeaderStore();
const merchantStore = useMerchantStore();

const route = useRoute();
const router = useRouter();
const merchantId = route.params.merchantId as string;

definePageMeta({
  layout: 'merchant'
});

onMounted(async () => {
  await merchantStore.fetchItem(merchantId);
  await router.replace(`/m-${merchantId}/-/overview`);
  if (merchantStore.item) appHeaderStore.setLevel1Breadcrumb(merchantStore.item, 'merchant');
});
</script>
