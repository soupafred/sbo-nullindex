import { defineStore } from 'pinia';

import type { ApiErrorResponse } from '../types/api';

export const useApplication = defineStore('application', {
  state: (): {
    isError: boolean;
    error: ApiErrorResponse | null;
    redirectAfterLogin: string | null;
  } => {
    return {
      isError: false,
      error: null,
      redirectAfterLogin: null
    };
  },
  getters: {},
  actions: {
    setRedirectAfterLogin(path: string | null) {
      this.redirectAfterLogin = path;
    }
  },
  persist: true
});
