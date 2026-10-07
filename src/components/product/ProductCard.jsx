import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Plus } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  const wishlisted = isInWishlist(product.id);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm border border-[#E8DDCC]/60 overflow-hidden transition-all duration-500 hover:shadow-[0_12px_36px_rgba(27,24,21,0.06)] hover:border-[#B79A6B]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="INSPECT"
    >
      {/* Media Box */}
      <div className="relative aspect-[3/4] bg-[#F6F1E8] overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.tag && (
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#1B1815] text-[9px] font-medium tracking-[0.2em] uppercase rounded-sm border border-[#E8DDCC]">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? 'bg-[#1B1815] text-[#B79A6B]'
              : 'bg-white/90 backdrop-blur-md text-[#1B1815] hover:text-[#B79A6B]'
          } shadow-sm border border-[#E8DDCC]/50`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-[#B79A6B]' : ''}`} />
        </button>

        {/* Product Images with Crossfade Swap */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Desktop Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-md text-[#1B1815] text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm hover:bg-[#B79A6B] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3 h-3" />
            <span>Quick Inspect</span>
          </button>
          <button
            onClick={() => addToCart(product, product.defaultMetal, product.defaultSize, 1)}
            className="p-2 bg-[#1B1815] text-white rounded-sm hover:bg-[#B79A6B] transition-colors"
            title="Quick add to bag"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 md:p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-medium tracking-[0.22em] text-[#8E806E] uppercase block mb-1">
            {product.categoryLabel}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif-luxury text-lg md:text-xl font-normal text-[#1B1815] hover:text-[#B79A6B] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#8E806E] font-light mt-1 line-clamp-1">
            {product.material}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DDCC]/50 flex items-center justify-between">
          <span className="font-serif-luxury text-base md:text-lg font-semibold text-[#1B1815]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => openQuickView(product)}
            className="text-[11px] font-medium tracking-[0.15em] text-[#B79A6B] hover:text-[#1B1815] uppercase transition-colors"
          >
            Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
