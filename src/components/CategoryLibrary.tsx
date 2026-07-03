import React from 'react';
import { CATEGORIES } from '../data/products';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryLibraryProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryLibrary({ selectedCategory, onSelectCategory }: CategoryLibraryProps) {
  
  // Helper to render Lucide Icons dynamically from name string
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Candy;
    return <IconComponent className="h-6 w-6 text-[#800000] dark:text-[#D4AF37] group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-300" />;
  };

  return (
    <section id="sweet-library" className="py-16 bg-white dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-cream-100">
            Explore Our <span className="text-[#800000] dark:text-[#D4AF37]">Sweet Library</span>
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Select a dedicated category to discover ancient recipes, artisanal ingredients, and delicious hand-rolled assortments prepared daily.
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
            <span className="text-xs text-[#D4AF37]">Pure Taste • Pure Tradition</span>
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          
          {/* "All Categories" Card */}
          <div
            onClick={() => onSelectCategory(null)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 border ${
              selectedCategory === null
                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-xl scale-[1.02] bg-[#FFF8E7] dark:bg-stone-950'
                : 'border-stone-200 dark:border-stone-850 hover:bg-[#800000] bg-white dark:bg-stone-950'
            }`}
          >
            {/* Background Cover */}
            <div className="h-28 overflow-hidden relative">
              <div className="absolute inset-0 bg-[#800000]/60 z-10" />
              <img
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80"
                alt="All Sweets"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-2 z-20 px-3 flex items-center justify-between">
                <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">All Sweets</span>
              </div>
            </div>

            {/* Bottom details */}
            <div className="p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 flex items-center justify-center border border-[#D4AF37]/20 mb-2 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                <Icons.Grid className="h-5 w-5 text-[#800000] dark:text-[#D4AF37] group-hover:text-[#D4AF37]" />
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 group-hover:text-stone-200 line-clamp-2 transition-colors">
                Browse our entire collection of handcrafted pure ghee delicacies.
              </p>
            </div>
          </div>

          {/* Individual Category Cards */}
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-xl scale-[1.02] bg-[#FFF8E7] dark:bg-stone-950'
                    : 'border-stone-200 dark:border-stone-850 hover:bg-[#800000] bg-white dark:bg-stone-950'
                }`}
              >
                {/* Image Section */}
                <div className="h-28 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent z-10 group-hover:from-stone-950/90 transition-colors" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Title Overlay */}
                  <div className="absolute inset-x-0 bottom-2 z-20 px-3 flex items-center justify-between">
                    <span className="text-white text-xs font-bold tracking-wide group-hover:text-[#D4AF37] transition-colors">
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Info / Description Section */}
                <div className="p-3.5 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-900 flex items-center justify-center border border-[#D4AF37]/20 mb-2 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    {renderIcon(category.iconName)}
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-normal line-clamp-2 group-hover:text-stone-200 transition-colors">
                    {category.description}
                  </p>
                </div>

                {/* Golden Animated Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/30 rounded-2xl pointer-events-none transition-colors duration-300" />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
