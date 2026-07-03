import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, Percent, Gift, ArrowRight } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { INITIAL_COUPONS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onCheckout,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate pricing breakdown
  const subtotal = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);
  
  // Coupon discount calculations
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount);
  }

  // Delivery calculations (Free above ₹1500, else ₹100 as per Marquee offer)
  const isFreeDelivery = subtotal >= 1500 || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 100;
  
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleCustomCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    
    if (!code) return;

    const coupon = INITIAL_COUPONS.find(c => c.code === code && c.active);
    if (!coupon) {
      setCouponError('Invalid or expired coupon code.');
      return;
    }

    if (subtotal < coupon.minOrderAmount) {
      setCouponError(`Minimum order of ₹${coupon.minOrderAmount} required for this coupon.`);
      return;
    }

    onApplyCoupon(coupon);
    setCouponInput('');
  };

  const handleApplyQuickCoupon = (coupon: Coupon) => {
    setCouponError('');
    if (subtotal < coupon.minOrderAmount) {
      setCouponError(`Add ₹${coupon.minOrderAmount - subtotal} more to unlock coupon "${coupon.code}"`);
      return;
    }
    onApplyCoupon(coupon);
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
      
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#FFF8E7] dark:bg-stone-950 border-l border-stone-200 dark:border-stone-850 shadow-2xl flex flex-col z-10 animate-slide-in-right">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#800000] dark:text-[#D4AF37]" />
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
              Your Shopping Cart ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#800000]/5 dark:hover:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800 transition-all text-stone-500 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-5xl">🍬</span>
              <h3 className="font-serif text-base font-bold text-stone-850 dark:text-cream-100">Your cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Add some of our handcrafted pure Desi Ghee traditional sweets or luxury gift boxes to start your celebration!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#800000] hover:bg-[#990000] text-[#FFF8E7] text-xs font-bold rounded-none transition-all cursor-pointer uppercase tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const finalPrice = Math.round(item.priceAtSelection * (1 - item.product.discountPercent / 100));
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-850 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-none border border-stone-250 dark:border-stone-800 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-800 dark:text-cream-100 truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-stone-400 block font-medium">Size: {item.selectedWeight}</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xs font-bold text-[#800000] dark:text-[#D4AF37]">
                            ₹{finalPrice}
                          </span>
                          {item.product.discountPercent > 0 && (
                            <span className="text-[9px] text-stone-400 line-through">
                              ₹{item.priceAtSelection}
                            </span>
                          )}
                          <span className="text-[9px] text-stone-500 font-mono">x {item.quantity}</span>
                        </div>
                      </div>

                      {/* Quantity Incrementor / Trash */}
                      <div className="flex flex-col items-end gap-2.5">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        
                        <div className="flex items-center border border-stone-350 dark:border-stone-800 rounded-none overflow-hidden bg-white dark:bg-stone-950 text-[10px] font-bold">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-stone-500 hover:bg-[#800000]/5 transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-stone-800 dark:text-cream-100">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-stone-500 hover:bg-[#800000]/5 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Coupon Form */}
              <div className="p-3.5 bg-[#FFF8E7] dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-850 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-cream-100">
                  <Percent className="h-4 w-4 text-[#800000] dark:text-[#D4AF37]" />
                  <span>Have a Promo Coupon?</span>
                </div>

                <form onSubmit={handleCustomCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Code (e.g. GOKUL10)"
                    className="flex-1 text-[11px] px-3 py-2 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-950 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#800000] hover:bg-[#990000] text-[#FFF8E7] text-[11px] font-semibold rounded-none transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>

                {couponError && <p className="text-[10px] text-red-600 dark:text-red-400 font-medium">{couponError}</p>}
                
                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-[#D4AF37]/10 border border-[#D4AF37]/35 p-2 rounded-none text-[11px] text-stone-800 dark:text-[#D4AF37] font-bold">
                    <span className="flex items-center gap-1">
                      🏷️ Applied Code: {appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={() => onApplyCoupon(null)}
                      className="text-red-600 hover:underline cursor-pointer font-bold text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Available Coupons list */}
                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 space-y-1.5">
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                    Click to Apply Instant Coupons
                  </span>
                  
                  <div className="space-y-1">
                    {INITIAL_COUPONS.map((coupon) => {
                      const isDisabled = subtotal < coupon.minOrderAmount;
                      const isCurrentlyApplied = appliedCoupon?.code === coupon.code;
                      return (
                        <button
                          key={coupon.code}
                          type="button"
                          onClick={() => handleApplyQuickCoupon(coupon)}
                          disabled={isCurrentlyApplied}
                          className={`w-full text-left p-2 rounded-none border text-[10px] transition-all flex items-center justify-between ${
                            isCurrentlyApplied
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 dark:text-[#D4AF37] font-bold'
                              : isDisabled
                              ? 'border-stone-200 dark:border-stone-800 text-stone-400 opacity-60 cursor-not-allowed'
                              : 'border-stone-300 bg-white hover:bg-[#800000]/5 hover:border-[#D4AF37]/50 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300 cursor-pointer'
                          }`}
                        >
                          <div className="flex flex-col leading-tight pr-2">
                            <span className="font-bold flex items-center gap-1 text-stone-800 dark:text-cream-100">
                              <Gift className="h-3 w-3 text-[#D4AF37]" />
                              {coupon.code} ({coupon.discountPercent}% OFF)
                            </span>
                            <span className="text-[8.5px] text-stone-500 dark:text-stone-400 truncate mt-0.5 max-w-[280px]">
                              {coupon.description}
                            </span>
                          </div>
                          {!isCurrentlyApplied && (
                            <span className="text-[9px] font-bold text-[#800000] dark:text-[#D4AF37] flex-shrink-0">
                              {isDisabled ? `Min ₹${coupon.minOrderAmount}` : 'Apply'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Billing details (only shown if there are items) */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 space-y-3">
            
            {/* Pricing breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-800 dark:text-cream-100">₹{subtotal}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-500 font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Delivery Charges:
                  {subtotal < 1500 && (
                    <span className="text-[9px] bg-[#800000]/10 text-[#800000] px-1.5 py-0.5 rounded-none font-bold text-xs">
                      Add ₹{1500 - subtotal} for FREE Delivery
                    </span>
                  )}
                </span>
                <span className="font-semibold text-stone-800 dark:text-cream-100">
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px]">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              
              <div className="pt-2.5 border-t border-stone-200 dark:border-stone-850 flex justify-between text-sm font-bold text-stone-900 dark:text-cream-100">
                <span>Grand Total:</span>
                <span className="text-base text-[#800000] dark:text-[#D4AF37]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onCheckout}
              className="w-full py-3 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 text-sm font-bold rounded-none shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group uppercase tracking-wider"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[9px] text-center text-stone-400 leading-none">
              By checking out, you agree to traditional ghee quality and pristine packing.
            </p>

          </div>
        )}

      </div>

      {/* Slide drawer styling details */}
      <style>{`
        .animate-slide-in-right {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

    </div>
  );
}
