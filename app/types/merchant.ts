export interface Merchant {
  id: string;
  slug: string;
  name: string;

  logo_url: string;
  banner_url?: string;
  description?: string;
}

export interface MerchantSlugAvailabilityResponse {
  slug: string;
  is_available: boolean;
}
