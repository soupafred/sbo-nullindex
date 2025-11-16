<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

definePageMeta({ layout: 'auth' });

const authStore = useAuthStore();
const colorMode = useColorMode();
const { availableLocales, locale, setLocale } = useI18n();
const { isApple } = useDeviceDetection();

const initLanguages = [
  { code: 'en', label: 'English', icon: 'flag:gb-1x1' },
  { code: 'jp', label: '日本語', icon: 'flag:jp-1x1' },
  { code: 'kh', label: 'ភាសាខ្មែរ', icon: 'flag:kh-1x1' }
];
const isClient = ref(false);
const selectedLanguage = ref(locale.value);

onMounted(async () => {
  isClient.value = true;
});

const bgLoginCard = computed(() => {
  if (!isClient.value) return 'bg-neutral-950';
  return colorMode.value === 'dark' ? 'bg-neutral-950' : 'bg-neutral-100';
});
const languages = computed<SelectItem[]>(() => {
  return availableLocales.map((code) => initLanguages.find((l) => l.code === code)!);
});
const langIcon = computed(() => {
  const found = initLanguages.find((item) => item.code === selectedLanguage.value);
  return found?.icon;
});

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
  <div class="h-screen flex">
    <div class="w-full relative">
      <div class="hidden lg:block absolute inset-0 bg-black overflow-hidden" />
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
      <div class="flex flex-row absolute inset-0 p-0 lg:p-12">
        <!-- Login Card -->
        <div
          :class="[
            'flex flex-col justify-between items-center w-full h-full lg:w-1/2 rounded-xl px-6 lg:mr-12',
            bgLoginCard
          ]"
        >
          <div class="w-full flex flex-row justify-end gap-3 py-6">
            <div>
              <USelect
                v-model="selectedLanguage"
                value-key="code"
                size="lg"
                :items="languages"
                :icon="langIcon"
                :ui="{
                  trailingIcon:
                    'group-data-[state=open]:rotate-180 transition-transform duration-200'
                }"
                @update:model-value="setLocale"
              />
            </div>
            <div>
              <UColorModeButton size="lg" />
            </div>
          </div>
          <div class="w-full max-w-md text-center">
            <!-- Logo -->
            <div class="flex justify-center mb-8">
              <UColorModeAvatar
                class="size-24"
                light="/icons/something-logo-dark.svg"
                dark="/icons/something-logo-light.svg"
              />
            </div>
            <!-- Welcome Text -->
            <div class="flex flex-col gap-2 mb-16">
              <p class="text-xl font-bold">{{ $t('auth.welcome') }}</p>
              <p class="text-center text-sm">
                {{ $t('auth.subtitle') }}
              </p>
            </div>
            <!-- SignIn/SignUp Buttons -->
            <div class="space-y-3">
              <UButton
                icon="logos:google-icon"
                variant="outline"
                block
                color="neutral"
                size="xl"
                :ui="{ base: 'w-full rounded-full p-3 px-6 cursor-pointer' }"
                :loading="authStore.isLoading"
                @click="handleOnClickGoogleLoginButton"
              >
                {{ $t('auth.continue-with-google') }}
              </UButton>
              <UButton
                v-if="isApple"
                icon="logos:apple"
                block
                disabled
                color="neutral"
                size="xl"
                :ui="{ base: 'w-full rounded-full p-3 px-6 cursor-pointer' }"
              >
                {{ $t('auth.continue-with-apple') }}
              </UButton>
            </div>
          </div>
          <div class="w-full max-w-md text-center py-6">
            <p class="text-center text-xs text-neutral">
              <i18n-t keypath="auth.footer" scope="global">
                <template #brand>
                  <strong class="text-primary">Something By Nullindex</strong>
                </template>
                <template #terms>
                  <a href="/terms" target="_blank" class="underline">{{ $t('terms') }}</a>
                </template>
                <template #privacy>
                  <a href="/privacy" target="_blank" class="underline">{{ $t('privacy') }}</a>
                </template>
              </i18n-t>
            </p>
          </div>
        </div>
        <!-- Text Animation -->
        <div class="hidden lg:w-1/2 lg:flex items-center justify-center pointer-events-none">
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
            :rotation-interval="3000"
          />
        </div>
      </div>
    </div>
  </div>
</template>
