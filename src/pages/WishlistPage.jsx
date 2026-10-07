import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-xl mx-auto py-12 border-b border-[#E8DDCC] space-y-2 mb-12">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            PRIVATE ARCHIVE
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#1B1815]">
            Your Saved Jewels
          </h1>
          <p className="text-xs text-[#8E806E] font-light">
            Pieces reserved for your consideration. Move directly to your curated bag or schedule a salon inspection.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-sm border border-[#E8DDCC] max-w-lg mx-auto p-12 space-y-4">
            <div className="w-14 h-14 rounded-full border border-dashed border-[#B79A6B] flex items-center justify-center text-[#B79A6B] mx-auto">
              <Heart className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#1B1815]">No saved jewels yet</h3>
            <p className="text-xs text-[#8E806E] leading-relaxed">
              Click the heart icon on any creation to save it to your private portfolio.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {savedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
