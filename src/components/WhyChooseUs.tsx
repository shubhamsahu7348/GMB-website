import React from 'react';
import { Leaf, Award, Compass, ShieldCheck, Flame, HeartHandshake, Smile, Gift } from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: <Leaf className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "100% Pure Ingredients",
      desc: "Selected farm-fresh dry fruits, organic sulfur-free raw sugars, and unadulterated high quality staples."
    },
    {
      icon: <Flame className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Fresh Daily Preparations",
      desc: "Cooked in massive clean iron cauldrons and molded hot every single day. Zero stale inventories."
    },
    {
      icon: <Award className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Traditional Recipes",
      desc: "Strictly prepared according to age-old royal manuscripts passed down through master generational Halwais."
    },
    {
      icon: <Gift className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Premium Packaging",
      desc: "Lined with food-grade high-quality foils and packed in rigid, gold-stamped royal drawer boxes."
    },
    {
      icon: <Compass className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Super-Fast Delivery",
      desc: "Dispatched under climate-controlled seals within 24 hours of baking across major cities."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "100% Secure Payments",
      desc: "Simulated end-to-end industry standard encryption keeping your payments and details safe."
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Trusted Since 1995",
      desc: "Celebrating 30+ glorious years of serving sweet traditional ecstasy to three generations."
    },
    {
      icon: <Smile className="h-6 w-6 text-[#800000] dark:text-[#D4AF37]" />,
      title: "Absolute Satisfaction",
      desc: "Got a concern? We will replace, refund, or customize your box with no questions asked."
    }
  ];

  return (
    <section className="py-16 bg-[#FFF8E7] dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#800000] dark:text-[#D4AF37] font-bold block">Our Pillars of Excellence</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-cream-100">
            Why Sweet lovers Choice <br className="hidden sm:inline" />
            <span className="text-[#800000] dark:text-[#D4AF37]">Gokul Mishthan Bhandar</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
            <span className="text-xs text-[#D4AF37]">Pristine Ghee Assortment</span>
            <span className="h-1 w-8 bg-[#800000] dark:bg-gold-500 rounded-full" />
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-stone-900 rounded-none border border-stone-200 dark:border-stone-800 transition-all duration-300 hover:shadow-lg hover:border-[#D4AF37]/40 flex flex-col space-y-3 group"
            >
              <div className="w-12 h-12 rounded-none bg-stone-50 dark:bg-stone-950 flex items-center justify-center border border-stone-200 dark:border-stone-850 shadow-xs group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              <h3 className="font-serif text-base font-bold text-stone-800 dark:text-cream-100 group-hover:text-[#800000] dark:group-hover:text-[#D4AF37] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
