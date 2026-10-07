import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const hits = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
    setResults(hits);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] bg-[#FAF7F2] flex flex-col p-6 md:p-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between pb-8 border-b border-[#E8DDCC]">
            <span className="font-serif-luxury text-xl tracking-[0.24em] font-normal uppercase text-[#1B1815]">
              AUREVÉ SEARCH
            </span>
            <button
              onClick={onClose}
              aria-label="Close search"
              className="w-10 h-10 rounded-full border border-[#E8DDCC] flex items-center justify-center text-[#1B1815] hover:bg-[#1B1815] hover:text-[#FAF7F2] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="max-w-[900px] w-full mx-auto mt-12 mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH THE COLLECTION..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-b-2 border-[#1B1815] pb-4 font-serif-luxury text-3xl md:text-5xl text-[#1B1815] placeholder:text-[#8E806E]/40 outline-none uppercase tracking-wide"
              />
              <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#8E806E]/60 stroke-[1.25]" />
            </div>

            {/* Suggested Tags */}
            <div className="flex items-center gap-3 mt-6 flex-wrap text-xs text-[#8E806E]">
              <span className="uppercase tracking-widest text-[10px]">Curated Searches:</span>
              {['Solitaire Rings', '18K Gold', 'Tennis Bracelet', 'Baguette Diamonds', 'Emerald Drops'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-white border border-[#E8DDCC] rounded-full hover:border-[#B79A6B] hover:text-[#1B1815] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="max-w-[1200px] w-full mx-auto flex-1">
            {query.trim() && results.length === 0 ? (
              <div className="text-center py-12 text-[#8E806E]">
                <p className="font-serif-luxury text-2xl text-[#1B1815] mb-2">No creations found</p>
                <p className="text-xs">Try searching for 'Ring', 'Pendant', 'Gold', or 'Diamond'.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {results.map(prod => (
                  <Link
                    key={prod.id}
                    to={`/product/${prod.id}`}
                    onClick={onClose}
                    className="group bg-white rounded-sm border border-[#E8DDCC] p-3 flex flex-col hover:border-[#B79A6B] transition-colors"
                  >
                    <div className="aspect-square bg-[#F6F1E8] rounded-sm overflow-hidden mb-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[9px] text-[#8E806E] tracking-widest uppercase">{prod.categoryLabel}</span>
                    <h4 className="font-serif-luxury text-base text-[#1B1815] group-hover:text-[#B79A6B] transition-colors">{prod.name}</h4>
                    <span className="text-xs font-semibold text-[#1B1815] mt-1">₹{prod.price.toLocaleString('en-IN')}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
