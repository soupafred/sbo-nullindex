<script setup lang="ts">
definePageMeta({ layout: 'auth' });
const authStore = useAuthStore();
const merchantStore = useMerchantStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const verificationToken = route.query.code as string;
  if (verificationToken) {
    await authStore.verifyExchangeToken(verificationToken);
    if (authStore.accessToken) {
      await merchantStore.fetchDefault();

      if (merchantStore.item) {
        await router.replace(`/m-${merchantStore.item.slug}/-/overview`);
      }
      if (merchantStore.itemError && merchantStore.itemError.code === '404') {
        await router.replace(`/m-new`);
      } else {
        await router.replace('/');
      }
    } else {
      console.error('Verification failed');
      // Handle verification failure (e.g., show error message)
    }
  } else {
    console.error('No verification token found in the URL');
    // Handle missing token (e.g., show error message)
  }
});
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left side: login form -->
    <div class="flex flex-col justify-center items-center w-full px-6">
      <div class="w-full max-w-md text-center">
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <UAvatar class="size-28" src="/icons/something-logo-light.svg" />
        </div>
        <p class="text-2xl text-nuetral mb-3">{{ $t('auth.verifying') }}</p>
        <p class="text-center text-sm mb-12">{{ $t('auth.wait-for-verify') }}</p>
      </div>
    </div>
  </div>
</template>
