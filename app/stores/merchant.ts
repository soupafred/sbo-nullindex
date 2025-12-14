import { FetchError } from 'ofetch';
import { defineStore } from 'pinia';

import { useAuthStore } from './auth';
import type { ApiResponse, ApiErrorResponse } from '../types/api';
import type { Merchant, MerchantSlugAvailabilityResponse } from '../types/merchant';

import { useNuxtApp } from '#app';

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
    async fetchDefault() {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      const { $customFetch } = useNuxtApp();

      // Avoid loading animation in header once item got
      if (!this.item) this.itemGetting = true;
      this.itemError = null;

      try {
        const response = await $customFetch<ApiResponse<Merchant>>(
          this.endpoint + '/slug/default',
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );
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
    },
    async fetchItem(targetValue: string, { bySlug = false } = {}) {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      const { $customFetch } = useNuxtApp();

      // Avoid loading animation in header once item got
      if (!this.item) this.itemGetting = true;
      this.itemError = null;

      try {
        const finalEndpoint = bySlug
          ? `${this.endpoint}/slug/${targetValue}`
          : `${this.endpoint}/${targetValue}`;

        const response = await $customFetch<ApiResponse<Merchant>>(finalEndpoint, {
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
        this.itemsError = (error as Error).message;
      } finally {
        this.itemsGetting = false;
      }
    },
    async validateSlugAvailability(slug: string) {
      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      const { $customFetch } = useNuxtApp();

      try {
        const response = await $customFetch<ApiResponse<MerchantSlugAvailabilityResponse>>(
          this.endpoint + '/check-slug-availability',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            method: 'POST',
            body: { slug: slug }
          }
        );
        return response.data;
      } catch (error) {
        return {
          slug: slug,
          is_available: false,
          error: error
        };
      }
    }
  },
  persist: false
});
