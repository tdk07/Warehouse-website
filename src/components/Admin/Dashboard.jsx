import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Box, MessageCircle, ShoppingBag } from '../Icons';

const fetchStats = async () => {
  const [{ count: productsCount }, { count: inquiriesCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new')
  ]);

  return {
    products: productsCount || 0,
    newInquiries: inquiriesCount || 0
  };
};

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchStats });

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
            <Box size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Total Products</p>
            <p className="text-3xl font-black">{stats?.products}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <MessageCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">New Inquiries</p>
            <p className="text-3xl font-black">{stats?.newInquiries}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="font-black uppercase tracking-tight mb-4">Getting Started</h3>
        <p className="text-gray-500 mb-6">Welcome to the Warehouse Admin. Use the sidebar to manage your inventory and respond to inquiries.</p>
        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm">Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
