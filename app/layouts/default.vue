<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">
          Something
        </NuxtLink>
        <NuxtLink to="/ticket">
          Tickets
        </NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
