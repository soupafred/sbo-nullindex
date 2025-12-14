import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createMerchantSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, { message: 'merchant.slug_required' })
    .max(80, { message: 'merchant.slug_too_long' })
    .regex(slugRegex, { message: 'merchant.slug_invalid' }),

  name: z
    .string()
    .trim()
    .min(2, { message: 'merchant.name_required' })
    .max(120, { message: 'merchant.name_too_long' }),

  logo_url: z.string().trim().url({ message: 'merchant.logo_url_invalid' }),

  banner_url: z
    .string()
    .trim()
    .url({ message: 'merchant.banner_url_invalid' })
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .trim()
    .max(2000, { message: 'merchant.description_too_long' })
    .optional()
    .or(z.literal(''))
});

export const updateMerchantSchema = createMerchantSchema.partial();

export const merchantSchema = createMerchantSchema.extend({
  id: z.string().min(1)
});

export type CreateMerchantInput = z.infer<typeof createMerchantSchema>;
export type UpdateMerchantInput = z.infer<typeof updateMerchantSchema>;
export type Merchant = z.infer<typeof merchantSchema>;
