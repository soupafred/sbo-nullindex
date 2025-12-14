<template>
  <div class="page">
    <div class="content">
      <slot />
    </div>
    <MainFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1; /* take remaining height */
}
</style>
