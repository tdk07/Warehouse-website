import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { ProductSchema } from '../../lib/schemas';
import { Box } from '../Icons';

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').eq('is_active', true);
  if (error) throw error;
  return data || [];
};

const fetchProduct = async (id) => {
  const { data, error } = await supabase.from('products').select('*, product_images(*)').eq('id', id).single();
  if (error) throw error;
  return data;
};

const ProductForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [createdProductId, setCreatedProductId] = useState(null);
  
  const { data: categories = [] } = useQuery({ queryKey: ['active-categories'], queryFn: fetchCategories });
  const { data: productData, isLoading: loadingProduct } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => fetchProduct(id),
    enabled: isEditing
  });

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      is_visible: false,
      stock_status: 'in_stock',
      stock_quantity: 0,
      price: 0,
    }
  });

  useEffect(() => {
    if (productData) {
      Object.keys(productData).forEach(key => {
        if (key !== 'product_images' && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
          setValue(key, productData[key]);
        }
      });
    }
  }, [productData, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      let productId = id || createdProductId;
      
      // 1. Save or Update Product Data
      if (productId) {
        const { error } = await supabase.from('products').update(data).eq('id', productId);
        if (error) throw error;
      } else {
        const { data: newProd, error } = await supabase.from('products').insert([data]).select().single();
        if (error) throw error;
        productId = newProd.id;
        setCreatedProductId(productId); // Save it so we don't duplicate on retry
      }

      // 2. Upload Image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${productId}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);
          
        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // 3. Save to product_images table
        const { error: dbError } = await supabase.from('product_images').insert([{
          product_id: productId,
          storage_path: filePath,
          is_primary: true
        }]);

        if (dbError) {
          throw new Error(`Failed to link image: ${dbError.message}`);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      navigate('/admin/products');
    },
    onError: (error) => {
      setUploadError(error.message);
    }
  });

  const onSubmit = (data) => {
    setUploadError('');
    saveMutation.mutate(data);
  };

  const handleSlugGenerate = (e) => {
    const val = e.target.value;
    setValue('name', val);
    if (!isEditing) {
      setValue('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  if (isEditing && loadingProduct) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button onClick={() => navigate('/admin/products')} className="text-sm font-bold text-gray-400 hover:text-black">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-black uppercase tracking-tight mb-6 text-xl">Basic Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Product Name</label>
              <input type="text" {...register('name')} onChange={handleSlugGenerate} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
              {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">URL Slug</label>
              <input type="text" {...register('slug')} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
              {errors.slug && <p className="text-red-500 text-[10px] mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select {...register('category_id')} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold">
                <option value="">Select a category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.category_id && <p className="text-red-500 text-[10px] mt-1">{errors.category_id.message}</p>}
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Short Description</label>
            <textarea {...register('short_description')} rows="2" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
            {errors.short_description && <p className="text-red-500 text-[10px] mt-1">{errors.short_description.message}</p>}
          </div>

          <div className="mt-6">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Description</label>
            <textarea {...register('description')} rows="10" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold font-mono" />
            {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-black uppercase tracking-tight mb-6 text-xl">Pricing & Inventory</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Selling Price</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
              {errors.price && <p className="text-red-500 text-[10px] mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Original Price (MRP)</label>
              <input type="number" step="0.01" {...register('original_price', { valueAsNumber: true })} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Stock Quantity</label>
              <input type="number" {...register('stock_quantity', { valueAsNumber: true })} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
              {errors.stock_quantity && <p className="text-red-500 text-[10px] mt-1">{errors.stock_quantity.message}</p>}
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Stock Status</label>
              <select {...register('stock_status')} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold">
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="preorder">Pre-order</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-black uppercase tracking-tight mb-6 text-xl">Media</h3>
          <div className="space-y-4">
            {isEditing && productData?.product_images?.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Image</p>
                <img 
                  src={`${supabase.storage.from('product-images').getPublicUrl(productData.product_images[0].storage_path).data.publicUrl}`} 
                  alt="Current" 
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200"
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                {isEditing ? 'Upload New Image (Replaces current main image)' : 'Upload Product Image'}
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none text-sm font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-black file:text-yellow-500 hover:file:bg-gray-800"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-black uppercase tracking-tight mb-6 text-xl">Visibility & Badges</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <input type="checkbox" id="is_visible" {...register('is_visible')} className="w-5 h-5 accent-black" />
              <label htmlFor="is_visible" className="text-sm font-bold cursor-pointer">Visible on Storefront</label>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Badge Text (Optional)</label>
              <input type="text" {...register('badge')} placeholder="e.g. Bestseller, New" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 text-sm font-bold" />
            </div>
          </div>
        </div>

        {uploadError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100">
            {uploadError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || saveMutation.isPending}
          className="w-full bg-black text-white py-5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all shadow-xl disabled:opacity-50"
        >
          {isSubmitting || saveMutation.isPending ? 'Saving...' : 'Save Product'}
        </button>

      </form>
    </div>
  );
};

export default ProductForm;
