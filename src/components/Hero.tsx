import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopNowClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopNowClick, onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-[#FFF8E7] dark:bg-stone-950 py-16 lg:py-24 border-b border-stone-200 dark:border-stone-850 transition-colors duration-300">
      
      {/* Background Indian Pattern / Mandala elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="indianPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 C60 20 80 20 100 0 M0 50 C20 60 20 80 0 100 M50 100 C60 80 80 80 100 100 M100 50 C80 60 80 40 100 0" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#800000" strokeWidth="1" />
              <path d="M 50,40 L 50,60 M 40,50 L 60,50" stroke="#D4AF37" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#indianPattern)" />
        </svg>
      </div>

      {/* Atmospheric Royal Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-maroon-700/10 dark:bg-maroon-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold-500/10 dark:bg-gold-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800000]/5 dark:bg-[#D4AF37]/10 border border-[#800000]/20 dark:border-[#D4AF37]/30 text-[#800000] dark:text-[#D4AF37] text-xs font-semibold tracking-wider uppercase animate-bounce-slow">
              <Sparkles className="h-4 w-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
              Authentic Indian Sweets Since 1995
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#800000] dark:text-[#FFF8E7] leading-[1.1]">
              Authentic Indian <br className="hidden sm:inline" />Sweets <span className="italic font-serif text-[#D4AF37]">Crafted with Love</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              Experience the rich taste of handcrafted Indian sweets made from premium select ingredients, slow-caramelized organic milk, and pure Desi Ghee. Every box carries our 30-year legacy of culinary integrity and festivity.
            </p>

            {/* Ghee and Handmade Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-350">
              <span className="flex items-center gap-1.5 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 shadow-xs">
                🥇 <strong className="text-[#800000] dark:text-[#D4AF37]">100% Pure Desi Ghee</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 shadow-xs">
                👐 <strong>Handmade Daily</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 shadow-xs">
                🌱 <strong>Zero Preservatives</strong>
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto bg-[#800000] text-white px-8 py-3.5 text-xs uppercase font-bold tracking-[0.2em] shadow-lg hover:shadow-[#800000]/20 hover:scale-105 transition-all cursor-pointer rounded-none"
              >
                Shop Now
              </button>
              
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto border border-[#D4AF37] text-[#800000] dark:text-[#D4AF37] px-8 py-3.5 text-xs uppercase font-bold tracking-[0.2em] bg-white/50 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-900 transition-all cursor-pointer rounded-none"
              >
                Festival Gifts
              </button>
            </div>

          </div>

          {/* Right Floating Sweets Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[320px] sm:h-[400px]">
            {/* Skew Background block from Design HTML */}
            <div className="absolute inset-y-0 right-0 left-1/4 bg-[#800000] skew-x-[-15deg] translate-x-12 opacity-90 hidden lg:block rounded-3xl pointer-events-none"></div>
            
            {/* Golden Starry Radial Backdrop */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-[#D4AF37]/20 dark:border-[#D4AF37]/10 flex items-center justify-center animate-spin" style={{ animationDuration: '60s' }}>
              <div className="w-64 h-64 rounded-full border border-dashed border-[#D4AF37]/30" />
            </div>

            {/* Main Plate Image (Platter) */}
            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37] bg-stone-900 dark:bg-stone-950 transition-all duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80"
                alt="Luxury Indian Sweets Platter"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-semibold mb-0.5">Signature Selection</span>
                <span className="font-serif text-lg font-bold text-white block">Classic Kaju Katli</span>
                <span className="text-xs text-stone-200">Silver-leafed cashew luxury</span>
              </div>
            </div>

            {/* --- FLOATING SWEET ASSETS (Programmatic Float effects) --- */}
            
            {/* Sweet Floating asset 1: Kaju Katli representation */}
            <div 
              className="absolute z-20 top-4 left-6 bg-white dark:bg-stone-900 p-2.5 rounded-xl shadow-lg border border-[#D4AF37]/40 flex items-center gap-2 animate-float"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <img
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=100&q=80"
                alt="Floating Kaju Katli"
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold text-stone-800 dark:text-cream-100 block">Kaju Katli</span>
                <span className="text-[#D4AF37] font-bold">Bestseller ⭐</span>
              </div>
            </div>

            {/* Sweet Floating asset 2: Motichoor Ladoo representation */}
            <div 
              className="absolute z-20 bottom-8 right-4 bg-white dark:bg-stone-900 p-2.5 rounded-xl shadow-lg border border-[#D4AF37]/40 flex items-center gap-2"
              style={{ animation: 'float 7s ease-in-out infinite 1s' }}
            >
              <img
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=100&q=80"
                alt="Floating Ladoo"
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="text-[10px] leading-tight">
                <span className="font-bold text-stone-800 dark:text-cream-100 block">Saffron Ladoo</span>
                <span className="text-[#800000] dark:text-[#D4AF37] font-bold">Desi Ghee 🥇</span>
              </div>
            </div>

            {/* Sweet Floating asset 3: Dry Fruit Barfi representation */}
            <div 
              className="absolute z-20 -bottom-4 left-10 bg-white dark:bg-stone-900 p-2 rounded-xl shadow-lg border border-[#D4AF37]/40 flex items-center gap-1.5"
              style={{ animation: 'float 5s ease-in-out infinite 2s' }}
            >
              <span className="text-xs">🍬</span>
              <span className="text-[9px] font-bold text-stone-800 dark:text-cream-100">100% Traditional</span>
            </div>

            {/* Sparkle floats */}
            <span className="absolute top-12 right-12 text-[#D4AF37] text-xl animate-pulse">✦</span>
            <span className="absolute bottom-24 left-2 text-[#D4AF37] text-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>✦</span>
            <span className="absolute top-1/2 -right-2 text-[#800000] dark:text-[#D4AF37] text-lg animate-pulse" style={{ animationDelay: '3s' }}>✦</span>

          </div>

        </div>
      </div>

      {/* Embedded CSS for Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 4s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% {
            transform: translateY(-8px);
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }
      `}</style>

    </div>
  );
}
