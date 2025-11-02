import { defineStore } from 'pinia';

export const useApplication = defineStore('application', {
  state: () => {
    return {
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true
    };
  },
  persist: true
});
