import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MessageCircle } from '../Icons';
import warehouseLogo from '../../assets/WhatsApp Image 2026-01-20 at 11.40.24 PM.jpeg';

const Navbar = ({ scrolled, cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  // if not at home, always act like it's scrolled for the visual style
  const isScrolledStyle = scrolled || currentPath !== '/';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Catalog', path: '/catalog' },
    { label: 'Bulk', path: '/bulk' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolledStyle ? "bg-white/90 backdrop-blur-xl border-b py-3 shadow-lg" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-500 ${isScrolledStyle ? "border-yellow-500 shadow-lg" : "border-white"}`}
            >
              <img src={warehouseLogo} alt="Warehouse Logo" className="w-full h-full object-cover" />
            </div>
            <div
              className={`hidden sm:block transition-colors ${isScrolledStyle ? "text-black" : "text-white"}`}
            >
              <h1 className="text-sm font-black tracking-tighter uppercase leading-tight">
                Warehouse
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">
                Group of Companies
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-yellow-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all ${
                  currentPath === link.path 
                    ? "text-yellow-600 after:w-full" 
                    : (isScrolledStyle ? "text-black" : "text-white")
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className={`relative group p-2 ${isScrolledStyle ? "text-black" : "text-white"}`}
            >
              <ShoppingBag
                size={26}
                strokeWidth="1.5"
                className="group-hover:scale-110 transition-transform"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`lg:hidden ${isScrolledStyle ? "text-black" : "text-white"}`}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-xl font-black tracking-tighter uppercase">
              Menu
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 p-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-black uppercase tracking-tight hover:text-yellow-600 transition-colors w-full text-left inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-8 border-t bg-gray-50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Connect With Us
            </p>
            <button
              onClick={() => {
                window.open("https://wa.me/918668160867", "_blank");
                setIsMenuOpen(false);
              }}
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
