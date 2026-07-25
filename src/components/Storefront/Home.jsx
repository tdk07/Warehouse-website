import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Zap, ChevronRight } from '../Icons';

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              Global Imports • Local Trust
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
              Warehouse <br />{" "}
              <span className="text-yellow-500 not-italic">Premium</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              Connecting you to the world's most sought-after tech,
              wearables, and luxury imports. Quality checked. Business
              ready.
            </p>
            <div className="flex flex-wrap gap-5 pt-6">
              <Link
                to="/shop"
                className="bg-yellow-500 text-black px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl shadow-yellow-500/10 inline-block"
              >
                Shop Collections
              </Link>
              <Link
                to="/contact"
                className="bg-white/5 border border-white/20 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all backdrop-blur-md inline-block"
              >
                Reseller Portal
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:block text-white/20 animate-bounce">
          <ChevronRight size={48} className="rotate-90" />
        </div>
      </section>

      {/* QUICK FEATURES */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
        {[
          {
            icon: <ShieldCheck size={44} />,
            t: "Authenticity",
            d: "100% genuine imported stock verified by our expert inspection team.",
          },
          {
            icon: <Truck size={44} />,
            t: "Next-Day Ship",
            d: "Immediate dispatch for local deliveries. Real-time GPS tracking enabled.",
          },
          {
            icon: <Zap size={44} />,
            t: "B2B Scale",
            d: "Specialized logistics and pricing for bulk resellers and retail partners.",
          },
        ].map((f, i) => (
          <div key={i} className="group cursor-default">
            <div className="text-yellow-500 mb-8 transition-transform group-hover:scale-110 duration-500">
              {f.icon}
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
              {f.t}
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              {f.d}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
