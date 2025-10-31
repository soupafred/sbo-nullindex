<template>
  <div>
    <UHeader :ui="{ root: 'h-14', container: 'max-w-none xl:px-3 px-3 sm:px-3 lg:px-3' }">
      <template #left>
        <div class="flex items-center gap-0 h-14 overflow-y-hidden">
          <div class="bg-gray-50">
            <UAvatar
              size="lg"
              class="rounded-none squircle shadow-md"
              src="icons/something-logo-light.svg"
              alt="Benjamin Canac"
            />
          </div>

          <USeparator class="h-full ml-3" orientation="vertical" />
          <USelectMenu
            model-value="New Balance Cambodia"
            size="xl"
            class="w-100 cursor-pointer"
            :ui="{ base: 'ring-0 bg-tranparent hover:bg-gray-100 rounded-none h-full w-full px-4' }"
          />
          <USeparator class="h-full" orientation="vertical" />
        </div>
      </template>
    </UHeader>

    <UContainer>
      <div class="text-blue-50">dd</div>
      <slot />
    </UContainer>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.squircle {
  mask-image: url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}
</style>
