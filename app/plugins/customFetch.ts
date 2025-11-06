export default defineNuxtPlugin(() => {
  const customFetch = $fetch.create({
    onResponseError: async ({ response }) => {
      if (response?.status === 401) {
        const route = useRoute();
        navigateTo(`/auth?redirect=${encodeURIComponent(route.fullPath)}`);
      }
    }
  });

  // make it available as $api (recommended alias)
  return {
    provide: {
      customFetch: customFetch
    }
  };
});
