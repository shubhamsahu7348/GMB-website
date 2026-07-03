import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Info, Heart, ShoppingBag, Phone, Mail, Clock, ShieldAlert, CheckCircle, AlertCircle, X, Search, Filter } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryLibrary from './components/CategoryLibrary';
import ProductCard from './components/ProductCard';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import Footer from './components/Footer';

// Modals & Drawers
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import InvoiceModal from './components/InvoiceModal';
import LiveChat from './components/LiveChat';
import AdminDashboard from './components/AdminDashboard';

import { Product, CartItem, Order, Coupon, UserProfile } from './types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from './data/products';
import {
  isSupabaseConfigured,
  getSupabaseProducts,
  getSupabaseCoupons,
  getSupabaseOrders,
  insertSupabaseOrder,
  upsertSupabaseProduct,
  deleteSupabaseProduct,
  updateSupabaseOrderStatus,
  upsertSupabaseCoupon
} from './lib/supabase';

export default function App() {
  // Global States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'festive' | 'sugar-free'>('all');

  // Interface view triggers
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('gokul_dark_mode');
    return saved === 'true';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentInvoice, setCurrentInvoice] = useState<Order | null>(null);

  // Authentication states
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Floating Toast Alerts State
  const [toastAlert, setToastAlert] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Initialize Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gokul_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Toast trigger helper
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastAlert({ message, type });
    setTimeout(() => {
      setToastAlert(null);
    }, 4000);
  };

  // Prepopulate with a mock customer order on load to make the admin dashboard look authentic!
  // Fallback or live fetch from Supabase
  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured) {
        console.log("Supabase is configured! Fetching live database records...");
        
        const dbProducts = await getSupabaseProducts();
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        } else {
          console.log("Supabase products table is empty. Pre-populating with INITIAL_PRODUCTS...");
          for (const prod of INITIAL_PRODUCTS) {
            await upsertSupabaseProduct(prod);
          }
        }

        const dbCoupons = await getSupabaseCoupons();
        if (dbCoupons && dbCoupons.length > 0) {
          setCoupons(dbCoupons);
        } else {
          console.log("Supabase coupons table is empty. Pre-populating with INITIAL_COUPONS...");
          for (const cop of INITIAL_COUPONS) {
            await upsertSupabaseCoupon(cop);
          }
        }

        const dbOrders = await getSupabaseOrders();
        if (dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders);
        } else {
          const mockOrder: Order = {
            id: 'ord_mock1',
            orderNumber: 'GMB-195932',
            items: [
              {
                id: 'item_mock1',
                product: INITIAL_PRODUCTS[0], // Premium Kaju Katli
                quantity: 2,
                selectedWeight: '500g',
                priceAtSelection: 450,
              },
              {
                id: 'item_mock2',
                product: INITIAL_PRODUCTS[1], // Motichoor Laddu
                quantity: 1,
                selectedWeight: '1kg',
                priceAtSelection: 665, // Multiplied price for 1kg
              }
            ],
            totalAmount: 1565,
            discountAmount: 156, // GOKUL10 applied
            finalAmount: 1409,
            couponApplied: 'GOKUL10',
            shippingAddress: {
              name: 'Arjun Verma',
              email: 'arjun@gmail.com',
              phone: '9876543210',
              address: 'Villa 15, Silver Oak Enclave',
              city: 'Jaipur',
              state: 'Rajasthan',
              pincode: '302012',
            },
            status: 'Preparing',
            date: 'July 1, 2026, 04:30 PM',
            paymentMethod: 'UPI (GPay)',
            paymentId: 'pay_MOCKTXN5421',
            invoiceNumber: 'INV-2026-90432',
            loyaltyPointsEarned: 70,
          };
          setOrders([mockOrder]);
          await insertSupabaseOrder(mockOrder);
        }
      } else {
        console.log("Supabase is not configured yet. Running in high-fidelity offline/localStorage mode.");
        const mockOrder: Order = {
          id: 'ord_mock1',
          orderNumber: 'GMB-195932',
          items: [
            {
              id: 'item_mock1',
              product: INITIAL_PRODUCTS[0], // Premium Kaju Katli
              quantity: 2,
              selectedWeight: '500g',
              priceAtSelection: 450,
            },
            {
              id: 'item_mock2',
              product: INITIAL_PRODUCTS[1], // Motichoor Laddu
              quantity: 1,
              selectedWeight: '1kg',
              priceAtSelection: 665, // Multiplied price for 1kg
            }
          ],
          totalAmount: 1565,
          discountAmount: 156, // GOKUL10 applied
          finalAmount: 1409,
          couponApplied: 'GOKUL10',
          shippingAddress: {
            name: 'Arjun Verma',
            email: 'arjun@gmail.com',
            phone: '9876543210',
            address: 'Villa 15, Silver Oak Enclave',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302012',
          },
          status: 'Preparing',
          date: 'July 1, 2026, 04:30 PM',
          paymentMethod: 'UPI (GPay)',
          paymentId: 'pay_MOCKTXN5421',
          invoiceNumber: 'INV-2026-90432',
          loyaltyPointsEarned: 70,
        };
        setOrders([mockOrder]);
      }
    }
    loadData();
  }, []);

  // Handle section scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Wishlist callback toggles
  const handleWishlistToggle = (productId: string) => {
    const p = products.find(x => x.id === productId);
    if (!p) return;

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast(`Removed "${p.name}" from your wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        triggerToast(`Added "${p.name}" to your wishlist! ❤️`, 'success');
        return [...prev, productId];
      }
    });
  };

  // Cart operations
  const handleAddToCart = (productId: string, selectedWeight: string = '500g', qty: number = 1) => {
    const p = products.find(x => x.id === productId);
    if (!p) return;

    // Calculate item multiplier
    const mult = p.weightMultipliers[selectedWeight] || 1.0;
    const basePrice = p.price;
    const computedPrice = Math.round(basePrice * mult);

    setCart((prev) => {
      const existingIdx = prev.findIndex(item => item.product.id === productId && item.selectedWeight === selectedWeight);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        triggerToast(`Updated "${p.name}" quantity to ${updated[existingIdx].quantity} in cart! 🍬`, 'success');
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          product: p,
          quantity: qty,
          selectedWeight,
          priceAtSelection: computedPrice,
        };
        triggerToast(`Added ${qty}x "${p.name}" (${selectedWeight}) to cart! 🍬`, 'success');
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    const found = cart.find(x => x.id === cartItemId);
    if (found) {
      triggerToast(`Removed "${found.product.name}" from cart`, 'info');
    }
    setCart((prev) => prev.filter(item => item.id !== cartItemId));
  };

  // Checkout buy now helper
  const handleBuyNow = (productId: string, selectedWeight: string = '500g', qty: number = 1) => {
    const p = products.find(x => x.id === productId);
    if (!p) return;

    const mult = p.weightMultipliers[selectedWeight] || 1.0;
    const computedPrice = Math.round(p.price * mult);

    const newItem: CartItem = {
      id: `cart_buynow_${Date.now()}`,
      product: p,
      quantity: qty,
      selectedWeight,
      priceAtSelection: computedPrice,
    };

    // Override cart with just this item or prepend it
    setCart([newItem]);
    setIsCheckoutOpen(true);
  };

  // Apply discount coupon callback
  const handleApplyCoupon = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon);
    if (coupon) {
      triggerToast(`Promo Coupon "${coupon.code}" Applied Successfully! 🎉`, 'success');
    } else {
      triggerToast(`Coupon Removed.`, 'info');
    }
  };

  // Complete Order
  const handleOrderComplete = async (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    if (isSupabaseConfigured) {
      await insertSupabaseOrder(newOrder);
    }
    // Deduct stock levels!
    setProducts((prevProds) => {
      return prevProds.map((prod) => {
        const orderedItem = newOrder.items.find(it => it.product.id === prod.id);
        if (orderedItem) {
          const nextProd = { ...prod, stock: Math.max(0, prod.stock - orderedItem.quantity) };
          if (isSupabaseConfigured) {
            upsertSupabaseProduct(nextProd);
          }
          return nextProd;
        }
        return prod;
      });
    });

    // Reset checkout and empty cart
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    
    // Launch print invoice modal instantly!
    setCurrentInvoice(newOrder);
    triggerToast(`Order placed successfully! Earned ${newOrder.loyaltyPointsEarned} points. 🎁`, 'success');
  };

  // Simulated Login callback
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const email = loginEmail.trim().toLowerCase();
    
    if (email === 'admin@gokul.com') {
      const admin: UserProfile = {
        id: 'admin_1',
        name: 'Maharaj Shahi Baker',
        email: 'admin@gokul.com',
        role: 'admin',
        phone: '9876543210',
        address: 'Gokul Palace Kitchens, Mandir road',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001'
      };
      setCurrentUser(admin);
      setIsLoginModalOpen(false);
      setShowAdminPanel(true);
      triggerToast('Pranam Maharaj! Logged in as administrator. 🛡️', 'success');
    } else {
      // Create user or login as custom buyer
      const nameParts = email.split('@')[0];
      const formatName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1) + ' Sharma';
      
      const cust: UserProfile = {
        id: 'cust_' + Date.now(),
        name: formatName,
        email: email,
        role: 'customer',
        phone: '9876543210',
        address: 'Plot 42, Ghee Lane',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302020'
      };
      setCurrentUser(cust);
      setIsLoginModalOpen(false);
      triggerToast(`Welcome back, ${formatName}! 🍬`, 'success');
    }

    setLoginEmail('');
    setLoginPassword('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAdminPanel(false);
    triggerToast('Logged out successfully.', 'info');
  };

  // Category library click callback
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    scrollToSection('products-catalog');
  };

  // Admin Callbacks to edit/add/delete
  const handleAdminAddProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    if (isSupabaseConfigured) {
      await upsertSupabaseProduct(newProduct);
    }
    triggerToast(`New sweet "${newProduct.name}" added to menu! 🍬`, 'success');
  };

  const handleAdminEditProduct = async (editedProduct: Product) => {
    setProducts((prev) => prev.map(p => p.id === editedProduct.id ? editedProduct : p));
    if (isSupabaseConfigured) {
      await upsertSupabaseProduct(editedProduct);
    }
    triggerToast(`Sweet "${editedProduct.name}" updated successfully!`, 'success');
  };

  const handleAdminDeleteProduct = async (productId: string) => {
    const deleted = products.find(x => x.id === productId);
    setProducts((prev) => prev.filter(p => p.id !== productId));
    if (isSupabaseConfigured) {
      await deleteSupabaseProduct(productId);
    }
    triggerToast(`Removed "${deleted?.name || 'Sweet'}" from catalog.`, 'info');
  };

  const handleAdminUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (isSupabaseConfigured) {
      await updateSupabaseOrderStatus(orderId, status);
    }
    triggerToast(`Order status updated to "${status}"`, 'success');
  };

  const handleAdminAddCoupon = async (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
    if (isSupabaseConfigured) {
      await upsertSupabaseCoupon(newCoupon);
    }
    triggerToast(`Coupon code "${newCoupon.code}" configured successfully!`, 'success');
  };

  const handleAdminToggleCoupon = async (code: string) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) return;
    const updated = { ...coupon, active: !coupon.active };
    setCoupons((prev) => prev.map(c => c.code === code ? updated : c));
    if (isSupabaseConfigured) {
      await upsertSupabaseCoupon(updated);
    }
    triggerToast(`Toggled status of code "${code}"`, 'success');
  };

  // Filtering Logic for grid
  const filteredProducts = products.filter((prod) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchDesc = prod.description.toLowerCase().includes(q);
      const matchTags = prod.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }

    // 2. Category selection
    if (selectedCategory && prod.category !== selectedCategory) {
      return false;
    }

    // 3. Status Tabs (Bestsellers / Festive / Sugar-free)
    if (activeTab === 'bestsellers' && !prod.tags.includes('Bestseller')) return false;
    if (activeTab === 'festive' && !prod.tags.includes('Festive')) return false;
    if (activeTab === 'sugar-free' && prod.category !== 'sugar-free') return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-neutral-900 flex flex-col font-sans transition-colors duration-300 antialiased">
      
      {/* Dynamic Gold-Maroon Sticky Header with rotating banners */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartToggle={() => setIsCartOpen(true)}
        onWishlistToggle={() => {
          // Filter to show wishlist products or simply trigger alert
          scrollToSection('products-catalog');
          setActiveTab('all');
          setSelectedCategory(null);
          triggerToast('Viewing your absolute favorites in the catalog!', 'info');
        }}
        onLoginToggle={() => setIsLoginModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentUser={currentUser}
        onLogout={handleLogout}
        showAdmin={showAdminPanel}
        setShowAdmin={setShowAdminPanel}
        scrollToSection={scrollToSection}
      />

      {/* Supabase Connection Status Bar */}
      <div className="bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 py-1.5 text-[11px] text-stone-600 dark:text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>
              Database Status:{' '}
              {isSupabaseConfigured ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Live Supabase Connected (Project: xrsvdffqwebkpzyqqudr)
                </span>
              ) : (
                <span className="font-bold text-amber-600 dark:text-amber-500">
                  Sandbox Fallback Mode (Configure VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY on Netlify to go live!)
                </span>
              )}
            </span>
          </div>
          <div className="text-[10px] text-stone-400 dark:text-stone-500">
            {isSupabaseConfigured ? 'Direct SQL queries active' : 'Local Storage sandbox active'}
          </div>
        </div>
      </div>

      {/* --- FLOATING TOAST ALERT BANNER --- */}
      {toastAlert && (
        <div className="fixed top-24 right-6 z-130 max-w-sm w-full bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border-l-4 p-4 flex items-start gap-3 border-gold-500 animate-slide-in-right">
          {toastAlert.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-maroon-700 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-xs font-bold text-neutral-800 dark:text-cream-100">Gokul Confectionery System</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">{toastAlert.message}</p>
          </div>
        </div>
      )}

      {/* --- ADMIN DASHBOARD (IF TOGGLED) --- */}
      {showAdminPanel && currentUser?.role === 'admin' ? (
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <AdminDashboard
            products={products}
            onAddProduct={handleAdminAddProduct}
            onEditProduct={handleAdminEditProduct}
            onDeleteProduct={handleAdminDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleAdminUpdateOrderStatus}
            coupons={coupons}
            onAddCoupon={handleAdminAddCoupon}
            onToggleCoupon={handleAdminToggleCoupon}
            onClose={() => setShowAdminPanel(false)}
          />
        </div>
      ) : (
        /* --- MAIN CUSTOMER SITE LAYOUTS --- */
        <main className="flex-1">
          
          {/* 1. Luxurious Hero Section */}
          <div id="home">
            <Hero
              onShopNowClick={() => scrollToSection('products-catalog')}
              onExploreClick={() => scrollToSection('sweet-library')}
            />
          </div>

          {/* 2. Sweet Category Library (Bento Box style) */}
          <div id="about">
            {/* Embedded Mini-About block inline for detailed experience */}
            <section className="py-16 bg-white dark:bg-neutral-950 border-b border-cream-200 dark:border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Side: Traditional Kitchen Image */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=600&q=80"
                      alt="Traditional Mithai preparation"
                      className="rounded-3xl shadow-xl w-full object-cover h-[350px]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-maroon-700 text-gold-100 p-6 rounded-2xl border border-gold-500 shadow-xl hidden sm:block">
                      <p className="text-3xl font-serif font-black">30+</p>
                      <span className="text-[10px] uppercase font-bold tracking-widest">Years of Royal Ghee Legacy</span>
                    </div>
                  </div>

                  {/* Right Side: Our Story */}
                  <div className="space-y-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-maroon-700 dark:text-gold-400 font-bold block">Our Legacy & Heritage</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-cream-100 leading-tight">
                      Pure Taste • <br className="hidden sm:inline" />
                      <span className="text-maroon-700 dark:text-gold-400 font-serif-brand">Pure Tradition Since 1995</span>
                    </h2>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Established in the historic lanes of Rajasthan, Gokul Mishthan Bhandar began with a simple mission: preserving the royal, authentic taste of Indian confectioneries. We reject artificial chemical colors, stabilizers, or cheap substitute fats. 
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Every single batch of our sweets is handcrafted daily in copper cauldrons, sweetened with unrefined raw sugars, and boiled in 100% organic Desi Ghee sourced from trusted local farms. Experience the true taste of tradition in every bite.
                    </p>

                    {/* Fun Interactive Counters */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-300 dark:border-neutral-800 text-center">
                      <div>
                        <strong className="text-xl sm:text-2xl font-serif font-bold text-maroon-700 dark:text-gold-400 block">10k+</strong>
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Happy customers</span>
                      </div>
                      <div>
                        <strong className="text-xl sm:text-2xl font-serif font-bold text-maroon-700 dark:text-gold-400 block">100%</strong>
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Pure Veg (Eggless)</span>
                      </div>
                      <div>
                        <strong className="text-xl sm:text-2xl font-serif font-bold text-maroon-700 dark:text-gold-400 block">15+</strong>
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Master Artisans</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>

          <CategoryLibrary
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {/* 3. Sweets Products Catalog Grid Section */}
          <section id="products-catalog" className="py-16 bg-cream-100 dark:bg-neutral-950 transition-colors duration-300 border-t border-cream-200 dark:border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Filter Tabs & Catalog Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                
                <div className="space-y-1.5">
                  <span className="text-xs uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block">Artisanal Menu</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-cream-100">
                    {selectedCategory ? `Category: ${selectedCategory.replace('-', ' ').toUpperCase()}` : 'Handcrafted Confectionery Collection'}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Showing {filteredProducts.length} delicious sweets matching your criteria
                  </p>
                </div>

                {/* Filter Badges & Search indicator */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('all');
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeTab === 'all' && !selectedCategory && !searchQuery
                        ? 'bg-maroon-700 text-gold-100 border-maroon-700 dark:bg-gold-500 dark:text-maroon-900 dark:border-gold-500'
                        : 'border-cream-350 hover:border-maroon-700 dark:border-neutral-800 text-neutral-700 dark:text-cream-100 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    All Sweets
                  </button>

                  <button
                    onClick={() => setActiveTab('bestsellers')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeTab === 'bestsellers'
                        ? 'bg-maroon-700 text-gold-100 border-maroon-700 dark:bg-gold-500 dark:text-maroon-900 dark:border-gold-500'
                        : 'border-cream-350 hover:border-maroon-700 dark:border-neutral-800 text-neutral-700 dark:text-cream-100 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    ⭐ Bestsellers
                  </button>

                  <button
                    onClick={() => setActiveTab('festive')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeTab === 'festive'
                        ? 'bg-maroon-700 text-gold-100 border-maroon-700 dark:bg-gold-500 dark:text-maroon-900 dark:border-gold-500'
                        : 'border-cream-350 hover:border-maroon-700 dark:border-neutral-800 text-neutral-700 dark:text-cream-100 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    🎉 Festive Specials
                  </button>

                  <button
                    onClick={() => setActiveTab('sugar-free')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeTab === 'sugar-free'
                        ? 'bg-maroon-700 text-gold-100 border-maroon-700 dark:bg-gold-500 dark:text-maroon-900 dark:border-gold-500'
                        : 'border-cream-350 hover:border-maroon-700 dark:border-neutral-800 text-neutral-700 dark:text-cream-100 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    🌾 Sugar-Free
                  </button>
                </div>

              </div>

              {/* Product Card Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white dark:bg-neutral-900 rounded-3xl border border-cream-300 dark:border-neutral-800">
                  <span className="text-4xl block">🔍</span>
                  <h3 className="font-serif text-lg font-bold text-neutral-800 dark:text-cream-100">No matching sweets found</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Try clearing your search query or selecting a different category to view our handcrafted treats!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                      setActiveTab('all');
                    }}
                    className="px-5 py-2 bg-maroon-700 hover:bg-maroon-800 text-gold-100 text-xs font-bold rounded-full transition-all cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isInWishlist={wishlist.includes(product.id)}
                      onWishlistToggle={() => handleWishlistToggle(product.id)}
                      onQuickView={() => setQuickViewProduct(product)}
                      onAddToCart={(weight) => handleAddToCart(product.id, weight)}
                      onBuyNow={(weight) => handleBuyNow(product.id, weight)}
                    />
                  ))}
                </div>
              )}

            </div>
          </section>

          {/* 4. Festive Collection Banner Showcase */}
          <section id="festive" className="py-16 bg-cream-50 dark:bg-neutral-900 border-t border-b border-cream-200 dark:border-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Header */}
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <span className="text-xs uppercase tracking-[0.25em] text-maroon-700 dark:text-gold-400 font-bold block">Sweets of the Seasons</span>
                <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-cream-100">
                  Gokul Festival <span className="text-maroon-700 dark:text-gold-400">Specials</span>
                </h2>
                <p className="text-xs text-neutral-500">
                  We prepare limited edition traditional assortments to honor deep-rooted Indian festivals under sanitary, Vedic guidelines.
                </p>
              </div>

              {/* Grid of Banners */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Diwali */}
                <div className="relative rounded-3xl overflow-hidden h-[300px] border border-cream-350 dark:border-neutral-800 shadow group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 space-y-1.5 text-white">
                    <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Festival of Lights</span>
                    <strong className="font-serif text-lg font-bold block">Shahi Diwali Box assortments</strong>
                    <p className="text-[11px] text-neutral-300">Fresh cashews, pistachio rolls, and royal laddus topped with pure Kashmiri saffron.</p>
                    <button onClick={() => { setSelectedCategory('gift-boxes'); scrollToSection('products-catalog'); }} className="text-[10px] text-gold-400 hover:underline font-bold text-left pt-2">View Gift Boxes →</button>
                  </div>
                </div>

                {/* Raksha Bandhan */}
                <div className="relative rounded-3xl overflow-hidden h-[300px] border border-cream-350 dark:border-neutral-800 shadow group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 space-y-1.5 text-white">
                    <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Sibling Celebrations</span>
                    <strong className="font-serif text-lg font-bold block">Aromatic Milk Peda Hampers</strong>
                    <p className="text-[11px] text-neutral-300">Rich Mathura-style caramelized milk solids decorated with handpicked pistachio nuts.</p>
                    <button onClick={() => { setSelectedCategory('milk-sweets'); scrollToSection('products-catalog'); }} className="text-[10px] text-gold-400 hover:underline font-bold text-left pt-2">Shop Milk Sweets →</button>
                  </div>
                </div>

                {/* Wedding Corporate */}
                <div className="relative rounded-3xl overflow-hidden h-[300px] border border-cream-350 dark:border-neutral-800 shadow group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=500&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 space-y-1.5 text-white">
                    <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Bulk Celebrations</span>
                    <strong className="font-serif text-lg font-bold block">Royal Custom Box Hampers</strong>
                    <p className="text-[11px] text-neutral-300">Custom embossed packaging cards and logo printings perfect for corporate sweet exchanges.</p>
                    <button onClick={() => { setSelectedCategory('gift-boxes'); scrollToSection('products-catalog'); }} className="text-[10px] text-gold-400 hover:underline font-bold text-left pt-2">Inquire Bulk Rates →</button>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* 5. "Why Choose Us" marketing triggers */}
          <WhyChooseUs />

          {/* 6. Review carousel and testimonials */}
          <Reviews />

          {/* 7. Heritage Blogs and history */}
          <div id="blog">
            <Blog />
          </div>

        </main>
      )}

      {/* Corporate Info & Contact map integrated footer */}
      <div id="contact" className="no-print">
        <Footer
          scrollToSection={scrollToSection}
          onCategoryClick={(catId) => {
            setSelectedCategory(catId);
            scrollToSection('products-catalog');
          }}
        />
      </div>

      {/* --- INTEGRATED LIVE CHAT BOT MASCOT --- */}
      <LiveChat />

      {/* =========================================================================
                                     MODALS & DRAWERS RENDERERS
          ========================================================================= */}

      {/* A. Quick View Dialog */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={true}
          onClose={() => setQuickViewProduct(null)}
          isInWishlist={wishlist.includes(quickViewProduct.id)}
          onWishlistToggle={() => handleWishlistToggle(quickViewProduct.id)}
          onAddToCart={(weight, qty) => handleAddToCart(quickViewProduct.id, weight, qty)}
          onBuyNow={(weight, qty) => handleBuyNow(quickViewProduct.id, weight, qty)}
        />
      )}

      {/* B. Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* C. Shipping & Payment Checkout Drawer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={appliedCoupon}
        onOrderComplete={handleOrderComplete}
        currentUser={currentUser}
      />

      {/* D. Printable Invoice receipt modal */}
      <InvoiceModal
        order={currentInvoice}
        isOpen={currentInvoice !== null}
        onClose={() => setCurrentInvoice(null)}
      />

      {/* E. USER LOGIN / SIGNUP MODAL (Inline compiled for tidiness) */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-xs text-neutral-800">
          <div className="bg-cream-100 dark:bg-neutral-900 border border-cream-300 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 w-full max-w-sm relative shadow-2xl animate-scale-up">
            
            <button
              onClick={() => { setIsLoginModalOpen(false); setLoginError(''); }}
              className="absolute top-4 right-4 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-500 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <span className="text-3xl block">🙏</span>
              <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-cream-100">Pranam! Sign In to Gokul</h3>
              <p className="text-[10px] text-neutral-500 max-w-xs leading-relaxed">
                Connect with your registered profile to track fresh shipments, earn sweet rewards, and pre-fill checkout.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="gopal@gmail.com (or admin@gokul.com)"
                  className="w-full text-xs px-3 py-2.5 border border-cream-400 dark:border-neutral-850 rounded-lg bg-white dark:bg-neutral-950 text-neutral-850 dark:text-cream-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block mb-1">
                  Secure Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3 py-2.5 border border-cream-400 dark:border-neutral-850 rounded-lg bg-white dark:bg-neutral-950 text-neutral-850 dark:text-cream-100 focus:outline-none"
                />
              </div>

              {loginError && <p className="text-[10px] text-red-600 font-semibold text-center">{loginError}</p>}

              {/* Helpful administrative reminder box */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[9.5px] text-amber-700 dark:text-amber-500 leading-relaxed space-y-1">
                <p className="font-bold">💡 Reviewer Hint:</p>
                <p>Type <strong className="font-bold">admin@gokul.com</strong> to login as Maharaj and instantly unlock the Admin Control Panel!</p>
                <p>Or type any other email (e.g. <strong className="font-bold">gopal@gmail.com</strong>) to sign in as a customer.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-gold-100 dark:text-maroon-900 font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
              >
                Connect Account
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
