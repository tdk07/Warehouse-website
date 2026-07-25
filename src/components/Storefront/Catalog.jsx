import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Box, MessageCircle } from '../Icons';
import { supabase } from '../../lib/supabase';

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order');
  if (error) throw error;
  return data || [];
};

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, category_id, currency, product_images(storage_path, is_primary)')
    .eq('is_visible', true)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

const Catalog = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: catsLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: products = [], isLoading: prodsLoading } = useQuery({ queryKey: ['products', 'all'], queryFn: fetchProducts });

  if (catsLoading || prodsLoading) {
    return <div className="pt-48 pb-32 text-center font-bold text-gray-400">Loading catalog...</div>;
  }

  return (
    <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <Box size={16} />
          Product Catalog
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">
          Our <span className="text-yellow-500">Collection</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          Browse our comprehensive product catalog featuring premium imports across multiple categories.
        </p>
      </div>

      {/* Product Catalog Grid */}
      <div className="space-y-32 mb-32">
        {categories.map((category) => {
          const categoryProducts = products.filter(p => p.category_id === category.id);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id}>
              <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter">
                  {category.name}
                </h3>
                <Link
                  to="/shop"
                  state={{ category: category.id }}
                  className="text-xs font-black uppercase tracking-widest text-yellow-600 hover:text-black transition-colors"
                >
                  View All {category.name} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {categoryProducts.map((p) => {
                  const imageUrl = p.product_images?.[0]?.storage_path 
                    ? `${supabase.storage.from('product-images').getPublicUrl(p.product_images[0].storage_path).data.publicUrl}`
                    : ''; 
                    
                  return (
                    <div key={p.id} className="group cursor-pointer" onClick={() => onAddToCart({ ...p, image: imageUrl, quantity: 1 })}>
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 mb-6 border border-gray-100 group-hover:border-yellow-500 transition-colors">
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={p.name}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Quick Add
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                        <p className="text-yellow-600 font-black">{p.currency || 'USD'} {Number(p.price).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[4rem] p-12 md:p-16">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-black">
          Need Something Specific?
        </h3>
        <p className="text-black/80 text-lg font-bold mb-8 max-w-2xl mx-auto">
          Can't find what you're looking for? Contact us for custom sourcing and special orders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open("https://wa.me/918668160867?text=I need help finding a product", "_blank")}
            className="bg-black text-yellow-500 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <MessageCircle size={18} />
            Contact Us
          </button>
          <Link
            to="/shop"
            className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl inline-block"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
