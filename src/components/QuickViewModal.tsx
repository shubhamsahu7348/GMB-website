import React, { useState } from 'react';
import { X, Star, Calendar, ShoppingCart, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
  onAddToCart: (selectedWeight: string, quantity: number) => void;
  onBuyNow: (selectedWeight: string, quantity: number) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isInWishlist,
  onWishlistToggle,
  onAddToCart,
  onBuyNow,
}: QuickViewModalProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'reviews'>('details');

  if (!isOpen) return null;

  // Calculate dynamic price based on selected weight multiplier
  const multiplier = product.weightMultipliers[selectedWeight] || 1.0;
  const standardPrice = Math.round(product.price * multiplier);
  
  const hasDiscount = product.discountPercent > 0;
  const discountedPrice = hasDiscount 
    ? Math.round(standardPrice * (1 - product.discountPercent / 100))
    : standardPrice;

  const handleIncrement = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-200 dark:border-stone-850 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-stone-950/10 hover:bg-stone-950/20 dark:bg-stone-100/10 dark:hover:bg-stone-100/20 text-stone-800 dark:text-cream-100 rounded-none border border-stone-200 dark:border-stone-800 transition-all cursor-pointer z-10"
          title="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Large Image Showcase */}
        <div className="w-full md:w-1/2 relative bg-stone-100 dark:bg-stone-900 flex items-center justify-center border-r border-stone-200 dark:border-stone-850">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[300px] md:max-h-full aspect-square"
          />
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {product.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-[#800000] text-[#FFF8E7] px-2.5 py-0.5 rounded-none shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          {/* Wishlist Heart absolute */}
          <button
            onClick={onWishlistToggle}
            className="absolute top-4 right-14 p-2 bg-white/95 hover:bg-white dark:bg-stone-900 dark:hover:bg-stone-850 rounded-none border border-stone-200 dark:border-stone-800 shadow-md z-10"
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'text-red-600 fill-red-600 animate-pulse' : 'text-stone-500'}`} />
          </button>
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col space-y-4">
          
          {/* Header info */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
              {product.category.replace('-', ' ')}
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100 mt-1 leading-tight">
              {product.name}
            </h2>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300 dark:text-stone-750'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.ratingCount} Customer reviews)</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pb-2 border-b border-stone-200 dark:border-stone-850">
            <span className="text-2xl font-bold text-[#800000] dark:text-[#D4AF37]">
              ₹{discountedPrice}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-stone-400 line-through">
                  ₹{standardPrice}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none tracking-wide">
                  {product.discountPercent}% FESTIVE DISCOUNT
                </span>
              </>
            )}
          </div>

          {/* Tab buttons (Specs vs Ingredients vs Reviews) */}
          <div className="flex border-b border-stone-200 dark:border-stone-850 text-xs font-medium">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2 px-4 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'details' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37] font-bold' : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-2 px-4 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'ingredients' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37] font-bold' : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-4 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews' ? 'border-[#800000] text-[#800000] dark:border-[#D4AF37] dark:text-[#D4AF37] font-bold' : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 min-h-[110px] text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-h-[160px] overflow-y-auto pr-1">
            {activeTab === 'details' && (
              <div className="space-y-2">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 gap-y-1 text-[11px] pt-1 border-t border-stone-200/50 dark:border-stone-850/50">
                  <span>⏳ Shelf Life: <strong>{product.shelfLife}</strong></span>
                  <span>🥇 Pure Desi Ghee: <strong>100% Guaranteed</strong></span>
                  <span>📦 Secure Box Packing: <strong>Food-grade</strong></span>
                  <span>🛡️ Preservation: <strong>No chemicals</strong></span>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-1">
                <p className="font-semibold mb-1 text-stone-800 dark:text-stone-200">Contains traditional premium food elements:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="capitalize">{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {product.reviews.length === 0 ? (
                  <p className="text-stone-400 italic">No reviews yet for this product. Be the first to leave a 5-star review!</p>
                ) : (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-stone-200 dark:border-stone-850 pb-2.5 last:border-0">
                      <div className="flex items-center justify-between">
                        <strong className="text-stone-800 dark:text-cream-100 text-[11px]">{rev.userName}</strong>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">{rev.comment}</p>
                      <span className="text-[9px] text-stone-400 block mt-0.5">{rev.date} • Verified Sweet Buyer</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Weight Size Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-widest block">
              Select Pack Size / Weight
            </label>
            <div className="flex flex-wrap gap-2">
              {product.weightOptions.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-4 py-2 text-xs border transition-all cursor-pointer font-semibold rounded-none ${
                    selectedWeight === weight
                      ? 'bg-[#800000] text-[#FFF8E7] border-[#800000] dark:bg-[#D4AF37] dark:text-stone-950 dark:border-[#D4AF37] shadow-sm'
                      : 'border-stone-300 bg-white text-stone-700 hover:border-[#800000] hover:bg-[#800000]/5 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-900'
                  }`}
                >
                  {weight}
                  {product.weightMultipliers[weight] && product.weightMultipliers[weight] !== 1 && (
                    <span className="text-[9px] opacity-75 font-normal ml-1">
                      (x{product.weightMultipliers[weight]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Checkout Controls */}
          <div className="flex items-center gap-4 pt-4 border-t border-stone-200 dark:border-stone-850">
            {/* Quantity Counter */}
            <div className="flex items-center border border-stone-300 dark:border-stone-800 rounded-none overflow-hidden bg-white dark:bg-stone-950">
              <button
                onClick={handleDecrement}
                className="px-3 py-2 text-stone-500 hover:bg-[#800000]/5 dark:hover:bg-stone-900 transition-colors cursor-pointer text-sm font-bold"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-stone-800 dark:text-cream-100">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-2 text-stone-500 hover:bg-[#800000]/5 dark:hover:bg-stone-900 transition-colors cursor-pointer text-sm font-bold"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAddToCart(selectedWeight, quantity);
                  onClose();
                }}
                className="py-3 px-3 border border-[#800000] hover:bg-[#800000]/5 dark:border-[#D4AF37] dark:hover:bg-stone-900 text-[#800000] dark:text-[#D4AF37] text-xs font-bold rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  onBuyNow(selectedWeight, quantity);
                  onClose();
                }}
                className="py-3 px-3 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 text-xs font-bold rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md uppercase tracking-wider"
              >
                <span>Order Now</span>
              </button>
            </div>
          </div>

          {/* Secure transaction certificate note */}
          <div className="flex items-center gap-1.5 text-[10px] text-stone-500 justify-center">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Prepared hygienically in pure Ghee. Shipped in airtight foil.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
