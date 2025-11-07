import type { NavigationMenuItem } from '@nuxt/ui';
import { defineStore } from 'pinia';

import type { HeaderBreadcrumbItem } from '../types/application';
import type { Merchant } from '../types/merchant';

const defaultNavigationMenuItemBluePrints = [
  {
    label: 'overview',
    to: '/-/overview'
  },
  {
    label: 'events',
    to: '/-/events'
  },
  {
    label: 'setting',
    to: '/-/settings'
  }
];

export const useApplicationHeaderStore = defineStore('application-header', {
  state: (): {
    isLoading: boolean;
    currentResourceType: 'merchant' | 'event' | 'ticket' | 'user-profile';
    breadcrumb: HeaderBreadcrumbItem | null;
    navigationMenuItems: NavigationMenuItem[];
  } => {
    return {
      isLoading: false,
      currentResourceType: 'merchant',
      breadcrumb: null,
      navigationMenuItems: []
    };
  },
  getters: {},
  actions: {
    setLevel1Breadcrumb(resource: Merchant, type: 'merchant' | 'user-profile') {
      const newItem: HeaderBreadcrumbItem = {
        resource_type: type,
        resource_label: type,
        resource: { ...resource },
        to: `/m-${resource.id}`
      };

      this.breadcrumb = newItem;
      this.handleSetupNavigationMenuItems();
    },
    handleSetupNavigationMenuItems() {
      if (this.breadcrumb === null) {
        this.navigationMenuItems = [];
        return;
      }

      const baseTo = this.breadcrumb.to;

      this.navigationMenuItems = defaultNavigationMenuItemBluePrints.map((item) => {
        return {
          label: item.label,
          to: item.to ? `${baseTo}${item.to}` : `${baseTo}`
        };
      });
    }
  }
});
