import React from 'react';
import { ShieldCheck, Truck, Smartphone, Zap, MessageCircle } from '../Icons';
import { Link } from 'react-router-dom';

const BulkOrder = () => {
  return (
    <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <Zap size={16} />
          B2B Solutions
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">
          Bulk <span className="text-yellow-500">Orders</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          Exclusive wholesale pricing for retailers, distributors, and corporate buyers. Scale your business with our premium import network.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {[
          {
            tier: "Starter",
            min: "50+",
            discount: "15%",
            features: ["Priority Support", "Flexible Payment", "7-Day Delivery"],
            color: "gray"
          },
          {
            tier: "Business",
            min: "200+",
            discount: "25%",
            features: ["Dedicated Manager", "Custom Packaging", "3-Day Delivery", "Extended Credit"],
            color: "yellow",
            popular: true
          },
          {
            tier: "Enterprise",
            min: "500+",
            discount: "35%",
            features: ["White Label Options", "Direct Import", "Same-Day Dispatch", "90-Day Credit", "Custom Sourcing"],
            color: "black"
          }
        ].map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-[3rem] p-10 transition-all hover:scale-105 ${
              plan.popular
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-2xl shadow-yellow-500/20"
                : plan.color === "black"
                  ? "bg-black text-white border-2 border-yellow-500"
                  : "bg-white border-2 border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-yellow-500 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
              {plan.tier}
            </h3>
            <div className="mb-8">
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${plan.popular ? "text-black/60" : "text-gray-400"}`}>
                Minimum Order
              </p>
              <p className="text-5xl font-black tracking-tighter">{plan.min}</p>
              <p className={`text-sm font-bold mt-2 ${plan.popular ? "text-black/80" : "text-gray-500"}`}>
                Units per order
              </p>
            </div>
            <div className="mb-8">
              <p className={`text-6xl font-black tracking-tighter ${plan.popular ? "text-black" : "text-yellow-600"}`}>
                {plan.discount}
              </p>
              <p className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? "text-black/60" : "text-gray-400"}`}>
                Discount Off MRP
              </p>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    plan.popular ? "bg-black/20" : plan.color === "black" ? "bg-yellow-500" : "bg-yellow-500"
                  }`}>
                    <span className={`text-xs ${plan.popular ? "text-black" : plan.color === "black" ? "text-black" : "text-white"}`}>✓</span>
                  </div>
                  <span className={`text-sm font-bold ${plan.popular ? "text-black/90" : ""}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`block text-center w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                plan.popular
                  ? "bg-black text-yellow-500 hover:scale-105"
                  : plan.color === "black"
                    ? "bg-yellow-500 text-black hover:scale-105"
                    : "bg-black text-white hover:bg-yellow-500 hover:text-black"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-32">
        {[
          {
            icon: <ShieldCheck size={40} />,
            title: "Verified Authenticity",
            desc: "Every bulk shipment comes with manufacturer certificates and quality inspection reports."
          },
          {
            icon: <Truck size={40} />,
            title: "Logistics Support",
            desc: "Pan-India delivery network with real-time tracking and insurance coverage."
          },
          {
            icon: <Smartphone size={40} />,
            title: "Product Sourcing",
            desc: "Can't find what you need? We source specific models and variants on demand."
          },
          {
            icon: <Zap size={40} />,
            title: "Fast Turnaround",
            desc: "Stock availability updates every 24 hours. Most orders ship within 48-72 hours."
          }
        ].map((benefit, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="text-yellow-500 transition-transform group-hover:scale-110 duration-500">
              {benefit.icon}
            </div>
            <div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-500 leading-relaxed font-medium">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">
            Ready to <span className="text-yellow-500">Scale?</span>
          </h3>
          <p className="text-gray-400 text-lg font-medium mb-10 max-w-2xl mx-auto">
            Join 500+ retailers and distributors who trust Warehouse Group for their bulk import needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://wa.me/918668160867?text=I'm interested in bulk orders", "_blank")}
              className="bg-yellow-500 text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </button>
            <Link
              to="/contact"
              className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all backdrop-blur-md inline-block"
            >
              Schedule Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrder;
