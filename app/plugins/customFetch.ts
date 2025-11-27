export default defineNuxtPlugin(() => {
  const customFetch = $fetch.create({
    onResponseError: async ({ response }) => {
      if (response?.status === 401) {
        const authStore = useAuthStore();
        authStore.handleLogOut();
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
