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
    <UHeader :ui="{ root: 'h-14', container: 'max-w-none xl:px-3 px-3 sm:px-3 lg:px-3' }">
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
          <!--          <div class="relative">-->
          <!--          <USelectMenu-->
          <!--            model-value="New Balance Cambodia"-->
          <!--            size="xl"-->
          <!--            class="h-14 cursor-pointer"-->
          <!--            :avatar="{-->
          <!--                src: 'https://github.com/nuxt.png',-->
          <!--                size: 'md'-->
          <!--              }"-->
          <!--            variant="ghost"-->
          <!--            trailing-icon="heroicons:chevron-up-down-solid"-->
          <!--            :ui="{-->
          <!--                base: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none h-full w-full px-4 pl-14 pt-6'-->
          <!--              }"-->
          <!--          />-->
          <!--          <label-->
          <!--            class="absolute left-13 top-2 text-gray-500 transition-all duration-200 text-xs px-1"-->
          <!--          >-->
          <!--            Merchant-->
          <!--          </label>-->
          <!--        </div>-->
          <!--          <USeparator class="h-full" orientation="vertical" />-->
          <div class="flex h-14 ring-gray-200">
            <NuxtLink
              class="hover:bg-gray-50 hover:ring-1 ring-gray-200 h-full my-auto"
              :to="`/m-be03227e-bed9-4db9-8349-9cf772dba2b9`"
            >
              <div class="h-full flex flex-row pr-3">
                <UAvatar
                  v-if="!merchantStore.itemGetting"
                  size="lg"
                  icon="i-lucide-image"
                  class="mx-3 my-auto"
                  alt="Benjamin Canac"
                  :ui="{ icon: 'text-primary text-sm' }"
                />
                <USkeleton v-else class="mx-3 my-auto h-10 w-10 rounded-full" />
                <div class="my-auto">
                  <p class="text-gray-500 text-xs">Merchant</p>
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
                  base: 'rounded-none ring-gray-200 hover:ring-1 active:!bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:ring-1'
                }"
              />
              <template #content>
                <Placeholder class="size-48 m-4 inline-flex" />
              </template>
            </UPopover>
          </div>
          <USeparator class="h-full" orientation="vertical" />
        </div>
      </template>
    </UHeader>
    <UNavigationMenu
      color="neutral"
      :items="items"
      class="w-full px-3"
      :ui="{ item: 'py-1', link: 'px-3 py-2 aria-[current=page]:font-medium' }"
      highlight
      highlight-color="primary"
    />
    <USeparator orientation="horizontal" />
    <UContainer>
      <div class="text-blue-50">dd</div>
      <slot />
    </UContainer>
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
