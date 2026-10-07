import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialFilter);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [priceMax, setPriceMax] = useState(35000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new' && !p.isNew) return false;
        if (selectedCategory !== 'new' && p.category !== selectedCategory) return false;
      }
      // Price
      if (p.price > priceMax) return false;
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [selectedCategory, selectedSort, priceMax]);

  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="text-center py-12 border-b border-[#E8DDCC] space-y-2 mb-10">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            HAUTE HORLOGERIE & JOAILLERIE
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1815]">
            Shop AUREVÉ
          </h1>
          <p className="text-xs text-[#8E806E] font-light max-w-md mx-auto">
            Discover sculptural 18K solid gold, conflict-free GIA brilliants, and timeless modern heirlooms.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-6 mb-6 border-b border-[#E8DDCC]">
          <span className="text-xs text-[#8E806E] font-medium">
            Showing {filteredProducts.length} Creations
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DDCC] rounded-full text-xs font-medium uppercase tracking-wider text-[#1B1815]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters & Sort</span>
          </button>
        </div>

        {/* Main Layout: Sticky Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Desktop Sticky Filters Sidebar */}
          <aside className={`lg:col-span-3 space-y-8 bg-white lg:bg-transparent p-6 lg:p-0 rounded-sm border border-[#E8DDCC] lg:border-none shadow-sm lg:shadow-none ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          } sticky top-28`}>
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                Categories
              </h3>
              <div className="flex flex-col space-y-1.5 text-xs text-[#8E806E]">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left py-1 hover:text-[#1B1815] transition-colors ${selectedCategory === 'all' ? 'text-[#1B1815] font-semibold' : ''}`}
                >
                  All Creations ({PRODUCTS.length})
                </button>
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                  const count = PRODUCTS.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left py-1 hover:text-[#1B1815] transition-colors ${selectedCategory === cat.id ? 'text-[#1B1815] font-semibold' : ''}`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                Max Price: ₹{priceMax.toLocaleString('en-IN')}
              </h3>
              <input
                type="range"
                min="14000"
                max="35000"
                step="1000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#B79A6B]"
              />
              <div className="flex justify-between text-[10px] text-[#8E806E]">
                <span>₹14,000</span>
                <span>₹35,000</span>
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-3">
              <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                Sort By
              </h3>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#E8DDCC] rounded-sm text-xs text-[#1B1815] outline-none"
              >
                <option value="featured">Featured Atelier Pieces</option>
                <option value="newest">Newest Additions</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceMax(35000);
                setSelectedSort('featured');
              }}
              className="w-full py-2.5 text-xs text-[#8E806E] border border-[#E8DDCC] rounded-sm hover:border-[#1B1815] hover:text-[#1B1815] uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            <div className="hidden lg:flex items-center justify-between text-xs text-[#8E806E]">
              <span>Showing {filteredProducts.length} curated creations</span>
              <span className="text-[10px] tracking-widest uppercase">Place Vendôme Standard</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-sm border border-[#E8DDCC] space-y-3">
                <h3 className="font-serif-luxury text-2xl text-[#1B1815]">No pieces match your criteria</h3>
                <p className="text-xs text-[#8E806E]">Try adjusting the maximum price or selecting another category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
