<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

import { useMerchantStore } from '../stores/merchant';
const merchantStore = useMerchantStore();
merchantStore.fetchItem();
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Overview',
      to: '/m-be03227e-bed9-4db9-8349-9cf772dba2b9'
    },
    {
      label: 'Events',
      to: '/m-be03227e-bed9-4db9-8349-9cf772dba2b9/-/events'
    },
    {
      label: 'Members',
      to: '/m-be03227e-bed9-4db9-8349-9cf772dba2b9/-/members'
    },
    {
      label: 'Settings',
      to: '/m-be03227e-bed9-4db9-8349-9cf772dba2b9/-/settings'
    }
  ]
]);
</script>

<template>
  <div>
    <UHeader :ui="{ root: 'h-14 static', container: 'max-w-none xl:px-3 px-3 sm:px-3 lg:px-3' }">
      <template #left>
        <div class="flex items-center gap-0 h-14 overflow-y-hidden w-full">
          <NuxtLink to="/">
            <UAvatar
              size="lg"
              class="rounded-none squircle"
              src="icons/something-logo-light.svg"
              alt="Benjamin Canac"
            />
          </NuxtLink>

          <USeparator class="h-full ml-3" orientation="vertical" />
          <div class="flex h-14 ring-neutral-200">
            <NuxtLink
              class="hover:bg-neutral-50 hover:ring-1 ring-neutral-200 h-full my-auto"
              :to="`/m-be03227e-bed9-4db9-8349-9cf772dba2b9`"
            >
              <div class="h-full flex flex-row pr-3">
                <UAvatar
                  v-if="!merchantStore.itemGetting"
                  size="lg"
                  src="https://images.bookme.plus/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaERyIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fe87151cf2aeab3b02bccdff51cdc13332417286/KV_1600x900.jpg"
                  class="mx-3 my-auto"
                  alt="Benjamin Canac"
                  :ui="{ icon: 'text-primary text-sm' }"
                />
                <USkeleton v-else class="mx-3 my-auto h-10 w-10 rounded-full" />
                <div class="my-auto">
                  <p class="text-neutral-500 text-[0.6rem] antialiasing">Merchant</p>
                  <p v-if="!merchantStore.itemGetting" class="text-lg text-black font-bold h6">
                    New Balance Cambodia
                  </p>
                  <USkeleton v-else class="h-6 w-[200px]" />
                </div>
              </div>
            </NuxtLink>
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
                :ui="{
                  base: 'rounded-none ring-neutral-200 hover:ring-1 active:!bg-neutral-100 data-[state=open]:bg-neutral-100 data-[state=open]:ring-1'
                }"
              />
              <template #content>
                <div class="flex items-center gap-2">
                  <div>
                    <UInput
                      icon="i-lucide-search"
                      size="xl"
                      variant="soft"
                      color="primary"
                      :ui="{ base: 'rounded-none rounded-t-md py-3' }"
                      placeholder="Search..."
                    />
                    <USeparator orientation="horizontal" />
                    <div class="flex flex-col gap-2 p-2 py-2">
                      <div>
                        <p class="text-xs text-neutral-500 px-3">Merchant</p>
                      </div>
                      <UButton
                        :avatar="{
                          src: 'https://github.com/nuxt.png'
                        }"
                        size="xl"
                        color="neutral"
                        active-variant="soft"
                        variant="ghost"
                        :ui="{ base: 'py-2 rounded-lg' }"
                        :to="`/m-be03227e-bed9-4db9-8349-9cf772dba2b9`"
                      >
                        Button
                      </UButton>

                      <UButton
                        :avatar="{
                          src: 'https://github.com/nuxt.png'
                        }"
                        size="xl"
                        color="neutral"
                        active-variant="soft"
                        variant="ghost"
                        :ui="{ base: 'py-2 rounded-lg' }"
                        :to="`/m-be03227e-bed9-4db9-8349-9cf772dba2b2`"
                      >
                        Button
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
    </UHeader>
    <UHeader :ui="{ root: 'h-12', container: 'max-w-none xl:px-0 px-0 sm:px-0 lg:px-0' }">
      <template #left>
        <UNavigationMenu
          color="neutral"
          :items="items"
          class="w-full px-3"
          :ui="{ item: 'py-1', link: 'px-3 py-2 aria-[current=page]:font-medium' }"
          highlight
          highlight-color="primary"
        />
      </template>
    </UHeader>

    <!--    <USeparator orientation="horizontal" />-->

    <div class="bg-neutral-50 h-[100vh]">
      <UContainer>
        <slot />
      </UContainer>
    </div>
  </div>
</template>

<style scoped>
.squircle {
  mask-image: url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}
</style>
