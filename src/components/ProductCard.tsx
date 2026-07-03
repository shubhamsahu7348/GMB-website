import React from 'react';
import { Heart, Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
  onQuickView: () => void;
  onAddToCart: (selectedWeight: string) => void;
  onBuyNow: (selectedWeight: string) => void;
}

export default function ProductCard({
  product,
  isInWishlist,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  
  // Calculate discount price
  const hasDiscount = product.discountPercent > 0;
  const finalPrice = hasDiscount 
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  // Render tag styling based on name
  const renderTag = (tag: string) => {
    let colorClass = "bg-[#800000] text-[#FFF8E7]";
    if (tag === 'Sugar-Free') colorClass = "bg-emerald-700 text-white";
    if (tag === 'Pure Ghee') colorClass = "bg-[#D4AF37] text-[#800000]";
    if (tag === 'New') colorClass = "bg-amber-600 text-white";
    
    return (
      <span key={tag} className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none ${colorClass}`}>
        {tag}
      </span>
    );
  };

  return (
    <div className="group relative rounded-none bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col h-full transform hover:translate-y-[-4px]">
      
      {/* 1. IMAGE & OVERLAYS */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer" onClick={onQuickView}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Absolute Top Overlays */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.tags.slice(0, 2).map((tag) => renderTag(tag))}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md z-10 transition-transform active:scale-90 bg-white/90 hover:bg-white dark:bg-stone-900/95 dark:hover:bg-stone-900`}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isInWishlist ? 'text-red-600 fill-red-600 animate-pulse' : 'text-stone-500 dark:text-stone-300 hover:text-red-500'
            }`}
          />
        </button>

        {/* Shelf life tag at bottom left */}
        <div className="absolute bottom-2 left-2 bg-stone-950/80 backdrop-blur-xs text-[#FFF8E7] text-[9px] font-semibold px-2 py-0.5 rounded-none">
          ⏳ Shelf Life: {product.shelfLife}
        </div>

        {/* Hover Quick Action Overlays */}
        <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="p-3 bg-white hover:bg-[#800000]/5 dark:bg-stone-900 dark:hover:bg-stone-850 rounded-full shadow-lg hover:scale-115 transition-all text-stone-800 dark:text-cream-100 border border-stone-200 dark:border-stone-800"
            title="Quick View Specs"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-amber-500">
            <Star className="h-3 w-3 fill-amber-500" />
            <span className="text-[11px] font-bold ml-1 text-stone-700 dark:text-stone-300">{product.rating}</span>
          </div>
          <span className="text-[10px] text-stone-400 dark:text-stone-500">({product.ratingCount})</span>
          
          <span className="text-[10px] text-[#D4AF37] ml-auto font-semibold uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </span>
        </div>

        {/* Product Title */}
        <h3 
          className="font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-cream-100 line-clamp-1 cursor-pointer hover:text-[#800000] dark:hover:text-[#D4AF37] transition-colors"
          onClick={onQuickView}
        >
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 h-8 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Discounts */}
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="text-sm font-bold text-[#800000] dark:text-[#D4AF37]">
            ₹{finalPrice}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-stone-400 line-through">
                ₹{product.price}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                ({product.discountPercent}% OFF)
              </span>
            </>
          )}
          <span className="text-[9px] text-stone-400 ml-auto">for {product.weightOptions[0]}</span>
        </div>

        {/* Ingredients Peek */}
        <div className="text-[9px] text-stone-400 line-clamp-1">
          Ingredients: {product.ingredients.join(', ')}
        </div>

        {/* Card Action Buttons (Add to Cart / Buy Now) */}
        <div className="grid grid-cols-2 gap-2 pt-3 mt-auto">
          <button
            onClick={() => onAddToCart(product.weightOptions[0])}
            className="py-2 px-2 border border-[#800000]/30 hover:border-[#800000] dark:border-[#D4AF37]/20 dark:hover:border-[#D4AF37]/50 hover:bg-[#800000]/5 dark:hover:bg-stone-900 text-[#800000] dark:text-[#D4AF37] text-xs font-semibold rounded-none flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <ShoppingCart className="h-3 w-3" />
            <span>Add Cart</span>
          </button>
          
          <button
            onClick={() => onBuyNow(product.weightOptions[0])}
            className="py-2 px-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 text-xs font-bold rounded-none flex items-center justify-center gap-1 shadow-sm hover:shadow hover:translate-y-[-1px] transition-all cursor-pointer uppercase tracking-wider"
          >
            <span>Buy Now</span>
          </button>
        </div>

      </div>

      {/* Glow highlight strip at bottom */}
      <div className="h-1 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#800000] group-hover:to-[#D4AF37] transition-colors" />

    </div>
  );
}
