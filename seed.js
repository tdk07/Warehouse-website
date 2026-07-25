import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envConfig = dotenv.parse(fs.readFileSync(path.resolve('.env.local')));

const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbGdhYXpvam93bXltbXhwZGpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTAwMzc1NSwiZXhwIjoyMTAwNTc5NzU1fQ.nSNAD6EVqz88wzxxCh5UPV3ZGWQJHTItSmJVs89aBOU";

const supabase = createClient(envConfig.VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

const CATEGORIES = [
  { slug: "drones", name: "Drones", sort_order: 1 },
  { slug: "adapters", name: "Adapters", sort_order: 2 },
  { slug: "cables", name: "Cables", sort_order: 3 },
  { slug: "temper", name: "Tempered Glass", sort_order: 4 },
  { slug: "shoes", name: "Footwear", sort_order: 5 },
  { slug: "bags", name: "Bags & Cases", sort_order: 6 },
];

const PRODUCTS = [
  {
    category: "drones",
    name: "JS39P MEGA Drone",
    price: 12999,
    original_price: 15999,
    rating: 5,
    badge: "Limited",
    stock_quantity: 10,
  },
  {
    category: "drones",
    name: "S11 MINI NEO",
    price: 4500,
    original_price: 5999,
    rating: 4,
    stock_quantity: 25,
  },
  {
    category: "drones",
    name: "M3 MAX Industrial",
    price: 24999,
    original_price: 29999,
    rating: 5,
    badge: "Pro",
    stock_quantity: 5,
  },
  {
    category: "adapters",
    name: "35W Apple Dual Type C",
    price: 3499,
    original_price: 4500,
    rating: 5,
    badge: "Bestseller",
    stock_quantity: 50,
  },
  {
    category: "adapters",
    name: "Samsung 65W Trio",
    price: 3999,
    original_price: 5500,
    rating: 4,
    stock_quantity: 30,
  },
  {
    category: "adapters",
    name: "OnePlus SuperVOOC 45W",
    price: 2199,
    original_price: 2900,
    rating: 5,
    stock_quantity: 40,
  },
  {
    category: "cables",
    name: "Apple 1M Braided Type-C",
    price: 1899,
    original_price: 2500,
    rating: 5,
    stock_quantity: 100,
  },
  {
    category: "temper",
    name: "iPhone 11-17 SuperD Glass",
    price: 599,
    original_price: 999,
    rating: 5,
    badge: "Strongest",
    stock_quantity: 200,
  },
  {
    category: "shoes",
    name: "Luxury Men Footwear",
    price: 5500,
    original_price: 8500,
    rating: 4,
    stock_quantity: 15,
  },
  {
    category: "bags",
    name: "Premium Travel Case",
    price: 9500,
    original_price: 14000,
    rating: 5,
    stock_quantity: 20,
  },
];

async function seed() {
  console.log("Seeding Categories...");
  for (const cat of CATEGORIES) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
    if (error) console.error("Error inserting category", cat.name, error);
  }
  
  // Get all inserted categories
  const { data: dbCategories } = await supabase.from('categories').select('*');
  const catMap = {};
  dbCategories.forEach(c => catMap[c.slug] = c.id);

  console.log("Seeding Products...");
  for (const prod of PRODUCTS) {
    const catId = catMap[prod.category];
    if (!catId) continue;
    
    const dbProduct = {
      name: prod.name,
      slug: prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      price: prod.price,
      original_price: prod.original_price,
      rating: prod.rating,
      badge: prod.badge || null,
      stock_quantity: prod.stock_quantity,
      category_id: catId,
      is_visible: true,
      stock_status: 'in_stock',
      currency: 'INR'
    };

    const { error } = await supabase.from('products').upsert(dbProduct, { onConflict: 'slug' });
    if (error) console.error("Error inserting product", prod.name, error.message);
  }

  console.log("Seeding complete!");
}

seed();
