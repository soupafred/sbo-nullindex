<script setup lang="ts">
import { useApplicationHeaderStore } from '../stores/application-header';
import { useMerchantStore } from '../stores/merchant';

const merchantStore = useMerchantStore();
const applicationHeaderStore = useApplicationHeaderStore();
merchantStore.fetchItems();
</script>

<template>
  <div>
    <UHeader
      :toggle="false"
      :ui="{ root: 'h-14 static', container: 'max-w-none xl:px-3 px-3 sm:px-3 lg:px-3' }"
    >
      <template #left>
        <div class="flex items-center gap-0 h-14 overflow-y-hidden w-full">
          <NuxtLink to="/">
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
              :to="`/m-${applicationHeaderStore.breadcrumb ? applicationHeaderStore.breadcrumb.resource.id : ''}/-/overview`"
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
                        :to="`/m-${merchant.id}`"
                        @click="
                          () => {
                            applicationHeaderStore.setLevel1Breadcrumb(merchant, 'merchant');
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
        <UColorModeButton />
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
