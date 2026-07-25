import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Box, Menu, MessageCircle, ShoppingBag, X } from '../Icons';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkAdminStatus(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkAdminStatus(session.user.id);
      else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, is_active')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data && data.is_active && (data.role === 'admin' || data.role === 'staff')) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 text-center">Admin Access</h2>
          <p className="text-xs text-gray-500 mb-8 text-center font-bold tracking-widest uppercase">Sign in to manage inventory</p>
          
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="PASSWORD" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
              />
            </div>
            {authError && <p className="text-red-500 text-xs font-bold text-center">{authError}</p>}
            <button 
              type="submit" 
              disabled={authLoading}
              className="w-full bg-black text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-50"
            >
              {authLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>

          <Link to="/" className="block text-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            ← Return to Store
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-black text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-500 mb-6">Your account does not have admin or staff privileges.</p>
          <button onClick={handleSignOut} className="text-sm font-bold bg-black text-white px-6 py-2 rounded-lg">Sign Out</button>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Inquiries', path: '/admin/inquiries' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-xl font-black uppercase tracking-tighter text-yellow-500">Warehouse Admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl font-bold text-sm transition-colors ${location.pathname === link.path ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-gray-400 hover:text-white font-bold text-sm transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 md:px-10 shrink-0">
          <h2 className="font-black uppercase tracking-widest text-sm md:hidden">Admin</h2>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400">{session.user.email}</span>
            <Link to="/" className="text-xs font-black uppercase bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              View Store
            </Link>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
