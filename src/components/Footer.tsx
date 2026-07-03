import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, Send, MessageSquare, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  scrollToSection: (id: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

export default function Footer({ scrollToSection, onCategoryClick }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Scroll detection for "Back to Top"
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="contact" className="relative bg-stone-950 text-stone-300 pt-16 pb-8 transition-colors duration-300 border-t border-stone-850">
      
      {/* 1. NEWSLETTER BAR (Luxury overlay at the top of footer) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#800000] to-[#500000] rounded-none p-8 sm:p-12 border border-[#D4AF37]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Floral mandala backdrop */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50%" cy="50%" r="200" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>

          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#D4AF37]">
              Get Exclusive Offers & Festival Discounts
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed font-normal">
              Subscribe to the Gokul Newsletter list. Get early access to festive booking launches, limited luxury boxes, and sweet custom recipes.
            </p>
          </div>

          <div className="w-full lg:w-auto relative z-10">
            {subscribed ? (
              <div className="bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] px-6 py-3.5 rounded-none text-xs font-bold text-center animate-pulse">
                🎉 Congratulations! Flat 10% Coupon code is sent to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-5 py-3.5 text-xs text-stone-950 placeholder-stone-500 bg-white rounded-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] flex-1 min-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#800000] font-bold rounded-none transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 whitespace-nowrap uppercase tracking-wider"
                >
                  <span>Subscribe Now</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-stone-850 pb-12 mb-12">
        
        {/* Col 1: Brand details */}
        <div className="space-y-6">
          <div className="flex items-start">
            <Logo variant="horizontal" size="sm" className="scale-95 origin-left" />
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-normal">
            Bringing sweetness and pure Desi Ghee tradition to every home since 1995. Crafted with ancient manuscripts, premium organic raw materials, and infinite love.
          </p>
          
          {/* Social Icons */}
          <div className="space-y-2">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-[#D4AF37]">Connect With Us</h4>
            <div className="flex items-center gap-3">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-none bg-stone-900 hover:bg-[#800000] hover:text-[#D4AF37] flex items-center justify-center text-xs text-stone-450 transition-all font-bold"
                  title={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Quick Navigation & Categories */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Home', 'About', 'Sweet Library', 'Festive', 'Blog'].map((item) => {
                const sectionMap: any = {
                  'Home': 'home',
                  'About': 'about',
                  'Sweet Library': 'sweet-library',
                  'Festive': 'festive',
                  'Blog': 'blog'
                };
                return (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(sectionMap[item])}
                      className="hover:text-[#D4AF37] cursor-pointer transition-colors text-left"
                    >
                      {item === 'About' ? 'About Us' : item === 'Festive' ? 'Festival Collection' : item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37]">Categories</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {[
                { name: 'Kaju Specials', id: 'kaju-specials' },
                { name: 'Milk Sweets', id: 'milk-sweets' },
                { name: 'Dry Fruits', id: 'dry-fruit' },
                { name: 'Desi Cookies', id: 'cookies' },
                { name: 'Gift Boxes', id: 'gift-boxes' }
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategoryClick(cat.id)}
                    className="hover:text-[#D4AF37] cursor-pointer transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 3: Business details & Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-serif font-bold text-[#D4AF37]">Contact Info</h4>
          <ul className="space-y-3 text-xs text-stone-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>Gokul Bhawan, Sector-3, Main Mandir Road, Jaipur, Rajasthan - 302001</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
              <span>contact@gokulsweets.com</span>
            </li>
            <li className="flex items-start gap-2.5 pt-1 border-t border-stone-850">
              <Clock className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-300 font-semibold">Store Business Hours</strong>
                <span>Mon - Sun: 08:00 AM - 10:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4: Store Locator Mock Map */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-[#D4AF37]">Store Locator</h4>
          <p className="text-[11px] text-stone-400">Visit our flagship grand boutique sweet shop:</p>
          
          {/* Mock Interactive Map Box */}
          <div className="relative h-32 rounded-none overflow-hidden border border-stone-800 bg-stone-950 flex flex-col justify-end group">
            {/* Grid Map Artwork */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#1a1a1a" />
                <path d="M0,20 H200 M0,60 H200 M0,100 H200 M40,0 V150 M100,0 V150 M160,0 V150" stroke="#FFF" strokeWidth="1" />
                {/* Diagonal river */}
                <path d="M-10,120 Q50,40 210,50" fill="none" stroke="#2D68C4" strokeWidth="5" />
                {/* Secondary diagonal street */}
                <path d="M50,-10 L180,140" fill="none" stroke="#999" strokeWidth="3" />
              </svg>
            </div>

            {/* Glowing Map Pin Locator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <span className="absolute -inset-2.5 bg-[#800000] rounded-full animate-ping opacity-60" />
                <MapPin className="h-6 w-6 text-[#D4AF37] relative z-10 fill-[#800000]" />
              </div>
            </div>

            {/* Address Overlay Card */}
            <div className="bg-stone-900/95 backdrop-blur-xs p-2 text-[10px] flex items-center justify-between border-t border-stone-800 z-10">
              <div className="leading-tight truncate">
                <span className="font-bold text-[#D4AF37] block">Flagship Jaipur</span>
                <span className="text-stone-450">Mandir Road, Jaipur</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#800000] font-bold p-1 rounded-none transition-colors flex items-center justify-center"
                title="Get Directions"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BUSINESS INTEL & COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-stone-500 space-y-2">
        <p>© 2026 Gokul Mishthan Bhandar Confectionery. All Rights Reserved.</p>
        <p className="text-[10px] text-stone-600">
          Handcrafted Traditional Sweets • Certified Organic Mawa • Pure Clarified Butter (Desi Ghee) • Jaipur, Rajasthan
        </p>
      </div>

      {/* --- FLOATING CONTROLS (Floating WhatsApp, Floating Call, Back To Top) --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end">
        
        {/* Floating Call Button */}
        <a
          href="tel:+919876543210"
          className="w-12 h-12 bg-[#800000] hover:bg-[#990000] text-white rounded-none shadow-lg flex items-center justify-center transition-all transform hover:scale-110 hover:-rotate-12 active:scale-90"
          title="Call Sweet Boutique"
        >
          <Phone className="h-5 w-5 fill-[#D4AF37]/20 text-[#D4AF37]" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Gokul%20Sweets%20festive%20gift%20boxes."
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-none shadow-lg flex items-center justify-center transition-all transform hover:scale-110 hover:rotate-12 active:scale-90"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="h-5 w-5 fill-white/10 text-[#D4AF37]" />
        </a>

        {/* Back to Top button */}
        {showScrollTop && (
          <button
            onClick={handleScrollTop}
            className="w-10 h-10 bg-stone-900 hover:bg-stone-850 text-[#D4AF37] rounded-none shadow-md border border-stone-800 flex items-center justify-center transition-all transform hover:translate-y-[-4px] active:scale-90 cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        )}

      </div>

    </footer>
  );
}
