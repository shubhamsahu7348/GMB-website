import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 8000);
    return () => clearInterval(interval);
  }, []);

  const activeReview = TESTIMONIALS[activeIndex];

  return (
    <section className="py-16 bg-white dark:bg-stone-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Decorative Quote Background */}
        <div className="absolute top-0 left-12 text-[#800000]/5 dark:text-[#D4AF37]/5 pointer-events-none select-none">
          <Quote className="h-44 w-44" />
        </div>

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#800000] dark:text-[#D4AF37] font-bold block">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-cream-100">
            Loved by Thousands of <span className="text-[#800000] dark:text-[#D4AF37]">Sweet Enthusiasts</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
            <span className="text-xs text-[#D4AF37]">Pure Ghee Stories</span>
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
          </div>
        </div>

        {/* Testimonial Active Display Card */}
        <div className="relative bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-200 dark:border-stone-850 p-8 sm:p-12 shadow-sm transition-all duration-300 hover:shadow-lg">
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
            
            {/* Customer Photo */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#800000] to-[#D4AF37] -m-1 animate-spin" style={{ animationDuration: '10s' }} />
                <img
                  src={activeReview.image}
                  alt={activeReview.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-stone-100 dark:border-stone-950 relative z-10"
                />
                <span className="absolute bottom-0 right-1 bg-[#D4AF37] text-[#800000] rounded-full p-1.5 text-xs shadow-md z-20 font-bold">
                  ✓
                </span>
              </div>
            </div>

            {/* Testimonial Quote Content */}
            <div className="flex-1 space-y-4">
              
              {/* Rating Star Row */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4.5 w-4.5 fill-[#D4AF37] text-[#D4AF37] ${i < activeReview.rating ? '' : 'opacity-30'}`} />
                ))}
                <span className="text-xs font-bold text-stone-500 ml-2">5.0 Rating</span>
              </div>

              {/* Review Text */}
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-stone-850 dark:text-[#FFF8E7] leading-relaxed font-medium">
                "{activeReview.comment}"
              </p>

              {/* Name and Location details */}
              <div>
                <h4 className="text-sm font-bold text-[#800000] dark:text-[#D4AF37]">
                  {activeReview.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                  <span>{activeReview.location}</span>
                  <span>•</span>
                  <span>Verified Buyer</span>
                  <span>•</span>
                  <span>{activeReview.date}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Carousel Manual Controls */}
          <div className="absolute right-6 bottom-6 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 border border-stone-200 hover:border-[#800000] dark:border-stone-800 dark:hover:border-[#D4AF37] hover:bg-white dark:hover:bg-stone-900 text-stone-600 dark:text-stone-300 rounded-none transition-colors active:scale-95 cursor-pointer"
              title="Previous Review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 rounded-none transition-colors active:scale-95 cursor-pointer"
              title="Next Review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-[#800000] dark:bg-[#D4AF37]' : 'w-2 bg-stone-300 dark:bg-stone-800'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
