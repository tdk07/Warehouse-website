import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2 } from '../Icons';

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

const ProductList = () => {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({ queryKey: ['admin-products'], queryFn: fetchProducts });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_visible }) => {
      const { error } = await supabase.from('products').update({ is_visible }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['admin-products'])
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      // Soft delete
      const { error } = await supabase.from('products').update({ is_deleted: true }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['admin-products'])
  });

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Products</h1>
        <Link 
          to="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-sm">
                      <div className="max-w-[200px] truncate" title={p.name}>{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{p.sku || 'No SKU'}</div>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{p.categories?.name || '-'}</td>
                    <td className="p-4 font-bold text-sm">{p.currency} {Number(p.price).toLocaleString()}</td>
                    <td className="p-4 text-sm font-bold">{p.stock_quantity}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        p.stock_status === 'in_stock' ? 'bg-green-100 text-green-700' : 
                        p.stock_status === 'low_stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {p.stock_status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleVisibilityMutation.mutate({ id: p.id, is_visible: !p.is_visible })}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${p.is_visible ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {p.is_visible ? 'Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link to={`/admin/products/${p.id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black">
                        Edit
                      </Link>
                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this product?')) {
                            deleteMutation.mutate(p.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-2 align-middle"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
