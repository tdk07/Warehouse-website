import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'lowercase-with-hyphens only'),
  description: z.string().max(5000).optional(),
  short_description: z.string().max(500).optional(),
  price: z.number().nonnegative(),
  original_price: z.number().nonnegative().optional(),
  category_id: z.string().uuid().optional(),
  sku: z.string().optional(),
  stock_quantity: z.number().int().nonnegative(),
  stock_status: z.enum(['in_stock', 'low_stock', 'out_of_stock', 'preorder', 'discontinued']),
  is_visible: z.boolean(),
  badge: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().optional(),
});

export const BulkOrderSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  company: z.string().optional(),
  product_interest: z.string().min(2).max(500),
  message: z.string().min(10).max(2000),
});
