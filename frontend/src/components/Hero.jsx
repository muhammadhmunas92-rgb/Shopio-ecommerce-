import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onDiscoverClick, onHeroProductClick }) {
  return (
    <section className="relative overflow-hidden bg-forme-cream pt-6 pb-16 md:pt-10 md:pb-24 border-b border-forme-border/60">
      
      {/* Massive Background Typography "YOUR NEW ICON" */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="w-full select-none pointer-events-none text-center">
          <h1 className="font-condensed font-bold text-[15vw] leading-[0.82] tracking-tighter text-forme-navy uppercase">
            YOUR NEW ICON
          </h1>
        </div>

        {/* Center Sculptural Bag Showcase with Chrome Art Accent */}
        <div className="relative -mt-[11vw] sm:-mt-[12vw] md:-mt-[14vw] flex justify-center items-center z-10">
          <div className="relative w-full max-w-[580px] group cursor-pointer" onClick={onHeroProductClick}>
            
            {/* Ambient shadow glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forme-sand/30 to-forme-sand/60 rounded-full blur-2xl transform scale-90 -z-10"></div>
            
            {/* Hero Bag composite image */}
            <div className="relative overflow-hidden rounded-3xl p-4 transition duration-500 transform group-hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=85"
                alt="FORME Aura 310 Sculptural Bag"
                className="w-full h-[360px] sm:h-[460px] md:h-[540px] object-contain drop-shadow-2xl mx-auto"
              />
              
              {/* Subtle hover badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium text-neutral-800 shadow-md">
                View Aura 310 Icon
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Split Columns matching reference image */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20 relative">
          
          {/* Left: Our studio / Designed with purpose */}
          <div className="space-y-1 max-w-sm">
            <span className="text-xs uppercase tracking-widest text-forme-terracotta font-semibold">
              Our studio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forme-navy font-normal leading-tight">
              Designed with purpose
            </h2>
          </div>

          {/* Right: Description & DISCOVER MORE button */}
          <div className="flex flex-col sm:flex-row sm:items-center md:items-end gap-6 md:gap-8 max-w-md">
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              Sculptural bags combining playful form with everyday function.
            </p>
            <button
              onClick={onDiscoverClick}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-forme-terracotta hover:bg-forme-terracotta-hover text-white text-xs uppercase tracking-widest font-medium transition shadow-sm hover:shadow active:scale-95 shrink-0"
            >
              <span>Discover More</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
