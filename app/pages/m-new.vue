<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

import { useUserStore } from '../stores/user';
definePageMeta({ layout: 'default' });
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const { t } = useI18n();
const merchantStore = useMerchantStore();
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: t('merchant.slug_required') })
    .max(80, { message: t('merchant.slug_too_long') }),
  slug: z
    .string()
    .trim()
    .min(2, { message: t('merchant.slug_required') })
    .max(80, { message: t('merchant.slug_too_long') })
    .regex(slugRegex, { message: t('merchant.slug_invalid') })
});

type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  name: '',
  slug: ''
});
const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  console.log(event.data);
}

onMounted(() => {
  const userStore = useUserStore();

  if (userStore.item) state.name = userStore.item.full_name + "'s Merchant";
});

watch(
  () => state.name,
  (val) => {
    if (!val) {
      state.slug = '';
      return;
    }

    state.slug = val
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-') // spaces → hyphen
      .replace(/-+/g, '-'); // collapse multiple hyphens
  }
);

watch(
  () => state.slug,
  (newSlug) => {
    checkSlugDebounced(newSlug || '');
  }
);

function debounce<T extends (...args: never[]) => void>(fn: T, delay = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const isCheckingSlug = ref(false);
const slugAvailability = ref<{
  slug: string;
  is_available: boolean;
} | null>(null);

const checkSlugDebounced = debounce(async (slug: string) => {
  if (!slug) return;

  isCheckingSlug.value = true;
  try {
    slugAvailability.value = await merchantStore.validateSlugAvailability(slug);
  } finally {
    isCheckingSlug.value = false;
  }
}, 600);
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-5xl px-6 pt-10 mt-20">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <!-- LEFT -->
        <div>
          <h1 class="text-2xl font-semibold">Create Merchant</h1>
          <p class="mt-1 text-sm text-gray-500">
            Get started by creating your new business profile.
          </p>

          <div class="mt-6 space-y-4">
            <UForm
:schema="schema"
:state="state"
class="space-y-6"
@submit="onSubmit">
              <UFormField :label="t('merchant.name')" name="name">
                <UInput
                  v-model="state.name"
                  class="w-full"
                  size="xl"
                  :placeholder="t('merchant.name_placeholder')"
                />

                <div>
                  <p class="text-xs mt-2 text-gray-400">
                    Your merchant URL will be <strong>{{ state.slug }}</strong>
                  </p>
                </div>

                <p v-if="isCheckingSlug" class="text-sm text-gray-400">Checking availability…</p>

                <p
                  v-else-if="slugAvailability"
                  :class="slugAvailability.is_available ? 'text-green-600' : 'text-red-600'"
                >
                  {{ slugAvailability.is_available ? 'Slug is available' : 'Slug already taken' }}
                </p>
              </UFormField>

              <div class="flex gap-2">
                <UButton color="neutral" type="submit">{{ t('merchant.btn_save') }}</UButton>
              </div>
            </UForm>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="space-y-4">
          <!-- Preview Card -->
          <UCard class="rounded-xl border-gray-200">
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium"
              >
                C
              </div>
              <div>
                <div class="text-sm font-semibold">CamRunner</div>
                <div class="text-xs text-gray-400">Established : 14/12/2025</div>
              </div>
            </div>

            <p class="mt-3 text-xs leading-5 text-gray-600">form.bio</p>
          </UCard>

          <!-- Featured -->
          <div class="grid grid-cols-5 gap-3">
            <div class="col-span-4">
              <div class="relative h-36 overflow-hidden rounded-xl border">
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/40" />
                <div class="absolute bottom-2 left-2">
                  <p class="text-xs font-semibold text-white">FFF Party Musicverse</p>
                  <p class="text-[10px] text-white/80">Fk Travis told his fans, “Thi…”</p>
                </div>
              </div>
            </div>

            <div class="col-span-1">
              <div class="relative h-36 overflow-hidden rounded-xl border">
                <img
                  src="https://images.unsplash.com/photo-1521334726092-b509a19597c1?w=600"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/40" />
                <div class="absolute bottom-2 left-2 text-white text-xs">Trey</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
