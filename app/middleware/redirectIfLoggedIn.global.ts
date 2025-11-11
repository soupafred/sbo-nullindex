import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Redirect to '/' if access auth page when logged-in
  if (authStore.isLoggedIn && (to.path.startsWith('/auth') || to.path.startsWith('/auth-verify'))) {
    return navigateTo('/');
  }

  // Redirect to '/auth' if access any page when not logged-in
  if (!authStore.isLoggedIn && !to.path.startsWith('/auth')) {
    return navigateTo('/auth');
  }
});
