import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function StorySection({ onExploreClick }) {
  return (
    <section id="studio-story" className="bg-forme-cream py-16 sm:py-24 px-6 relative border-t border-forme-border/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Split Grid matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Philosophy quote & "OUR STORY" button */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-l-2 border-forme-terracotta pl-6 py-2">
              <p className="font-serif text-xl sm:text-2xl text-neutral-800 leading-snug font-normal">
                We explore bold materials, clean shapes and practical details for modern routines.
              </p>
            </div>

            <div>
              <button
                onClick={onExploreClick}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-forme-terracotta hover:bg-forme-terracotta-hover text-white text-xs uppercase tracking-widest font-medium transition shadow-sm hover:shadow active:scale-95"
              >
                <span>Our Story</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: 4-tile Editorial Collage matching screenshot */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* Tile 1: Fluid Chrome Knot Sculpture */}
            <div className="col-span-1 sm:col-span-1 rounded-2xl overflow-hidden shadow-md bg-stone-100 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
                alt="Architectural Chrome Sculpture"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Tile 2: Editorial Model with metallic bag */}
            <div className="col-span-1 sm:col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-md bg-stone-100 h-full group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
                alt="Model with FORME Bag"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Tile 3: Sculptural Arch Curve */}
            <div className="col-span-1 sm:col-span-1 rounded-2xl overflow-hidden shadow-md bg-stone-100 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
                alt="Sculptural Architectural Arch"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Tile 4: Still Life Marble & Chrome Sphere */}
            <div className="col-span-1 sm:col-span-1 rounded-2xl overflow-hidden shadow-md bg-stone-100 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80"
                alt="Studio Materials and Sphere"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Tile 5: Leather Piping Detail */}
            <div className="col-span-1 sm:col-span-1 rounded-2xl overflow-hidden shadow-md bg-stone-100 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"
                alt="Leather Craftsmanship Stitching"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

          </div>

        </div>

        {/* Huge FORME Typography Watermark matching screenshot */}
        <div className="mt-16 sm:mt-24 select-none">
          <h2 className="font-serif font-bold text-[18vw] leading-[0.78] tracking-widest text-forme-navy text-center uppercase">
            FORME
          </h2>
        </div>

        {/* Explore collections with down arrow link matching screenshot */}
        <div className="mt-8 flex items-center justify-between border-t border-forme-border/60 pt-6">
          <span className="font-serif text-xl sm:text-2xl text-neutral-800 tracking-tight">
            Explore collections
          </span>
          <button 
            onClick={onExploreClick}
            className="w-10 h-10 rounded-full border border-neutral-400 text-neutral-700 flex items-center justify-center hover:bg-forme-navy hover:text-white transition active:scale-95"
            aria-label="Scroll to collections"
          >
            <ArrowDown size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
