import React from 'react';

export default function CategoryCircles({ selectedCategory, onSelectCategory }) {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      items: '120+ Items',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      items: '180+ Items',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      items: '200+ Items',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'furniture',
      name: 'Furniture',
      items: '85+ Items',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'fitness',
      name: 'Fitness',
      items: '95+ Items',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'beauty',
      name: 'Beauty',
      items: '65+ Items',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'watches',
      name: 'Watches',
      items: '70+ Items',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'bags',
      name: 'Bags',
      items: '80+ Items',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      items: '110+ Items',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&auto=format&fit=crop&q=80'
    }
  ];

  const handleCategoryClick = (catId) => {
    // If clicked again, toggle to ALL, otherwise set category
    const isCurrentlyActive = (selectedCategory || '').toLowerCase() === catId.toLowerCase();
    const nextCategory = isCurrentlyActive ? 'ALL' : catId;
    if (onSelectCategory) {
      onSelectCategory(nextCategory);
    }
    
    // Smooth scroll directly to the products section so user sees the change immediately
    setTimeout(() => {
      const el = document.getElementById('trending-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShowAll = () => {
    if (onSelectCategory) {
      onSelectCategory('ALL');
    }
    setTimeout(() => {
      const el = document.getElementById('trending-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-sans">
            Shop by Categories
          </h2>
          <p className="text-xs text-neutral-500">
            Explore diverse collections: Electronics, Hoodies, Sneakers, Furniture, Fitness, Beauty &amp; more
          </p>
        </div>
        
        <button
          onClick={handleShowAll}
          className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
        >
          {(selectedCategory || 'ALL').toUpperCase() !== 'ALL' ? 'Reset to All Categories' : 'Show All (9 Categories)'}
        </button>
      </div>

      {/* Circular Grid Container */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 justify-items-center">
        {categories.map((cat) => {
          const isSelected = (selectedCategory || '').toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center group text-center focus:outline-none w-full cursor-pointer transition"
            >
              {/* Circle Image Wrapper */}
              <div className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 transition duration-300 ${
                isSelected 
                  ? 'ring-4 ring-amber-500 ring-offset-2 scale-110 shadow-lg' 
                  : 'group-hover:scale-105 group-hover:shadow-md'
              }`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-[#ECE6DE] flex items-center justify-center shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              </div>

              {/* Title & Item count */}
              <h3 className={`mt-2 text-xs font-bold tracking-tight transition ${
                isSelected ? 'text-amber-600 font-black' : 'text-neutral-800 group-hover:text-amber-600'
              }`}>
                {cat.name}
              </h3>
              <span className="text-[10px] text-neutral-400 font-normal">
                {cat.items}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
