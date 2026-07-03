import React, { useState } from 'react';
import { ShieldCheck, Plus, Pencil, Trash, Layers, ShoppingCart, Percent, TrendingUp, AlertTriangle, X, Check, BarChart2 } from 'lucide-react';
import { Product, Order, Coupon, Category } from '../types';
import { CATEGORIES } from '../data/products';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  onToggleCoupon: (code: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  coupons,
  onAddCoupon,
  onToggleCoupon,
  onClose,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'inventory' | 'coupons' | 'analytics'>('orders');

  // Modal forms states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: 'mithai',
    price: 300,
    discountPercent: 0,
    rating: 4.8,
    ratingCount: 1,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80',
    ingredients: ['Pure Desi Ghee', 'Organic Milk', 'Cardamom'],
    weightOptions: ['250g', '500g', '1kg'],
    weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
    tags: ['Pure Ghee'],
    shelfLife: '15 Days',
    reviews: []
  });

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState<Partial<Coupon>>({
    code: '',
    discountPercent: 10,
    maxDiscount: 200,
    description: '',
    minOrderAmount: 500,
    expiryDate: '2026-12-31',
    active: true
  });

  // Calculate high-level stats
  const totalSales = orders.reduce((acc, o) => o.status !== 'Cancelled' ? acc + o.finalAmount : acc, 0);
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const lowStockProducts = products.filter(p => p.stock < 15);

  // Simple category analytical distributions
  const categorySalesMap: { [key: string]: number } = {};
  orders.forEach(o => {
    if (o.status !== 'Cancelled') {
      o.items.forEach(item => {
        const cat = item.product.category;
        const total = item.priceAtSelection * item.quantity;
        categorySalesMap[cat] = (categorySalesMap[cat] || 0) + total;
      });
    }
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onEditProduct({ ...editingProduct, ...productForm } as Product);
    } else {
      const newProd: Product = {
        ...productForm,
        id: 'sweet_' + Date.now(),
        reviews: [],
        rating: 4.8,
        ratingCount: 1,
      } as Product;
      onAddProduct(newProd);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponForm.code) {
      onAddCoupon({
        code: couponForm.code.toUpperCase().replace(/\s+/g, ''),
        discountPercent: Number(couponForm.discountPercent),
        maxDiscount: Number(couponForm.maxDiscount),
        description: couponForm.description || '',
        minOrderAmount: Number(couponForm.minOrderAmount),
        expiryDate: couponForm.expiryDate || '2026-12-31',
        active: true
      });
      setShowCouponModal(false);
      setCouponForm({ code: '', discountPercent: 10, maxDiscount: 200, description: '', minOrderAmount: 500 });
    }
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm(prod);
    setShowProductModal(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      category: 'mithai',
      price: 300,
      discountPercent: 0,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80',
      ingredients: ['Pure Desi Ghee', 'Organic Milk', 'Cardamom'],
      weightOptions: ['250g', '500g', '1kg'],
      weightMultipliers: { '250g': 0.55, '500g': 1.0, '1kg': 1.9 },
      tags: ['Pure Ghee'],
      shelfLife: '15 Days',
    });
    setShowProductModal(true);
  };

  return (
    <div className="bg-[#FFF8E7] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-none p-6 sm:p-8 shadow-xl max-w-7xl mx-auto my-8 relative text-stone-800 dark:text-cream-100">
      
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-5 mb-6 gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-6 w-6 text-[#800000] dark:text-[#D4AF37] animate-pulse" />
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-cream-100">
              Gokul Sweet Admin Portal
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Real-time product, inventory, discount coupons & orders catalog manager
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="px-5 py-2 border border-stone-300 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-900 text-xs font-semibold rounded-none cursor-pointer transition-all uppercase tracking-wider font-bold"
        >
          Close Dashboard
        </button>
      </div>

      {/* Analytics Card Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        
        <div className="p-4 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">Total Sales Turnover</span>
          <p className="text-xl font-mono font-bold text-[#800000] dark:text-[#D4AF37] pt-0.5">₹{totalSales}</p>
        </div>
        
        <div className="p-4 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">Orders Processed</span>
          <p className="text-xl font-mono font-bold text-stone-800 dark:text-cream-100 pt-0.5">{totalOrdersCount} orders</p>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">Active Shipments</span>
          <p className="text-xl font-mono font-bold text-amber-600 dark:text-amber-400 pt-0.5">{activeOrdersCount} pending</p>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">Inventory Status</span>
          {lowStockProducts.length > 0 ? (
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1 pt-2">
              <AlertTriangle className="h-4 w-4 animate-bounce" /> {lowStockProducts.length} low stock items!
            </p>
          ) : (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2 flex items-center gap-1 uppercase tracking-wider">✓ Stock is Healthy</p>
          )}
        </div>

      </div>

      {/* Interactive Tabs Header */}
      <div className="flex flex-wrap border-b border-stone-200 dark:border-stone-800 text-xs font-bold mb-6 gap-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer uppercase tracking-wider font-bold ${
            activeTab === 'orders' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37]' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-cream-100'
          }`}
        >
          Orders List ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer uppercase tracking-wider font-bold ${
            activeTab === 'products' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37]' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-cream-100'
          }`}
        >
          Manage Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer uppercase tracking-wider font-bold ${
            activeTab === 'inventory' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37]' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-cream-100'
          }`}
        >
          Inventory & Stock
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer uppercase tracking-wider font-bold ${
            activeTab === 'coupons' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37]' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-cream-100'
          }`}
        >
          Coupons Control ({coupons.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2.5 px-4 border-b-2 transition-all cursor-pointer uppercase tracking-wider font-bold ${
            activeTab === 'analytics' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37]' : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-cream-100'
          }`}
        >
          Sales Analytics
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="min-h-[300px]">

        {/* Tab 1: Orders list */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 flex items-center gap-1.5">
              <ShoppingCart className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
              <span>Customer Purchases Tracker</span>
            </h3>

            {orders.length === 0 ? (
              <p className="text-xs text-stone-500 dark:text-stone-450 italic py-8 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">No orders placed yet. Orders placed by customers appear here instantly!</p>
            ) : (
              <div className="overflow-x-auto rounded-none border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                <table className="w-full text-left text-xs divide-y divide-stone-200 dark:divide-stone-800">
                  <thead className="bg-stone-100 dark:bg-stone-850 text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                    <tr>
                      <th className="p-3.5">Order Info</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">Sweets Ordered</th>
                      <th className="p-3.5">Total Bill</th>
                      <th className="p-3.5">Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-850/40">
                        <td className="p-3.5 leading-tight space-y-0.5">
                          <strong className="text-stone-950 dark:text-cream-100 font-mono text-[11px] block">{o.orderNumber}</strong>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 block">{o.date}</span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium truncate block max-w-[120px]">ID: {o.paymentId}</span>
                        </td>
                        
                        <td className="p-3.5 leading-normal space-y-0.5">
                          <strong className="text-stone-800 dark:text-cream-100 block">{o.shippingAddress.name}</strong>
                          <span className="text-stone-500 dark:text-stone-400 block">📞 {o.shippingAddress.phone}</span>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 truncate block max-w-[150px]">{o.shippingAddress.address}, {o.shippingAddress.city}</span>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <div className="space-y-1">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-[11px] gap-2">
                                <span className="truncate text-stone-800 dark:text-cream-100">{it.product.name} ({it.selectedWeight})</span>
                                <strong className="flex-shrink-0 text-stone-400 dark:text-stone-500">x{it.quantity}</strong>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <strong className="text-[#800000] dark:text-[#D4AF37] text-sm block font-mono font-bold">₹{o.finalAmount}</strong>
                          <span className="text-[9px] text-stone-400 dark:text-stone-500 uppercase font-bold">{o.paymentMethod.split(' ')[0]}</span>
                        </td>

                        <td className="p-3.5">
                          <select
                             value={o.status}
                             onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order['status'])}
                             className={`px-2 py-1.5 rounded-none text-[10px] font-bold border ${
                               o.status === 'Delivered'
                                 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900'
                                 : o.status === 'Cancelled'
                                 ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-450 dark:border-red-900'
                                 : o.status === 'Dispatched'
                                 ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900'
                                 : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900'
                             } focus:outline-none focus:ring-1 focus:ring-[#D4AF37]`}
                          >
                            <option value="Pending">Pending Approval</option>
                            <option value="Preparing">Preparing Sweets</option>
                            <option value="Dispatched">Dispatched / Out</option>
                            <option value="Delivered">Delivered ✓</option>
                            <option value="Cancelled">Cancelled ✕</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Products list with edit/add/delete */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 flex items-center gap-1.5">
                <Layers className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
                <span>Sweet Confectionery Catalog</span>
              </h3>
              
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 font-bold text-xs rounded-none uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Sweet</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800 flex gap-3.5 relative group"
                >
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-none flex-shrink-0 border border-stone-200 dark:border-stone-800" />
                  
                  <div className="flex-1 min-w-0 space-y-1 text-stone-800 dark:text-cream-100">
                    <strong className="block truncate text-xs sm:text-sm font-semibold">{p.name}</strong>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-bold block">{p.category.replace('-', ' ')}</span>
                    
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <strong className="text-[#800000] dark:text-[#D4AF37] font-bold font-mono">₹{p.price}</strong>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">Stock: {p.stock}</span>
                    </div>
                  </div>

                  {/* Edit / Delete overlay */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="p-1.5 bg-white hover:bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-none border border-stone-250 dark:border-stone-700 hover:border-[#D4AF37] cursor-pointer"
                      title="Edit Sweet Details"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-none border border-red-200 dark:border-red-900 cursor-pointer"
                      title="Delete Sweet"
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inventory & Stock */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 flex items-center gap-1.5">
              <Layers className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
              <span>Real-time Stock Audits</span>
            </h3>

            <div className="overflow-x-auto rounded-none border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
              <table className="w-full text-left text-xs divide-y divide-stone-200 dark:divide-stone-800">
                <thead className="bg-stone-100 dark:bg-stone-850 text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                  <tr>
                    <th className="p-3">Sweet Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3 text-center">Unit Price (Base)</th>
                    <th className="p-3 text-center">Current Stock Levels</th>
                    <th className="p-3 text-right">Quick Stock Refill Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                  {products.map((p) => {
                    const isLow = p.stock < 15;
                    return (
                      <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-850/40">
                        <td className="p-3 flex items-center gap-2.5">
                          <img src={p.image} alt="" className="w-8 h-8 object-cover rounded-none flex-shrink-0" />
                          <strong className="text-stone-850 dark:text-cream-100 font-semibold">{p.name}</strong>
                        </td>
                        <td className="p-3 uppercase text-[10px] text-stone-400 dark:text-stone-500 tracking-wider font-bold">{p.category.replace('-', ' ')}</td>
                        <td className="p-3 text-center font-bold">₹{p.price}</td>
                        <td className="p-3 text-center font-bold">
                          <span className={`px-2.5 py-1 rounded-none text-xs ${
                            isLow ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse font-extrabold dark:bg-red-950/20 dark:text-red-400 dark:border-red-900' : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-cream-100'
                          }`}>
                            {p.stock} units {isLow && '⚠️ LOW'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-1.5 border border-stone-200 dark:border-stone-800 rounded-none overflow-hidden bg-white dark:bg-stone-900">
                            <button
                              onClick={() => onEditProduct({ ...p, stock: Math.max(0, p.stock - 10) })}
                              className="px-2.5 py-1 text-xs hover:bg-stone-100 dark:hover:bg-stone-850 text-red-600 font-bold transition-all"
                              title="Decrease stock by 10"
                            >
                              -10
                            </button>
                            <span className="w-px h-3 bg-stone-200 dark:bg-stone-800" />
                            <button
                              onClick={() => onEditProduct({ ...p, stock: p.stock + 10 })}
                              className="px-2.5 py-1 text-xs hover:bg-stone-100 dark:hover:bg-stone-850 text-green-600 font-bold transition-all"
                              title="Increase stock by 10"
                            >
                              +10
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Coupons control */}
        {activeTab === 'coupons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 flex items-center gap-1.5">
                <Percent className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
                <span>Active Coupon Promos</span>
              </h3>

              <button
                onClick={() => setShowCouponModal(true)}
                className="px-4 py-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 font-bold text-xs rounded-none uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className={`p-4 rounded-none border flex items-center justify-between transition-all ${
                    c.active
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5 text-stone-800 dark:text-cream-100'
                      : 'border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/20 text-stone-400'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-mono tracking-wider font-extrabold uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded-none text-[#800000] dark:text-[#D4AF37]">
                        {c.code}
                      </strong>
                      <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">
                        ({c.discountPercent}% OFF)
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">{c.description}</p>
                    <div className="text-[9px] text-stone-400 dark:text-stone-500 space-x-2 font-medium">
                      <span>Min Order: ₹{c.minOrderAmount}</span>
                      <span>•</span>
                      <span>Max Disc: ₹{c.maxDiscount}</span>
                      <span>•</span>
                      <span>Expires: {c.expiryDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleCoupon(c.code)}
                    className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      c.active
                        ? 'bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                        : 'bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                    }`}
                  >
                    {c.active ? 'Disable' : 'Enable'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Sales Analytics charts */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 flex items-center gap-1.5">
              <BarChart2 className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
              <span>Revenue Distribution Analysis</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Left Bar Chart: Category sales */}
              <div className="p-6 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800 space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block">Revenue by Categories (INR)</span>
                
                <div className="space-y-3.5">
                  {CATEGORIES.map((cat) => {
                    const salesValue = categorySalesMap[cat.id] || 0;
                    const maxVal = Math.max(...Object.values(categorySalesMap), 1000);
                    const widthPercent = Math.min(100, Math.max(5, (salesValue / maxVal) * 100));
                    
                    return (
                      <div key={cat.id} className="space-y-1">
                        <div className="flex justify-between text-xs text-stone-700 dark:text-cream-100 font-medium">
                          <span className="capitalize">{cat.name}</span>
                          <strong className="font-mono font-bold text-[#800000] dark:text-[#D4AF37]">₹{salesValue}</strong>
                        </div>
                        {/* Horizontal Bar */}
                        <div className="w-full h-2 bg-stone-100 dark:bg-stone-950 rounded-none overflow-hidden border border-stone-200/50 dark:border-stone-800">
                          <div
                            className="h-full bg-gradient-to-r from-[#800000] to-[#D4AF37] transition-all duration-1000"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right List: Customer order value stats */}
              <div className="p-6 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800 space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block">General Analytics Intel</span>
                
                <div className="divide-y divide-stone-200 dark:divide-stone-800 text-xs space-y-4 text-stone-700 dark:text-stone-300">
                  <div className="flex justify-between pt-2">
                    <span>Average Shopping Bill:</span>
                    <strong className="text-stone-900 dark:text-cream-100 font-mono font-bold text-sm">
                      ₹{orders.length > 0 ? Math.round(totalSales / orders.length) : 0}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span>Active Coupons Applied Count:</span>
                    <strong className="text-stone-900 dark:text-cream-100 font-mono font-bold text-sm">
                      {orders.filter(o => o.couponApplied).length} times
                    </strong>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span>Total Cash-on-Delivery Sales:</span>
                    <strong className="text-stone-900 dark:text-cream-100 font-mono font-bold text-sm text-[#800000] dark:text-stone-350">
                      ₹{orders.filter(o => o.paymentMethod.startsWith('CASH')).reduce((acc, o) => acc + o.finalAmount, 0)}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span>Total Online (Card/UPI) Turnover:</span>
                    <strong className="text-stone-900 dark:text-cream-100 font-mono font-bold text-sm text-green-600 dark:text-[#D4AF37]">
                      ₹{orders.filter(o => !o.paymentMethod.startsWith('CASH') && o.status !== 'Cancelled').reduce((acc, o) => acc + o.finalAmount, 0)}
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT SWEET MODAL FORM --- */}
      {showProductModal && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in text-xs text-stone-800 dark:text-cream-100">
          <div className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-250 dark:border-stone-800 w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl relative p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <strong className="text-sm font-bold font-serif text-[#800000] dark:text-[#D4AF37] uppercase tracking-wider">
                {editingProduct ? `Edit Details: ${editingProduct.name}` : 'Add New Custom Sweet Item'}
              </strong>
              <button onClick={() => setShowProductModal(false)} className="text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Sweet Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Dry Fruit Saffron Barfi"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Sweet Description</label>
                  <textarea
                    required
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Enter short description..."
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] text-xs"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Base Price (for 500g)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Discount (Percent)</label>
                  <input
                    type="number"
                    value={productForm.discountPercent}
                    onChange={(e) => setProductForm({ ...productForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Inventory stock qty</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Shelf Life duration</label>
                  <input
                    type="text"
                    required
                    value={productForm.shelfLife}
                    onChange={(e) => setProductForm({ ...productForm, shelfLife: e.target.value })}
                    placeholder="15 Days"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Visual Image URL</label>
                  <input
                    type="text"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-250 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-800 rounded-none hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300 cursor-pointer text-[11px] uppercase tracking-wider font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 font-bold rounded-none cursor-pointer text-[11px] uppercase tracking-wider"
                >
                  Save Sweet
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- ADD NEW COUPON MODAL FORM --- */}
      {showCouponModal && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in text-xs text-stone-800 dark:text-cream-100">
          <div className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-250 dark:border-stone-800 w-full max-w-md shadow-2xl relative p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <strong className="text-sm font-bold font-serif text-[#800000] dark:text-[#D4AF37] uppercase tracking-wider">
                Create New Promo Coupon
              </strong>
              <button onClick={() => setShowCouponModal(false)} className="text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCouponSubmit} className="space-y-3">
              
              <div>
                <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  placeholder="SWEETDIWALI"
                  className="w-full px-3 py-2.5 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none uppercase focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Discount Percent</label>
                  <input
                    type="number"
                    required
                    value={couponForm.discountPercent}
                    onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Max Cap Discount (INR)</label>
                  <input
                    type="number"
                    required
                    value={couponForm.maxDiscount}
                    onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Min Order Limit (INR)</label>
                  <input
                    type="number"
                    required
                    value={couponForm.minOrderAmount}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrderAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={couponForm.expiryDate}
                    onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-[10px] text-stone-500 dark:text-stone-400 block mb-1">Promo Description</label>
                <input
                  type="text"
                  required
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  placeholder="Get 10% discount on sweet library boxes."
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3 border-t border-stone-250 dark:border-stone-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-800 rounded-none hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300 cursor-pointer text-[11px] uppercase tracking-wider font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 font-bold rounded-none cursor-pointer text-[11px] uppercase tracking-wider"
                >
                  Save Promo
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
