import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Moon, Sun, Menu, X, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import { UserProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartToggle: () => void;
  onWishlistToggle: () => void;
  onLoginToggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onCartToggle,
  onWishlistToggle,
  onLoginToggle,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  currentUser,
  onLogout,
  showAdmin,
  setShowAdmin,
  scrollToSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Rotating marquee items
  const marqueeOffers = [
    "🚚 Free Shipping on Orders ₹1500 & Above",
    "🎉 Flat 10% OFF on First Order (Code: GOKUL10)",
    "🎁 Luxury Festival Gift Boxes Available",
    "💳 100% Secure Online Payments",
    "⭐ Trusted by Thousands of Happy Customers",
    "🍬 Fresh Sweets Prepared Daily",
    "🥇 Made with 100% Pure Desi Ghee",
    "❤️ Handcrafted with Traditional Recipes Since 1995",
    "🎊 Special Bulk Discounts for Weddings & Corporate Events",
    "🚀 Fast Dispatch Across India"
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setShowAdmin(false);
    scrollToSection(sectionId);
  };

  return (
    <header className="w-full z-50 sticky top-0 bg-[#FFF8E7] dark:bg-stone-950 shadow-sm border-b border-stone-200 dark:border-stone-850 transition-colors duration-300">
      
      {/* 1. TOP NOTIFICATION BAR (Animated Marquee) */}
      <div className="w-full bg-[#800000] text-[#D4AF37] py-2 border-b border-[#D4AF37]/30 overflow-hidden text-[10px] font-bold uppercase tracking-widest">
        <div className="relative w-full flex items-center">
          <div className="animate-marquee flex gap-16 items-center">
            {/* Double the list to make it seamless */}
            {marqueeOffers.map((offer, idx) => (
              <span key={`offer1-${idx}`} className="flex items-center gap-2 select-none tracking-wide whitespace-nowrap">
                {offer} <span className="text-[#D4AF37] opacity-50">•</span>
              </span>
            ))}
            {marqueeOffers.map((offer, idx) => (
              <span key={`offer2-${idx}`} className="flex items-center gap-2 select-none tracking-wide whitespace-nowrap">
                {offer} <span className="text-[#D4AF37] opacity-50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Area */}
          <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
            <Logo variant="horizontal" size="sm" />
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase font-semibold tracking-wider">
            <button
              onClick={() => handleNavClick('home')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('sweet-library')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Sweet Library
            </button>
            <button
              onClick={() => handleNavClick('festive')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Festival Collection
            </button>
            <button
              onClick={() => handleNavClick('gift-boxes')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Gift Boxes
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-stone-600 hover:text-[#800000] dark:text-stone-300 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Utilities Area */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 lg:flex-none justify-end">
            
            {/* Search Box */}
            <div className={`relative hidden sm:block w-48 xl:w-64 transition-all duration-300 ${searchFocused ? 'w-56 xl:w-72' : ''}`}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-stone-400 dark:text-stone-500" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search premium sweets..."
                className="w-full text-xs pl-9 pr-4 py-2 border border-stone-200 dark:border-stone-800 rounded-full bg-white dark:bg-stone-900 text-stone-900 dark:text-cream-100 placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-[#800000]/5 dark:hover:bg-stone-900 rounded-full transition-colors cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-[#D4AF37]" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Admin Quick Entry Indicator (if logged in as admin) */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className={`p-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  showAdmin 
                    ? 'bg-[#800000] text-[#D4AF37]' 
                    : 'bg-[#D4AF37] text-[#800000] hover:bg-[#D4AF37]/80'
                }`}
                title="Admin Dashboard"
              >
                <ShieldAlert className="h-5 w-5 animate-pulse" />
                <span className="text-xs font-bold hidden xl:inline">Admin Panel</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={onWishlistToggle}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-[#800000]/5 dark:hover:bg-stone-900 rounded-full transition-colors relative cursor-pointer"
              title="My Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#800000] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-[#800000]/5 dark:hover:bg-stone-900 rounded-full transition-colors relative cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#800000] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login Button */}
            <div className="relative">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onLoginToggle}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 rounded-full text-xs font-medium text-stone-850 dark:text-stone-200 transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#800000] text-[#D4AF37] flex items-center justify-center font-bold uppercase text-[10px]">
                      {currentUser.name[0]}
                    </div>
                    <span className="hidden md:inline max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="text-[10px] text-red-600 hover:underline cursor-pointer hidden md:block"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLoginToggle}
                  className="p-2 text-stone-600 dark:text-stone-300 hover:bg-[#800000]/5 dark:hover:bg-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Sign In"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FFF8E7] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-900 px-4 py-4 animate-fade-in">
          {/* Mobile Search Box */}
          <div className="relative mb-4 sm:hidden">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-stone-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search premium sweets..."
              className="w-full text-xs pl-9 pr-4 py-2 border border-stone-200 dark:border-stone-850 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-cream-100 placeholder-stone-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('sweet-library')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Sweet Library
            </button>
            <button
              onClick={() => handleNavClick('festive')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Festival Collection
            </button>
            <button
              onClick={() => handleNavClick('gift-boxes')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Gift Boxes
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded-md text-sm font-medium text-stone-700 hover:bg-[#800000]/5 dark:text-stone-300 dark:hover:bg-stone-900 transition-all cursor-pointer"
            >
              Contact
            </button>
            {currentUser && (
              <div className="border-t border-stone-200 dark:border-stone-850 pt-3 flex items-center justify-between px-3">
                <span className="text-xs text-stone-500">Logged in as {currentUser.name}</span>
                <button onClick={onLogout} className="text-xs text-red-600 font-semibold hover:underline cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
