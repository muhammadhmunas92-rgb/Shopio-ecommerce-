import React from 'react';
import { ArrowRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

export default function ShopioHero({ onShopNowClick, onViewCollectionClick }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      
      {/* Rounded Hero Banner Container matching screenshot */}
      <div className="relative rounded-[2.5rem] bg-[#ECE5DA] overflow-hidden shadow-sm border border-neutral-200/60 min-h-[480px] sm:min-h-[540px] flex flex-col justify-between p-8 sm:p-14">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            
            {/* Pill Tag */}
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/70 backdrop-blur text-neutral-800 shadow-xs border border-white/80">
              NEW COLLECTION 2024
            </span>

            {/* Main Headline matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08] font-sans">
              Elevate Your Everyday Style
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-md">
              Discover premium quality products crafted for comfort, style and performance.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={onShopNowClick}
                className="px-7 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition shadow-md hover:shadow-lg active:scale-95"
              >
                Shop Now
              </button>
              <button
                onClick={onViewCollectionClick}
                className="px-7 py-3.5 rounded-full bg-white/60 hover:bg-white text-neutral-800 text-xs font-semibold uppercase tracking-wider border border-neutral-300/80 transition active:scale-95"
              >
                View Collection
              </button>
            </div>

          </div>

          {/* Right Hero Image Column with Couple Lifestyle Shot */}
          <div className="lg:col-span-6 relative flex justify-end items-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1000&auto=format&fit=crop&q=85"
                alt="Shopio Everyday Style Collection"
                className="w-full h-[360px] sm:h-[460px] object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>

        </div>

        {/* Floating 3-Trust Badges Pill Container matching screenshot */}
        <div className="mt-8 z-20 max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-full p-3 sm:px-6 border border-white/80 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 text-neutral-800">
            
            {/* Feature 1 */}
            <div className="flex items-center space-x-3 sm:pr-4 sm:border-r border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Free Shipping</h4>
                <p className="text-[10px] text-neutral-500">On all orders over $50</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center space-x-3 sm:px-4 sm:border-r border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RefreshCw size={15} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Easy Returns</h4>
                <p className="text-[10px] text-neutral-500">30 days return policy</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center space-x-3 sm:pl-4">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Secure Payment</h4>
                <p className="text-[10px] text-neutral-500">100% secure checkout</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
