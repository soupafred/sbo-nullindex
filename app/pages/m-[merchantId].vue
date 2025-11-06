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
  if (merchantStore.item) {
    await router.replace(`/m-${merchantId}/-/overview`);
    if (merchantStore.item) appHeaderStore.setLevel1Breadcrumb(merchantStore.item, 'merchant');
  } else {
    // await router.replace(`/m-${merchantId}/-/error`);
  }
});
</script>
