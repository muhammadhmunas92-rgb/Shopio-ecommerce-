import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoCards({ onSelectPromoCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Card 1: Summer Sale Up to 50% Off (matching screenshot) */}
        <div className="relative rounded-[2rem] bg-[#ECE5DA] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[300px] border border-neutral-200/60 shadow-xs group">
          <div className="z-10 max-w-[240px] sm:max-w-xs space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              SUMMER SALE
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Up to 50% Off
            </h3>
            <p className="text-xs text-neutral-600 font-normal">
              On selected items
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectPromoCategory('sale')}
                className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition active:scale-95 shadow-sm cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Bag Image Placement */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"
              alt="Caramel Summer Sale Bag"
              className="w-full h-[220px] object-contain drop-shadow-xl group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Card 2: New Arrivals Discover The Latest Trends (matching screenshot) */}
        <div className="relative rounded-[2rem] bg-[#EAE2D5] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[300px] border border-neutral-200/60 shadow-xs group">
          <div className="z-10 max-w-[240px] sm:max-w-xs space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              NEW ARRIVALS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Discover The Latest Trends
            </h3>
            <div className="pt-4">
              <button
                onClick={() => onSelectPromoCategory('accessories')}
                className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition active:scale-95 shadow-sm"
              >
                Explore Now
              </button>
            </div>
          </div>

          {/* Sunglasses Image Placement */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80"
              alt="Tortoise Sunglasses"
              className="w-full h-[200px] object-contain drop-shadow-xl group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
