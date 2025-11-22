import { FetchError } from 'ofetch';
import { defineStore } from 'pinia';

import { useNuxtApp } from '#app';
import type { ApiErrorResponse } from '~/types/api';
import type { TokenExchangeResponse } from '~/types/iam';

export const useAuthStore = defineStore('auth', {
  state: (): {
    endpoint: string;
    isLoading: boolean;
    isLogedIn: boolean;
    error: ApiErrorResponse | null;
    accessToken: string;
    refreshToken: string;
  } => {
    return {
      endpoint: '/api-gateway/iam/api/v1',
      isLoading: false,
      isLogedIn: false,
      error: null,
      accessToken: '',
      refreshToken: ''
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken
  },
  actions: {
    async getGoogleLoginRedirectURL() {
      const { $customFetch } = useNuxtApp();
      this.error = null;
      this.isLoading = true;

      try {
        const response = await $customFetch<{ url: string }>(
          this.endpoint + '/oauth/sbo/get-google-login-url'
        );
        return response.url;
      } catch (error) {
        if (error instanceof FetchError) {
          this.error = error.data;
        } else {
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async verifyExchangeToken(code: string) {
      const { $customFetch } = useNuxtApp();
      this.error = null;
      this.isLoading = true;

      try {
        const response = await $customFetch<TokenExchangeResponse>(
          `${this.endpoint}/oauth/tokens/code`,
          {
            method: 'POST',
            body: { code }
          }
        );

        this.accessToken = response.accessToken;
        this.refreshToken = response.refreshToken;
      } catch (error) {
        if (error instanceof FetchError) {
          this.error = error.data;
        } else {
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    handleLogOut() {
      this.accessToken = '';
      this.refreshToken = '';
      this.error = null;
      this.isLoading = false;

      window.location.href = '/auth';
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
});
