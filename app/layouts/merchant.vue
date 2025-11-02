<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

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
        <div class="flex items-center gap-0 h-14 overflow-y-hidden">
          <NuxtLink to="/">
            <UAvatar
              size="lg"
              class="rounded-none squircle"
              src="icons/something-logo-light.svg"
              alt="Benjamin Canac"
            />
          </NuxtLink>

          <USeparator class="h-full ml-3" orientation="vertical" />
          <div class="relative">
            <USelectMenu
              model-value="New Balance Cambodia"
              size="xl"
              class="h-14 cursor-pointer"
              :avatar="{
                src: 'https://github.com/nuxt.png',
                size: 'md'
              }"
              variant="ghost"
              trailing-icon="heroicons:chevron-up-down-solid"
              :ui="{
                base: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none h-full w-full px-4 pl-14 pt-6 font-bold'
              }"
            />
            <label
              class="absolute left-13 top-2 text-gray-500 transition-all duration-200 text-xs px-1"
            >
              Merchant
            </label>
          </div>
          <USeparator class="h-full py-4" orientation="vertical" />
          <div class="relative">
            <USelectMenu
              model-value="New Balance Cambodia"
              size="xl"
              class="h-14 cursor-pointer"
              :avatar="{
                src: 'https://github.com/nuxt.png',
                size: 'md'
              }"
              variant="ghost"
              trailing-icon="heroicons:chevron-up-down-solid"
              :ui="{
                base: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none h-full w-full px-4 pl-14 pt-6'
              }"
            />
            <label
              class="absolute left-13 top-2 text-gray-500 transition-all duration-200 text-xs px-1"
            >
              Event
            </label>
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
