<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const appHeaderStore = useApplicationHeaderStore();
const merchantStore = useMerchantStore();

const route = useRoute();
const router = useRouter();
const merchantSlug = route.params.merchantSlug as string;

definePageMeta({
  layout: 'merchant'
});

onMounted(async () => {
  await merchantStore.fetchItem(merchantSlug);
  if (merchantStore.item) {
    await router.replace(`/m-${merchantSlug}/-/overview`);
    if (merchantStore.item) appHeaderStore.setLevel1Breadcrumb(merchantStore.item, 'merchant');
  } else {
    if (
      merchantStore.itemError?.code &&
      ['404', '403', '500'].includes(merchantStore.itemError?.code)
    )
      await router.replace(`/m-${merchantSlug}/-/error`);
  }
});
</script>
