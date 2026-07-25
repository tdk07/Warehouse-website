import React from 'react';
import { ChevronRight } from '../Icons';
import warehouseLogo from '../../assets/WhatsApp Image 2026-01-20 at 11.40.24 PM.jpeg';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-24 px-6 mt-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-yellow-500 shadow-xl">
              <img src={warehouseLogo} alt="Warehouse Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-xl uppercase tracking-tighter">
              Warehouse
            </span>
          </div>
          <p className="text-gray-400 font-bold text-xs uppercase leading-relaxed tracking-widest">
            Exclusive importers of Tier-1 technology and luxury goods. Serving
            retailers across the globe.
          </p>
        </div>
        <div>
          <h5 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-yellow-600">
            Company
          </h5>
          <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
            <li className="hover:text-black cursor-pointer">
              About the Group
            </li>
            <li className="hover:text-black cursor-pointer">
              Shipping Terms
            </li>
            <li className="hover:text-black cursor-pointer">
              Reseller Portal
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-yellow-600">
            Categories
          </h5>
          <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
            <li className="hover:text-black cursor-pointer">Smart Drones</li>
            <li className="hover:text-black cursor-pointer">
              Apple Ecosystem
            </li>
            <li className="hover:text-black cursor-pointer">Samsung Gear</li>
          </ul>
        </div>
        <div className="bg-black text-white p-10 rounded-[3rem] space-y-6">
          <h5 className="font-black text-[10px] uppercase tracking-[0.3em]">
            Stock Drop Alerts
          </h5>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose">
            Get notified of high-demand imports before they sell out.
          </p>
          <div className="flex border-b border-white/20 pb-3">
            <input
              type="text"
              placeholder="YOUR EMAIL"
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase w-full p-0"
            />
            <button className="text-yellow-500 hover:scale-125 transition-transform">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
        <span>© 2026 Warehouse Group. All Rights Reserved.</span>
        <div className="flex gap-8">
          <span className="cursor-pointer hover:text-black">Privacy</span>
          <span className="cursor-pointer hover:text-black">Compliance</span>
          <span className="cursor-pointer hover:text-black">Status</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
