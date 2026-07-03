import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'white' | 'gold' | 'horizontal';
}

export default function Logo({ className = '', size = 'md', variant = 'gold' }: LogoProps) {
  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  };

  const isHorizontal = variant === 'horizontal';

  // Traditional SVG Logo containing:
  // - Gold Kalash (pot) with coconut & mango leaves
  // - A delicate peacock feather extending gracefully
  // - Traditional floral borders & gold star/pearl decorations
  // - Cursive typography
  const renderSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClasses[size]} select-none transition-transform duration-300 hover:rotate-6`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rich Gold Gradient */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="30%" stopColor="#F6E866" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9e8524" />
        </linearGradient>
        
        {/* Peacock Feather Gradients */}
        <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A896" />
          <stop offset="50%" stopColor="#028090" />
          <stop offset="100%" stopColor="#023E8A" />
        </linearGradient>

        <radialGradient id="featherEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2C94C" />
          <stop offset="40%" stopColor="#27AE60" />
          <stop offset="70%" stopColor="#2F80ED" />
          <stop offset="100%" stopColor="#1D3557" />
        </radialGradient>

        {/* Maroon Backdrop */}
        <radialGradient id="maroonGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a30000" />
          <stop offset="100%" stopColor="#5c0000" />
        </radialGradient>
      </defs>

      {/* Royal Circular Outer Ring with teeth/pearls */}
      <circle cx="100" cy="100" r="94" stroke="url(#goldGrad)" strokeWidth="3" />
      <circle cx="100" cy="100" r="88" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="3 4" />
      
      {/* Background fill */}
      <circle
        cx="100"
        cy="100"
        r="86"
        fill={
          variant === 'dark' || variant === 'gold'
            ? 'url(#maroonGrad)'
            : variant === 'white'
            ? '#ffffff'
            : '#FFF8E7'
        }
        className="transition-colors duration-300"
      />

      {/* Floral Mandala Accents in Background */}
      <g opacity="0.15" stroke="url(#goldGrad)" strokeWidth="1">
        <path d="M 100,20 C 110,40 90,40 100,60 C 110,40 120,40 100,20 Z" fill="url(#goldGrad)" />
        <path d="M 100,180 C 110,160 90,160 100,140 C 110,160 120,160 100,180 Z" fill="url(#goldGrad)" />
        <path d="M 20,100 C 40,110 40,90 60,100 C 40,110 40,120 20,100 Z" fill="url(#goldGrad)" />
        <path d="M 180,100 C 160,110 160,90 140,100 C 160,110 160,120 180,100 Z" fill="url(#goldGrad)" />
        <circle cx="100" cy="100" r="45" strokeDasharray="4 4" />
      </g>

      {/* --- Main Traditional Icons --- */}
      {/* 1. Golden Kalash / Mithai Box representation */}
      <g transform="translate(100, 110) scale(0.9)">
        {/* Leaves (Mango Leaves) extending out of Kalash */}
        <path d="M -30,-22 C -35,-45 -10,-45 -5,-25 Z" fill="url(#goldGrad)" stroke="#7f6a1d" strokeWidth="0.5" />
        <path d="M 30,-22 C 35,-45 10,-45 5,-25 Z" fill="url(#goldGrad)" stroke="#7f6a1d" strokeWidth="0.5" />
        <path d="M 0,-30 C -15,-55 -2,-55 0,-25 Z" fill="url(#goldGrad)" stroke="#7f6a1d" strokeWidth="0.5" />
        <path d="M 0,-30 C 15,-55 2,-55 0,-25 Z" fill="url(#goldGrad)" stroke="#7f6a1d" strokeWidth="0.5" />

        {/* Coconut on Top */}
        <path d="M -16,-24 C -16,-42 16,-42 16,-24 Z" fill="#9e8524" stroke="url(#goldGrad)" strokeWidth="1" />
        <path d="M -16,-24 C -8,-28 8,-28 16,-24 C 8,-18 -8,-18 -16,-24 Z" fill="#7f6a1d" />

        {/* Kalash Pot Body */}
        <path
          d="M -22,-22 L 22,-22 C 25,-12 35,-5 35,15 C 35,35 22,45 0,45 C -22,45 -35,35 -35,15 C -35,-5 -25,-12 -22,-22 Z"
          fill="url(#goldGrad)"
          stroke="#7f6a1d"
          strokeWidth="1.5"
        />
        
        {/* Swastik / Shubh Symbol on Kalash */}
        <path
          d="M -10,12 L 10,12 M 0,2 L 0,22 M -10,2 L -10,12 L 0,12 M 0,2 L 10,2 L 10,12 M 0,22 L -10,22 M 10,12 L 10,22"
          stroke={variant === 'white' ? '#800000' : '#800000'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Neck Band decoration */}
        <rect x="-24" y="-20" width="48" height="6" rx="2" fill="#800000" stroke="url(#goldGrad)" strokeWidth="1" />
        <circle cx="0" cy="-17" r="1.5" fill="url(#goldGrad)" />
        <circle cx="-10" cy="-17" r="1.5" fill="url(#goldGrad)" />
        <circle cx="10" cy="-17" r="1.5" fill="url(#goldGrad)" />

        {/* Laddu sitting at the base of Kalash */}
        <g transform="translate(28, 30) scale(0.65)">
          <circle cx="0" cy="0" r="15" fill="url(#goldGrad)" stroke="#9e8524" strokeWidth="1" />
          <circle cx="-4" cy="-4" r="2" fill="#FFF8E7" opacity="0.6" />
          {/* Speckles of Cardamom/Melon Seeds */}
          <circle cx="2" cy="4" r="1.2" fill="#27AE60" />
          <circle cx="-5" cy="5" r="1" fill="#7f6a1d" />
          <circle cx="6" cy="-2" r="1" fill="#FFF8E7" />
        </g>
        
        {/* Kaju Katli sitting at the left base */}
        <g transform="translate(-28, 32) scale(0.6)">
          <path d="M 0,-15 L 18,0 L 0,15 L -18,0 Z" fill="#E0E0E0" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <path d="M -5,-5 L 5,5 M -5,5 L 5,-5" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        </g>
      </g>

      {/* 2. Peacock Feather rising from behind the Kalash */}
      <g transform="translate(132, 58) rotate(22) scale(0.75)">
        {/* Stem */}
        <path d="M 0,60 C -15,30 -18,0 -20,-20" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Feather body */}
        <path
          d="M -20,-20 C -40,-45 -10,-65 0,-65 C 10,-65 40,-45 20,-20 C 10,0 -5,30 0,60"
          fill="url(#featherGrad)"
          opacity="0.85"
        />
        
        {/* Peacock Eye center */}
        <ellipse cx="0" cy="-35" rx="14" ry="18" fill="url(#featherEye)" />
        <ellipse cx="0" cy="-32" rx="7" ry="10" fill="#03045E" />
        
        {/* Hair strokes */}
        <path d="M -20,-30 C -35,-20 -40,-10 -42,-5" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        <path d="M 20,-30 C 35,-20 40,-10 42,-5" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        <path d="M -25,-45 C -45,-40 -50,-30 -52,-20" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        <path d="M 25,-45 C 45,-40 50,-30 52,-20" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Decorative floral hanging beads (Toran) at the top */}
      <g stroke="url(#goldGrad)" strokeWidth="1" opacity="0.8">
        <path d="M 52,38 C 70,50 130,50 148,38" fill="none" strokeWidth="1.5" />
        <circle cx="68" cy="45" r="3" fill="#800000" />
        <circle cx="100" cy="48" r="4" fill="url(#goldGrad)" />
        <circle cx="132" cy="45" r="3" fill="#800000" />
        {/* Little hanging leaves */}
        <path d="M 100,48 L 100,58" strokeWidth="1.5" />
        <path d="M 68,45 L 68,52" />
        <path d="M 132,45 L 132,52" />
      </g>
    </svg>
  );

  if (isHorizontal) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderSVG()}
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-wider leading-none text-maroon-700 dark:text-gold-400">
            Gokul
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600 dark:text-cream-300">
            Mishthan Bhandar
          </span>
          <span className="text-[8px] italic text-neutral-500 dark:text-neutral-400 leading-tight">
            Pure Taste • Pure Tradition
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {renderSVG()}
      <div className="mt-1">
        <span className="block font-serif text-lg font-bold tracking-widest text-maroon-700 dark:text-gold-400">
          GOKUL
        </span>
        <span className="block font-sans text-[8px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-cream-300">
          Mishthan Bhandar
        </span>
      </div>
    </div>
  );
}
