import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CartSidepanel from './CartSidepanel';
import Footer from './Footer';
import { MessageCircle } from '../Icons';

const StorefrontLayout = ({ cart, setCart, isCartOpen, setIsCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 font-sans selection:bg-yellow-200 flex flex-col">
      <Navbar scrolled={scrolled} cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1 transition-all duration-700">
        <Outlet />
      </main>
      
      <Footer />
      
      <CartSidepanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        setCart={setCart}
      />
      
      {/* FLOATING WA */}
      <button
        onClick={() => window.open("https://wa.me/918668160867", "_blank")}
        className="fixed bottom-10 right-10 z-[150] bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all group flex items-center gap-3"
      >
        <MessageCircle size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black uppercase text-[10px] tracking-widest">
          Connect Support
        </span>
      </button>
    </div>
  );
};

export default StorefrontLayout;
