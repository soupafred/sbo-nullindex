<script setup lang="ts">
import { useApplicationHeaderStore } from '../stores/application-header';
import { useMerchantStore } from '../stores/merchant';

const merchantStore = useMerchantStore();
const applicationHeaderStore = useApplicationHeaderStore();
const appHeaderStore = useApplicationHeaderStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const merchantSlug = route.params.merchantSlug as string;
const t = useI18n().t;

const defaultNavigationMenuItemBluePrints = ref([
  {
    label: t('common.overview'),
    to: '/-/overview'
  },
  {
    label: t('common.events'),
    to: '/-/events'
  },
  {
    label: t('common.setting'),
    to: '/-/settings'
  }
]);

const items = ref([
  [
    {
      label: userStore.item?.full_name || 'N/A',
      avatar: {
        src: userStore.item?.avatar_url
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/docs/components/dropdown-menu'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      onSelect: () => {
        authStore.handleLogOut();
        router.push('/auth');
      }
    }
  ]
]);

onMounted(async () => {
  userStore.fetchCurrentUser();
  await merchantStore.fetchItem(merchantSlug, { bySlug: true });
  if (merchantStore.item) {
    await router.replace(`/m-${merchantSlug}/-/overview`);
    if (merchantStore.item)
      appHeaderStore.setLevel1Breadcrumb(
        merchantStore.item,
        'merchant',
        defaultNavigationMenuItemBluePrints.value
      );
  } else {
    if (
      merchantStore.itemError?.code &&
      ['404', '403', '500'].includes(merchantStore.itemError?.code)
    )
      await router.replace(`/m-${merchantSlug}/-/error`);
  }

  await merchantStore.fetchItems();
});
</script>

<template>
  <div>
    <UHeader
      :toggle="false"
      :ui="{ root: 'h-14 static', container: 'max-w-none px-3 sm:px-3 lg:px-3 xl:px-0' }"
    >
      <template #left>
        <div class="flex items-center gap-0 h-14 overflow-y-hidden w-full">
          <NuxtLink to="/" class="pl-3">
            <UAvatar
              size="lg"
              class="rounded-lg squircle"
              src="/icons/something-logo-light.svg"
              alt="Something Logo"
            />
          </NuxtLink>
          <USeparator class="h-full ml-3" orientation="vertical" />
          <div class="flex h-14 ring-neutral-200">
            <NuxtLink
              v-if="!merchantStore.itemError"
              class="h-full my-auto"
              :to="`/m-${applicationHeaderStore.breadcrumb ? applicationHeaderStore.breadcrumb.resource.slug : ''}/-/overview`"
            >
              <div class="h-full min-w-75 flex flex-row pr-3">
                <UAvatar
                  v-if="!merchantStore.itemGetting && applicationHeaderStore.breadcrumb"
                  size="lg"
                  :src="applicationHeaderStore.breadcrumb.resource.logo_url"
                  class="mx-3 my-auto"
                  :alt="applicationHeaderStore.breadcrumb.resource.name"
                  :ui="{ icon: 'text-primary text-sm' }"
                />
                <USkeleton v-else class="mx-3 my-auto h-9 w-9 rounded-full" />
                <div class="my-auto">
                  <p
                    v-if="!merchantStore.itemGetting && applicationHeaderStore.breadcrumb"
                    class="text-neutral-500 text-[0.6rem] antialiasing uppercase"
                  >
                    {{ $t('common.merchant') }}
                  </p>
                  <USkeleton v-else class="h-[0.6rem] mb-1 min-w-55" />
                  <p
                    v-if="!merchantStore.itemGetting && applicationHeaderStore.breadcrumb"
                    class="text-lg antialiasing"
                  >
                    {{ applicationHeaderStore.breadcrumb.resource.name }}
                  </p>
                  <USkeleton v-else class="h-7 min-w-55" />
                </div>
              </div>
            </NuxtLink>
            <div v-else class="h-full min-w-75 p-3 pt-2">
              <div class="flex flex-row">
                <div class="my-auto pt-2 px-2">
                  <UIcon name="heroicons:exclamation-triangle-solid" class="text-lg" />
                </div>
                <div class="ml-3">
                  <p class="text-neutral-500 text-[0.6rem] antialiasing">
                    Error - {{ merchantStore.itemError.code }}
                  </p>
                  <p class="antialiasing">
                    {{ merchantStore.itemError.message }}
                  </p>
                </div>
              </div>
            </div>
            <USeparator class="py-3" orientation="vertical" />
            <UPopover
              mode="click"
              arrow
              :content="{
                align: 'center',
                side: 'bottom',
                sideOffset: 4
              }"
            >
              <UButton
                icon="heroicons:chevron-up-down-solid"
                variant="ghost"
                color="neutral"
                class="cursor-pointer px-2"
                :loading="merchantStore.itemsGetting"
                loading-icon="heroicons:arrow-path-solid"
                :ui="{
                  base: 'rounded-none ring-neutral-200 hover:ring-1 active:!bg-neutral-100 data-[state=open]:bg-neutral-100 data-[state=open]:ring-1'
                }"
              />
              <template #content="{ close }">
                <div class="flex items-center gap-2">
                  <div>
                    <UInput
                      icon="i-lucide-search"
                      size="xl"
                      variant="soft"
                      color="primary"
                      class="w-full"
                      :ui="{ base: 'rounded-none rounded-t-md py-3' }"
                      disabled
                      placeholder="Search..."
                    />
                    <USeparator orientation="horizontal" />
                    <div class="flex flex-col gap-2 p-2 py-2">
                      <div>
                        <p class="text-xs text-neutral-500 px-3">{{ $t('common.merchant') }}</p>
                      </div>
                      <UButton
                        v-for="merchant in merchantStore.items"
                        :key="merchant.id"
                        :avatar="{
                          src: merchant.logo_url,
                          alt: merchant.name
                        }"
                        size="xl"
                        color="neutral"
                        active-variant="soft"
                        variant="ghost"
                        :ui="{ base: 'py-2 rounded-lg' }"
                        :to="`/m-${merchant.slug}/-/overview`"
                        @click="
                          () => {
                            applicationHeaderStore.setLevel1Breadcrumb(
                              merchant,
                              'merchant',
                              defaultNavigationMenuItemBluePrints
                            );
                            close();
                          }
                        "
                      >
                        {{ merchant.name }}
                      </UButton>

                      <USeparator class="px-0" orientation="horizontal" />
                      <UButton
                        icon="heroicons:plus-circle"
                        size="xl"
                        color="neutral"
                        active-variant="soft"
                        variant="ghost"
                        :ui="{ base: 'py-2 rounded-lg' }"
                        :to="`/m-new`"
                      >
                        Create New
                      </UButton>
                    </div>
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
          <USeparator class="h-full" orientation="vertical" />
        </div>
      </template>
      <template #right>
        <div class="flex h-14">
          <USeparator class="h-full" orientation="vertical" />
          <UColorModeButton class="cursor-pointer p-3 px-5 rounded-0" />
          <USeparator class="h-full" orientation="vertical" />
          <UButton
            icon="heroicons:bell"
            color="neutral"
            variant="ghost"
            class="p-3 px-5 cursor-pointer"
          />
          <USeparator class="h-full" orientation="vertical" />
          <UDropdownMenu :items="items" class="p-3 px-4 rounded-0 cursor-pointer">
            <UButton
              size="xl"
              :avatar="{ src: userStore.item?.avatar_url }"
              color="neutral"
              variant="ghost"
            />
          </UDropdownMenu>
          <USeparator class="h-full" orientation="vertical" />
        </div>
      </template>
    </UHeader>
    <UHeader
      v-if="applicationHeaderStore.navigationMenuItems"
      :ui="{ root: 'h-12', container: 'max-w-none xl:px-0 px-0 sm:px-0 lg:px-0' }"
      :toggle="false"
    >
      <template #left>
        <UNavigationMenu
          v-if="applicationHeaderStore.navigationMenuItems.length > 0"
          color="neutral"
          :highlight="true"
          :items="applicationHeaderStore.navigationMenuItems"
          variant="link"
          class="w-full px-3"
          :ui="{
            item: 'py-1',
            link: 'px-3 py-1 pb-1.5 aria-[current=page]:font-medium'
          }"
        />
        <div v-else-if="merchantStore.itemsGetting" class="h-full">
          <div class="pl-4 pt-2">
            <UIcon name="heroicons:arrow-path-solid" class="text-neutral-400 animate-spin" />
          </div>
        </div>
        <div v-else class="h-full">
          <div class="pl-4 pt-2">
            <UIcon name="heroicons:exclamation-triangle-solid" class="text-lg" />
          </div>
        </div>
      </template>
    </UHeader>
    <div class="bg-neutral-50 dark:bg-primary h-[100vh]">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
