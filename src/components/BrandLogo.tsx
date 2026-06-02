import React from "react";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({ className = "h-8", showText = true }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="aim_brand_logo_container">
      {/* Target & Compass inspired high-fidelity SVG with Cyber Purple styling */}
      <div className="relative w-9 h-9 flex items-center justify-center" id="aim_logo_graphic">
        {/* Glow backdrop - Pink/Purple pulse */}
        <div className="absolute inset-0 bg-[#A855F7]/30 rounded-full blur-md animate-pulse"></div>
        
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white transform hover:rotate-45 transition-transform duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target outer crosshair markers */}
          <circle cx="50" cy="50" r="42" stroke="#25143a" strokeWidth="4" />
          <circle cx="50" cy="50" r="42" stroke="#4c1d95" strokeWidth="2" strokeDasharray="8 8" />
          
          {/* Accent outer ring segments (glowing magenta/purple compass markings) */}
          <path d="M 50 2 A 48 48 0 0 1 98 50" stroke="#D946EF" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 98 A 48 48 0 0 1 2 50" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />

          {/* Crosshair compass tick marks */}
          <line x1="50" y1="2" x2="50" y2="12" stroke="#c084fc" strokeWidth="5" />
          <line x1="50" y1="88" x2="50" y2="98" stroke="#D946EF" strokeWidth="5" />
          <line x1="2" y1="50" x2="12" y2="50" stroke="#8b5cf6" strokeWidth="5" />
          
          {/* Connected neural nodes at the top right quadrant */}
          <circle cx="80" cy="22" r="4" fill="#f472b6" />
          <line x1="72" y1="30" x2="80" y2="22" stroke="#f472b6" strokeWidth="2" />
          <circle cx="70" cy="32" r="3" fill="#A855F7" />
          <circle cx="88" cy="32" r="3" fill="#D946EF" />
          <line x1="80" y1="22" x2="88" y2="32" stroke="#D946EF" strokeWidth="2" />

          {/* Core Custom Letter "A" intersecting with Red/Pink Compass needle indicator */}
          <path
            d="M 32 68 L 47 30 L 62 68"
            stroke="#25143a"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 68 L 47 30 L 62 68"
            stroke="#6366f1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Compass needle inside the 'A' cross */}
          <path
            d="M 47 30 L 58 56 L 47 50 L 36 56 Z"
            fill="#D946EF"
            stroke="#D946EF"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none justify-center -space-y-1" id="aim_logo_text_block">
          <span className="text-lg font-display font-extrabold tracking-tight text-white uppercase bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
            AimNexora
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#D946EF] font-bold uppercase">
            Marketing Suite
          </span>
        </div>
      )}
    </div>
  );
}
