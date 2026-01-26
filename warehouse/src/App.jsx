import React, { useState, useMemo, useEffect } from "react";
import warehouseLogo from "./assets/WhatsApp Image 2026-01-20 at 11.40.24 PM.jpeg";
import productList1 from "./assets/WhatsApp Image 2026-01-20 at 11.40.24 PM.jpeg";
import productList2 from "./assets/WhatsApp Image 2026-01-25 at 12.04.20 AM.jpeg";

// --- PREMIUM SVG ICONS (Built-in for zero-dependency builds) ---
const Icon = ({
  children,
  size = 24,
  className = "",
  fill = "none",
  strokeWidth = "2",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const ShoppingBag = (p) => (
  <Icon {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Icon>
);
const Menu = (p) => (
  <Icon {...p}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </Icon>
);
const X = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);
const Zap = (p) => (
  <Icon {...p}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </Icon>
);
const Smartphone = (p) => (
  <Icon {...p}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </Icon>
);
const ShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const Truck = (p) => (
  <Icon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Icon>
);
const MessageCircle = (p) => (
  <Icon {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </Icon>
);
const Search = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);
const Star = (p) => (
  <Icon {...p} fill={p.fill || "none"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);
const Plus = (p) => (
  <Icon {...p}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Icon>
);
const Minus = (p) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);
const Trash2 = (p) => (
  <Icon {...p}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </Icon>
);
const ChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);
const Box = (p) => (
  <Icon {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </Icon>
);


// --- PRODUCT DATA WITH HIGH-QUALITY THEMATIC IMAGES ---
// Product images sourced from web based on product names
const IMAGE_URLS = {
  // Drones - High quality drone images
  "JS39P MEGA Drone": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600",
  "S11 MINI NEO": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600",
  "M3 MAX Industrial": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=600",
  
  // Adapters - USB-C and charging adapters
  "35W Apple Dual Type C": "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&q=80&w=600",
  "Samsung 65W Trio": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600",
  "OnePlus SuperVOOC 45W": "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&q=80&w=600",
  
  // Cables
  "Apple 1M Braided Type-C": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600",  
  // Tempered Glass
  "iPhone 11-17 SuperD Glass": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600",
  
  // Shoes
  "Luxury Men Footwear": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
  
  // Bags
  "Premium Travel Case": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
};

const PRODUCTS = [
  {
    id: "d1",
    category: "drones",
    name: "JS39P MEGA Drone",
    price: 12999,
    originalPrice: 15999,
    rating: 5,
    badge: "Limited",
    image: IMAGE_URLS["JS39P MEGA Drone"],
  },
  {
    id: "d2",
    category: "drones",
    name: "S11 MINI NEO",
    price: 4500,
    originalPrice: 5999,
    rating: 4,
    image: IMAGE_URLS["S11 MINI NEO"],
  },
  {
    id: "d3",
    category: "drones",
    name: "M3 MAX Industrial",
    price: 24999,
    originalPrice: 29999,
    rating: 5,
    badge: "Pro",
    image: IMAGE_URLS["M3 MAX Industrial"],
  },
  {
    id: "a2",
    category: "adapters",
    name: "35W Apple Dual Type C",
    price: 3499,
    originalPrice: 4500,
    rating: 5,
    badge: "Bestseller",
    image: IMAGE_URLS["35W Apple Dual Type C"],
  },
  {
    id: "a4",
    category: "adapters",
    name: "Samsung 65W Trio",
    price: 3999,
    originalPrice: 5500,
    rating: 4,
    image: IMAGE_URLS["Samsung 65W Trio"],
  },
  {
    id: "a9",
    category: "adapters",
    name: "OnePlus SuperVOOC 45W",
    price: 2199,
    originalPrice: 2900,
    rating: 5,
    image: IMAGE_URLS["OnePlus SuperVOOC 45W"],
  },
  {
    id: "a11",
    category: "cables",
    name: "Apple 1M Braided Type-C",
    price: 1899,
    originalPrice: 2500,
    rating: 5,
    image: IMAGE_URLS["Apple 1M Braided Type-C"],
  },
  {
    id: "t1",
    category: "temper",
    name: "iPhone 11-17 SuperD Glass",
    price: 599,
    originalPrice: 999,
    rating: 5,
    badge: "Strongest",
    image: IMAGE_URLS["iPhone 11-17 SuperD Glass"],
  },
  {
    id: "s1",
    category: "shoes",
    name: "Luxury Men Footwear",
    price: 5500,
    originalPrice: 8500,
    rating: 4,
    image: IMAGE_URLS["Luxury Men Footwear"],
  },
  {
    id: "b1",
    category: "bags",
    name: "Premium Travel Case",
    price: 9500,
    originalPrice: 14000,
    rating: 5,
    image: IMAGE_URLS["Premium Travel Case"],
  },
];

const CATEGORIES = [
  { id: "all", name: "All Collections" },
  { id: "drones", name: "Drones" },
  { id: "adapters", name: "Adapters" },
  { id: "cables", name: "Cables" },
  { id: "shoes", name: "Footwear" },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- LOGIC ---
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, d) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i,
      ),
    );
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart],
  );

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleWhatsAppCheckout = () => {
    const text = `*Warehouse Group Order*\n\n${cart.map((i) => `• ${i.name} [x${i.qty}]`).join("\n")}\n\n*Total: ₹${cartTotal.toLocaleString()}*\n\nConfirming my order.`;
    window.open(
      `https://wa.me/918668160867?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 font-sans selection:bg-yellow-200">
      {/* --- STICKY NAV --- */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b py-3 shadow-lg" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div
              className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-500 ${scrolled ? "border-yellow-500 shadow-lg" : currentView === "home" ? "border-white" : "border-black"}`}
            >
              <img src={warehouseLogo} alt="Warehouse Logo" className="w-full h-full object-cover" />
            </div>
            <div
              className={`hidden sm:block transition-colors ${scrolled || currentView !== "home" ? "text-black" : "text-white"}`}
            >
              <h1 className="text-sm font-black tracking-tighter uppercase leading-tight">
                Warehouse
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">
                Group of Companies
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em]">
            {["Home", "Shop", "Catalog", "Bulk", "Contact"].map((link) => {
              const viewMap = {
                Shop: "shop",
                Home: "home",
                Contact: "contact",
                Bulk: "bulk",
                Catalog: "catalog"
              };
              return (
                <button
                  key={link}
                  onClick={() => {
                    setCurrentView(viewMap[link] || "home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`hover:text-yellow-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all ${
                    currentView === (viewMap[link] || link.toLowerCase()) 
                      ? "text-yellow-600 after:w-full" 
                      : (scrolled || currentView !== "home" ? "text-black" : "text-white")
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative group p-2 ${scrolled || currentView !== "home" ? "text-black" : "text-white"}`}
            >
              <ShoppingBag
                size={26}
                strokeWidth="1.5"
                className="group-hover:scale-110 transition-transform"
              />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`lg:hidden ${scrolled || currentView !== "home" ? "text-black" : "text-white"}`}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- CART SLIDE --- */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-xl font-black tracking-tighter uppercase">
              Cart Summary
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <ShoppingBag size={64} strokeWidth="1" className="mb-4" />
                <p className="font-bold text-xs uppercase tracking-widest">
                  Inventory Empty
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 animate-in slide-in-from-right duration-300"
                >
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-sm tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-yellow-600 font-black text-sm">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 hover:text-yellow-600"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-black">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 hover:text-yellow-600"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-8 border-t bg-gray-50/50">
            <div className="flex justify-between items-end mb-8">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">
                Subtotal Amount
              </p>
              <p className="text-3xl font-black tracking-tighter leading-none">
                ₹{cartTotal.toLocaleString()}
              </p>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={handleWhatsAppCheckout}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-500 hover:text-black transition-all shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
            >
              Confirm Order via WhatsApp
            </button>
          </div>
        </div>
      </div>

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
              {["Home", "Shop", "Catalog", "Bulk Orders", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      if (link === "Shop") setCurrentView("shop");
                      else if (link === "Home") setCurrentView("home");
                      else if (link === "Contact") setCurrentView("contact");
                      else if (link === "Bulk Orders") setCurrentView("bulk");
                      else if (link === "Catalog") setCurrentView("catalog");
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-2xl font-black uppercase tracking-tight hover:text-yellow-600 transition-colors w-full text-left"
                  >
                    {link}
                  </button>
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

      {/* --- MAIN CONTENT --- */}

      <main className="transition-all duration-700">
        {currentView === "home" && (
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
                    <button
                      onClick={() => setCurrentView("shop")}
                      className="bg-yellow-500 text-black px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl shadow-yellow-500/10"
                    >
                      Shop Collections
                    </button>
                    <button
                      onClick={() => setCurrentView("contact")}
                      className="bg-white/5 border border-white/20 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all backdrop-blur-md"
                    >
                      Reseller Portal
                    </button>
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
        )}

        {currentView === "shop" && (
          <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
              <div>
                <h2 className="text-6xl font-black tracking-tighter uppercase italic mb-4">
                  Inventory
                </h2>
                <div className="flex flex-wrap gap-3 mt-8">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === c.id ? "bg-black text-white shadow-2xl scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative group w-full lg:w-96">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-yellow-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-500 transition-all font-bold text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group">
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6">
                    {p.badge && (
                      <span className="absolute top-6 left-6 z-10 bg-yellow-500 text-black text-[9px] font-black uppercase px-4 py-2 rounded-full shadow-xl">
                        {p.badge}
                      </span>
                    )}
                    <img
                      src={p.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={p.name}
                    />
                  </div>
                  <div className="space-y-4 px-2">
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.3em]">
                      {p.category}
                    </p>
                    <h3 className="text-lg font-black tracking-tight leading-tight">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black">
                        ₹{p.price.toLocaleString()}
                      </p>
                      <p className="text-gray-400 line-through text-xs font-bold">
                        ₹{p.originalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < p.rating ? "#FACC15" : "none"}
                          className={
                            i < p.rating ? "text-yellow-500" : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black hover:text-yellow-500 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-40 text-center opacity-20">
                <Box size={80} className="mx-auto mb-6" />
                <h3 className="text-4xl font-black uppercase tracking-tighter">
                  Stock Unavailable
                </h3>
              </div>
            )}
          </section>
        )}

        {currentView === "contact" && (
          <section className="pt-48 pb-32 px-6 max-w-4xl mx-auto">
            <div className="bg-black text-white rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-12">
                  Connect <br /> <span className="text-yellow-500">Global</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">
                        Headquarters
                      </h4>
                      <p className="text-gray-400 font-bold leading-relaxed">
                        Warehouse Plaza, Sector 12-A,
                        <br />
                        Premium Imports Hub, New Delhi,
                        <br />
                        India - 110XXX
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">
                        Direct Support
                      </h4>
                      <p className="text-2xl font-black">+91 86681 60867</p>
                      <p className="text-gray-400 font-bold mt-2 hover:text-yellow-500 cursor-pointer">
                        trade@warehousegroup.co
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-10 md:pt-0">
                    <input
                      type="text"
                      placeholder="COMPANY NAME"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                    />
                    <textarea
                      rows="4"
                      placeholder="DESCRIBE YOUR REQUIREMENT"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                    ></textarea>
                    <button className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentView === "bulk" && (
          <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
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
                  <button
                    onClick={() => setCurrentView("contact")}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                      plan.popular
                        ? "bg-black text-yellow-500 hover:scale-105"
                        : plan.color === "black"
                          ? "bg-yellow-500 text-black hover:scale-105"
                          : "bg-black text-white hover:bg-yellow-500 hover:text-black"
                    }`}
                  >
                    Get Started
                  </button>
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
                  <button
                    onClick={() => setCurrentView("contact")}
                    className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all backdrop-blur-md"
                  >
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentView === "catalog" && (
          <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Box size={16} />
                Product Catalog
              </div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">
                Our <span className="text-yellow-500">Collection</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                Browse our comprehensive product catalog featuring premium imports across multiple categories.
              </p>
            </div>

            {/* Product Catalog Grid */}
            <div className="space-y-32 mb-32">
              {CATEGORIES.filter(c => c.id !== 'all').map((category) => {
                const categoryProducts = PRODUCTS.filter(p => p.category === category.id);
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category.id}>
                    <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
                      <h3 className="text-4xl font-black uppercase tracking-tighter">
                        {category.name}
                      </h3>
                      <button 
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentView("shop");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xs font-black uppercase tracking-widest text-yellow-600 hover:text-black transition-colors"
                      >
                        View All {category.name} →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                      {categoryProducts.map((p) => (
                        <div key={p.id} className="group cursor-pointer" onClick={() => addToCart(p)}>
                          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 mb-6 border border-gray-100 group-hover:border-yellow-500 transition-colors">
                            <img
                              src={p.image}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              alt={p.name}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Quick Add
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                            <p className="text-yellow-600 font-black">₹{p.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[4rem] p-12 md:p-16">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-black">
                Need Something Specific?
              </h3>
              <p className="text-black/80 text-lg font-bold mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Contact us for custom sourcing and special orders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open("https://wa.me/918668160867?text=I need help finding a product", "_blank")}
                  className="bg-black text-yellow-500 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={18} />
                  Contact Us
                </button>
                <button
                  onClick={() => setCurrentView("shop")}
                  className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
                >
                  Browse Shop
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* --- FOOTER --- */}
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

      {/* --- FLOATING WA --- */}
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

export default App;
