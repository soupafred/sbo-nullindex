<script setup lang="ts">
definePageMeta({ layout: 'auth' });
</script>

<template>
  <div class="w-full max-w-9/10 md:max-w-6/10 lg:max-w-8/10 xl:max-w-9/10 m-auto">
    <UCard class="h-full w-full shadow-lg shadow-neutral-500/40">
      <template #default>
        <div class="flex flex-col lg:flex-row h-full w-full">
          <!-- Left Section -->
          <div class="flex flex-col flex-1 items-center justify-center gap-8 py-24 px-8 xl:px-36">
            <UIcon name="custom:something-logo-light" class="size-24" />
            <div class="flex flex-col items-center gap-3">
              <p class="text-xl font-bold">Welcome to Something!</p>
              <p class="text-center">Jump right in — manage your events, tickets, and sales.</p>
            </div>
            <div class="w-full flex flex-col gap-4 py-8 max-w-136">
              <UButton
                icon="logos:google-icon"
                size="lg"
                color="neutral"
                label="Continue with Google"
                class="cursor-pointer"
              />
              <UButton
                icon="logos:apple"
                size="lg"
                color="neutral"
                label="Continue with Apple"
                class="cursor-pointer"
              />
            </div>
            <div>
              <p class="text-xs text-gray-400">
                By continuing, you agree to our <a href="#" class="underline">Terms</a> and
                <a href="#" class="underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
          <!-- Right Section -->
          <div class="hidden lg:flex items-center justify-center">
            <img
              src="~/assets/images/img-logo-1.png"
              alt="img-preview"
              class="object-contain h-full w-full"
            >
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
