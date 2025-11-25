import { FetchError } from 'ofetch';
import { defineStore } from 'pinia';

import { useAuthStore } from './auth';
import type { ApiErrorResponse, ApiResponse } from '../types/api';
import type { User } from '../types/user';

export const useUserStore = defineStore('user', {
  state: (): {
    item: User | null;
    itemGetting: boolean;
    itemError: ApiErrorResponse | null;
  } => {
    return {
      item: null,
      itemGetting: false,
      itemError: null
    };
  },
  actions: {
    async fetchCurrentUser() {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      const { $customFetch } = useNuxtApp();

      // Avoid loading animation in header once item got
      this.itemGetting = true;
      this.itemError = null;

      try {
        const response = await $customFetch<ApiResponse<User>>('/api-gateway/iam/api/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        this.item = response.data;
      } catch (error) {
        if (error instanceof FetchError) {
          this.itemError = error.data;
        } else {
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        this.itemGetting = false;
      }
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
});
