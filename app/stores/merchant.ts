import { FetchError } from 'ofetch';
import { defineStore } from 'pinia';

import { useAuthStore } from './auth';
import type { ApiResponse, ApiErrorResponse } from '../types/api';
import type { Merchant } from '../types/merchant';

export const useMerchantStore = defineStore('merchant', {
  state: (): {
    endpoint: string;

    item: Merchant | null;
    itemGetting: boolean;
    itemPosting: boolean;
    itemPutting: boolean;
    itemDeleting: boolean;
    itemError: ApiErrorResponse | null;

    items: Merchant[];
    itemsGetting: boolean;
    itemsError: string | null;
  } => {
    return {
      endpoint: '/api-gateway/merchant/api/v1/sbo/merchant-profiles',

      item: null,
      itemGetting: true,
      itemPosting: false,
      itemPutting: false,
      itemDeleting: false,
      itemError: null,

      items: [],
      itemsGetting: true,
      itemsError: null
    };
  },
  getters: {},
  actions: {
    async fetchItem(uuid: string) {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      this.itemGetting = true;
      this.itemError = null;

      try {
        const response = await $fetch<ApiResponse<Merchant>>(this.endpoint + '/' + uuid, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        this.item = response.data;
      } catch (error) {
        if (error instanceof FetchError) {
          // This is the custom error from your original code's try block,
          // or one you threw in the Response check above.
          this.itemError = error.data;
          console.log('error', { ...this.itemError });
        } else {
          // 3. The error is a genuine network error (e.g., 'Failed to fetch') or other unexpected exception
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        this.itemGetting = false;
      }
    },
    async fetchItems() {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      this.itemsGetting = true;
      try {
        const response = await $fetch<ApiResponse<Merchant[]>>(this.endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        this.items = response.data;
      } catch (error) {
        console.log('error', error);
        this.itemsError = (error as Error).message;
      } finally {
        this.itemsGetting = false;
      }
    }
  },
  persist: false
});
