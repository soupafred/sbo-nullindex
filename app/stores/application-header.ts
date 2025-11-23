import type { NavigationMenuItem } from '@nuxt/ui';
import { defineStore } from 'pinia';

import type { HeaderBreadcrumbItem } from '../types/application';
import type { Merchant } from '../types/merchant';
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
    setLevel1Breadcrumb(
      resource: Merchant,
      type: 'merchant' | 'user-profile',
      defaultNavigationMenuItemBluePrints: { label: string; to: string | null }[]
    ) {
      const newItem: HeaderBreadcrumbItem = {
        resource_type: type,
        resource_label: type,
        resource: { ...resource },
        to: `/m-${resource.slug}`
      };

      this.breadcrumb = newItem;
      this.handleSetupNavigationMenuItems(defaultNavigationMenuItemBluePrints);
    },
    handleSetupNavigationMenuItems(
      defaultNavigationMenuItemBluePrints: { label: string; to: string | null }[]
    ) {
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
