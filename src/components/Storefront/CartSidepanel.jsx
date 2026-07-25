import React, { useMemo } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from '../Icons';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../lib/whatsapp';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

const fetchSettings = async () => {
  const { data, error } = await supabase.rpc('get_public_settings');
  if (error) throw error;
  return data;
};

const CartSidepanel = ({ isOpen, onClose, cart, setCart }) => {
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

  const updateQty = (id, d) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i,
      ),
    );
  };
  
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };
  
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price || 0) * i.quantity, 0),
    [cart]
  );

  const handleWhatsAppCheckout = () => {
    const storeName = settings?.store_name || "Warehouse Group";
    const phone = settings?.whatsapp_number || "918668160867";
    const message = buildWhatsAppMessage(cart, storeName);
    window.open(buildWhatsAppUrl(phone, message), "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-8 border-b flex justify-between items-center">
          <h2 className="text-xl font-black tracking-tighter uppercase">
            Cart Summary
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingBag size={64} strokeWidth="1" className="mb-4" />
              <p className="font-bold text-xs uppercase tracking-widest">
                Inventory Empty
              </p>
            </div>
          ) : (
            cart.map((item) => {
              // using the first image from product_images array, or placeholder
              const imageUrl = item.product_images?.[0]?.storage_path 
                ? `${supabase.storage.from('product-images').getPublicUrl(item.product_images[0].storage_path).data.publicUrl}`
                : '';

              return (
                <div
                  key={item.id}
                  className="flex gap-6 animate-in slide-in-from-right duration-300"
                >
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-sm tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-yellow-600 font-black text-sm">
                      {item.currency || 'USD'} {Number(item.price).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 hover:text-yellow-600"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 hover:text-yellow-600"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-8 border-t bg-gray-50/50">
          <div className="flex justify-between items-end mb-8">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">
              Subtotal Amount
            </p>
            <p className="text-3xl font-black tracking-tighter leading-none">
              {cart[0]?.currency || 'USD'} {cartTotal.toLocaleString()}
            </p>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={handleWhatsAppCheckout}
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-500 hover:text-black transition-all shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
          >
            Confirm Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidepanel;
