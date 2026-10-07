import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = () => {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedMetal(product.defaultMetal || product.metals[0]);
      setSelectedSize(product.defaultSize || product.sizes[0]);
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    closeQuickView();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
          onClick={closeQuickView}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-full max-w-4xl bg-[#FAF7F2] rounded-t-xl sm:rounded-sm overflow-hidden shadow-2xl border border-[#E8DDCC] max-h-[90vh] flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DDCC] flex items-center justify-center text-[#1B1815] hover:bg-[#1B1815] hover:text-white transition-colors"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Left: Gallery Column */}
            <div className="w-full md:w-1/2 bg-[#F6F1E8] p-6 md:p-8 flex flex-col justify-between">
              <div className="aspect-square rounded-sm overflow-hidden bg-white shadow-sm border border-[#E8DDCC]">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-14 h-14 rounded-sm overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx ? 'border-[#B79A6B]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Controls */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#8E806E] uppercase font-medium">
                  {product.categoryLabel} • {product.carat}
                </span>
                <h2 className="font-serif-luxury text-2xl md:text-3xl font-normal text-[#1B1815] mt-1 mb-2">
                  {product.name}
                </h2>
                <div className="text-xl font-serif-luxury font-semibold text-[#1B1815] mb-4">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-[#8E806E] leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Metal Finish Option */}
                {product.metals && (
                  <div className="mb-5">
                    <label className="text-[11px] tracking-wider text-[#1B1815] uppercase font-medium block mb-2">
                      Finish: <span className="text-[#8E806E] font-normal">{selectedMetal}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.metals.map((metal) => (
                        <button
                          key={metal}
                          onClick={() => setSelectedMetal(metal)}
                          className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                            selectedMetal === metal
                              ? 'border-[#1B1815] bg-[#1B1815] text-[#FAF7F2]'
                              : 'border-[#E8DDCC] bg-white text-[#1B1815] hover:border-[#B79A6B]'
                          }`}
                        >
                          {metal}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Circular Size Selector */}
                {product.sizes && (
                  <div className="mb-6">
                    <label className="text-[11px] tracking-wider text-[#1B1815] uppercase font-medium block mb-2">
                      Select Size: <span className="text-[#8E806E] font-normal">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border transition-all ${
                            selectedSize === sz
                              ? 'border-[#B79A6B] bg-[#1B1815] text-[#FAF7F2] shadow-sm'
                              : 'border-[#E8DDCC] bg-white text-[#1B1815] hover:border-[#B79A6B]'
                          }`}
                        >
                          {sz.replace('US ', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] tracking-wider text-[#1B1815] uppercase font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#E8DDCC] rounded-full bg-white px-2 py-0.5">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-1 text-[#1B1815] hover:text-[#B79A6B]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-1 text-[#1B1815] hover:text-[#B79A6B]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8DDCC]">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                    className={`px-4 rounded-sm border border-[#E8DDCC] flex items-center justify-center transition-colors ${
                      wishlisted ? 'bg-[#1B1815] text-[#B79A6B]' : 'bg-white text-[#1B1815] hover:text-[#B79A6B]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#B79A6B]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#B79A6B] text-[#1B1815] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:brightness-105 transition-all shadow-sm"
                >
                  Buy Now &rarr;
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
