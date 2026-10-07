import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    itemCount,
    giftBox,
    setGiftBox,
    promoCode,
    promoMessage,
    applyPromo,
    isFreeShipping,
    remainingForFreeShipping,
    shippingProgress
  } = useCart();

  const [promoInput, setPromoInput] = useState(promoCode || '');
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromo(promoInput);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 290 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-[480px] bg-[#FAF7F2] border-l border-[#E8DDCC] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-[#F6F1E8] border-b border-[#E8DDCC] flex items-center justify-between">
              <div>
                <h2 className="font-serif-luxury text-2xl tracking-[0.06em] text-[#1B1815]">
                  Your Curated Bag
                </h2>
                <span className="text-[11px] tracking-[0.18em] text-[#8E806E] uppercase">
                  {itemCount} {itemCount === 1 ? 'Creation' : 'Creations'} Selected
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Shopping Bag"
                className="w-9 h-9 rounded-full border border-[#E8DDCC] flex items-center justify-center text-[#1B1815] hover:bg-[#1B1815] hover:text-[#F6F1E8] transition-colors"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Insured Courier Delivery Bar */}
            <div className="px-6 md:px-8 py-3.5 bg-[#EFE7D9]/70 border-b border-[#E8DDCC]">
              <div className="flex items-center justify-between text-xs text-[#1B1815] mb-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B79A6B]" />
                  {isFreeShipping
                    ? 'Complimentary White-Glove Courier Unlocked'
                    : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} for Free Courier`}
                </span>
                <span className="text-[#8E806E] text-[10px] tracking-wider">
                  {shippingProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E8DDCC] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B79A6B] to-[#D8C7AD]"
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#B79A6B] flex items-center justify-center text-[#B79A6B]">
                    <Sparkles className="w-6 h-6 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#1B1815]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#8E806E] max-w-xs leading-relaxed">
                    Discover sculptural solitaires, royal colliers and modern heirlooms designed for your signature.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="mt-4 px-6 py-3 bg-[#1B1815] text-[#F6F1E8] text-xs font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
                  >
                    Explore Creations
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.metal}-${item.size}`}
                    className="flex gap-4 p-4 bg-white rounded-sm border border-[#E8DDCC]/70 shadow-sm"
                  >
                    <div className="w-20 h-24 bg-[#F6F1E8] rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-luxury text-base font-medium text-[#1B1815]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.metal, item.size)}
                            className="text-[#8E806E] hover:text-[#B79A6B] p-1"
                            title="Remove creation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#8E806E] tracking-wider mt-0.5 space-x-2">
                          <span>{item.metal}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E8DDCC]/40">
                        <div className="flex items-center border border-[#E8DDCC] rounded-full bg-[#F6F1E8] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.metal, item.size, -1)}
                            className="p-1 text-[#1B1815] hover:text-[#B79A6B]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#1B1815]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.metal, item.size, 1)}
                            className="p-1 text-[#1B1815] hover:text-[#B79A6B]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif-luxury text-base font-semibold text-[#1B1815]">
                          ₹{(item.product.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-white border-t border-[#E8DDCC] space-y-4">
                {/* Gift Option */}
                <label className="flex items-start gap-3 p-3 bg-[#F6F1E8] rounded-sm border border-[#E8DDCC] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="mt-0.5 accent-[#B79A6B]"
                  />
                  <div className="text-xs">
                    <span className="font-medium text-[#1B1815] block">
                      Complimentary Silk Presentation Box
                    </span>
                    <span className="text-[11px] text-[#8E806E]">
                      Includes wax-sealed GIA certificate and handwritten gift card
                    </span>
                  </div>
                </label>

                {/* Promo Code Field */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege code (try: AUREVE15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm uppercase tracking-wider text-[#1B1815] outline-none focus:border-[#B79A6B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1B1815] text-[#FAF7F2] text-[11px] font-medium tracking-wider uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-[#8E806E] pt-2 border-t border-[#E8DDCC]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1B1815]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Privilege Discount (15%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured White-Glove Courier</span>
                    <span className="font-medium text-[#1B1815]">
                      {isFreeShipping ? 'Complimentary' : '₹1,500'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif-luxury text-[#1B1815] pt-2 border-t border-[#E8DDCC] font-semibold">
                    <span>Estimated Total</span>
                    <span>₹{(total + (isFreeShipping ? 0 : 1500)).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-[#B79A6B] transition-all duration-300 shadow-md group"
                >
                  <span>Proceed to Bespoke Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E806E] tracking-wider uppercase pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B79A6B]" />
                  <span>Insured Doorstep Delivery & 256-Bit SSL Security</span>
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
