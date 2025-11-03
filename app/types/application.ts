import type { Merchant } from './merchant';

export interface HeaderBreadcrumbItem {
  resource_type: string;
  resource_label: string;
  resource: Merchant;
  to: string;
}
