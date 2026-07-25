import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus } from '../Icons';

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').order('sort_order');
  if (error) throw error;
  return data || [];
};

const CategoryManager = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  
  const { data: categories, isLoading } = useQuery({ 
    queryKey: ['admin-categories'], 
    queryFn: fetchCategories 
  });

  const addMutation = useMutation({
    mutationFn: async (newCategory) => {
      const { data, error } = await supabase.from('categories').insert(newCategory).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-categories']);
      setName('');
      setSlug('');
      setDescription('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-categories']);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }) => {
      const { error } = await supabase.from('categories').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-categories']);
    }
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !slug) return;
    addMutation.mutate({ name, slug, description, is_active: true });
  };

  const generateSlug = (val) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Categories</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-black uppercase tracking-tight mb-6">Add New Category</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => generateSlug(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold"
                  rows="3"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={addMutation.isPending}
                className="w-full bg-black text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {addMutation.isPending ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-sm">{c.name}</td>
                      <td className="p-4 text-gray-500 text-sm">{c.slug}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleActiveMutation.mutate({ id: c.id, is_active: !c.is_active })}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                        >
                          {c.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure? Products in this category might be affected.')) {
                              deleteMutation.mutate(c.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
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
    </div>
  );
};

export default CategoryManager;
