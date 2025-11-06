<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'auth' });
const authStore = useAuthStore();

const handleOnClickGoogleLoginButton = async () => {
  try {
    const url = await authStore.getGoogleLoginRedirectURL();
    if (url) {
      window.location.href = url;
    } else {
      console.error('No redirect URL received from auth store');
    }
  } catch (error) {
    console.error('Failed to get Google login redirect URL:', error);
  }
};
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left side: login form -->
    <div class="flex flex-col justify-center items-center w-full lg:w-1/2 px-6">
      <div class="w-full max-w-sm text-center">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <UAvatar class="size-25" src="/icons/something-logo-light.svg" />
        </div>
        <p class="text-xl font-bold">Welcome back to Something!</p>
        <p class="text-center text-sm mb-12">
          Jump right in — manage your events, tickets, and sales.
        </p>

        <div class="space-y-3">
          <UButton
            variant="outline"
            block
            color="neutral"
            size="xl"
            :ui="{ base: 'w-full rounded-full p-3 px-6 cursor-pointer' }"
            :loading="authStore.isLoading"
            @click="handleOnClickGoogleLoginButton"
          >
            Login with Google
          </UButton>

          <UButton
            variant="outline"
            block
            disabled
            color="neutral"
            size="xl"
            :ui="{ base: 'w-full rounded-full p-3 px-6 cursor-pointer' }"
          >
            Login with Apple
          </UButton>
        </div>

        <p class="text-sm text-gray-500 mt-6">
          Don’t have an account?
          <a href="#" class="text-black font-medium hover:underline">Sign up</a>
        </p>

        <p class="text-xs text-gray-400 mt-20">
          By continuing, you agree to <strong class="text-primary">Something By Nullindex</strong>
          <br />
          <a href="#" class="underline">Terms of Service</a> and
          <a href="#" class="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>

    <!-- Right side: background -->
    <div class="hidden lg:block w-1/2 relative">
      <div class="absolute inset-0 bg-black overflow-hidden" />
      <ClientOnly class="absolute inset-0">
        <ColorBends
          class="w-full h-full opacity-80"
          :colors="['#0033ff', '#ef0000', '#00ec04']"
          :speed="0.3"
          :scale="0.2"
          :frequency="1.03"
          :auto-rotate="2"
        />
      </ClientOnly>
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <RotatingText
          :texts="['Something.With', 'Event.?', 'Ticket.?']"
          main-class-name="px-2 sm:px-2 md:px-3 text-white text-[3.5rem] font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          :initial="{ y: '100%' }"
          :animate="{ y: 0 }"
          split-by="characters"
          stagger-from="random"
          :exit="{ y: '-120%' }"
          :stagger-duration="0.025"
          split-level-class-name="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          :transition="{ type: 'spring', damping: 30, stiffness: 400 }"
          :rotation-interval="2000"
        />
      </div>
    </div>
  </div>
</template>
