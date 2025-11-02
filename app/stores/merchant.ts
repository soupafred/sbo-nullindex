import { defineStore } from 'pinia';

import { useAuthStore } from './auth';
import type { Merchant } from '../types/merchant';

export const useMerchantStore = defineStore('merchant', {
  state: (): {
    endpoint: string;

    item: Merchant | null;
    itemGetting: boolean;
    itemPosting: boolean;
    itemPutting: boolean;
    itemDeleting: boolean;
    itemError: string | null;

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
    async fetchItem() {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      this.itemsGetting = true;
      try {
        const response = await $fetch<Merchant>(this.endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        this.item = response;
      } finally {
        this.itemsGetting = false;
        this.itemGetting = false;
      }
    }
  },
  persist: false
});
