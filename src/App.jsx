import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import StorefrontLayout from './components/Storefront/StorefrontLayout';

// Storefront Pages
import Home from './components/Storefront/Home';
import Shop from './components/Storefront/Shop';
import Contact from './components/Storefront/Contact';
import BulkOrder from './components/Storefront/BulkOrder';
import Catalog from './components/Storefront/Catalog';

// Admin Pages
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import ProductForm from './components/Admin/ProductForm';
import CategoryManager from './components/Admin/CategoryManager';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('warehouse_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('warehouse_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
        );
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Storefront Routes */}
          <Route 
            path="/" 
            element={
              <StorefrontLayout 
                cart={cart} 
                setCart={setCart} 
                isCartOpen={isCartOpen} 
                setIsCartOpen={setIsCartOpen} 
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop onAddToCart={addToCart} />} />
            <Route path="catalog" element={<Catalog onAddToCart={addToCart} />} />
            <Route path="bulk" element={<BulkOrder />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="categories" element={<CategoryManager />} />
          </Route>
          
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
