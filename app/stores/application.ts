import { defineStore } from 'pinia';

import type { ApiErrorResponse } from '../types/api';

export const useApplication = defineStore('application', {
  state: (): {
    isError: boolean;
    error: ApiErrorResponse | null;
  } => {
    return {
      isError: false,
      error: null
    };
  },
  persist: true
});
