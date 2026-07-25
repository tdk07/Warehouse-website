import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Search, Star, ShoppingBag, Box } from '../Icons';

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order');
  if (error) throw error;
  return data || [];
};

const fetchProducts = async (category, search) => {
  let query = supabase
    .from('products')
    .select('id, name, slug, price, original_price, stock_status, rating, badge, category_id, currency, product_images(storage_path, is_primary)')
    .eq('is_visible', true)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category_id', category);
  }
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

const Shop = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: products = [], isLoading } = useQuery({ 
    queryKey: ['products', selectedCategory, searchQuery], 
    queryFn: () => fetchProducts(selectedCategory, searchQuery) 
  });

  return (
    <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
        <div>
          <h2 className="text-6xl font-black tracking-tighter uppercase italic mb-4">
            Inventory
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'all' ? "bg-black text-white shadow-2xl scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
            >
              All Collections
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === c.id ? "bg-black text-white shadow-2xl scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="relative group w-full lg:w-96">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-yellow-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-500 transition-all font-bold text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
          Loading inventory...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {products.map((p) => {
            const imageUrl = p.product_images?.[0]?.storage_path 
                ? `${supabase.storage.from('product-images').getPublicUrl(p.product_images[0].storage_path).data.publicUrl}`
                : ''; 
            
            return (
              <div key={p.id} className="group">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6">
                  {p.badge && (
                    <span className="absolute top-6 left-6 z-10 bg-yellow-500 text-black text-[9px] font-black uppercase px-4 py-2 rounded-full shadow-xl">
                      {p.badge}
                    </span>
                  )}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={p.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <ShoppingBag size={48} />
                    </div>
                  )}
                </div>
                <div className="space-y-4 px-2">
                  <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.3em]">
                    {categories.find(c => c.id === p.category_id)?.name || 'Uncategorized'}
                  </p>
                  <h3 className="text-lg font-black tracking-tight leading-tight">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-black">
                      {p.currency} {Number(p.price).toLocaleString()}
                    </p>
                    {p.original_price && p.original_price > p.price && (
                      <p className="text-gray-400 line-through text-xs font-bold">
                        {p.currency} {Number(p.original_price).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < p.rating ? "#FACC15" : "none"}
                        className={
                          i < p.rating ? "text-yellow-500" : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => onAddToCart({ ...p, image: imageUrl, quantity: 1 })}
                    className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black hover:text-yellow-500 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="py-40 text-center opacity-20">
          <Box size={80} className="mx-auto mb-6" />
          <h3 className="text-4xl font-black uppercase tracking-tighter">
            Stock Unavailable
          </h3>
        </div>
      )}
    </section>
  );
};

export default Shop;
