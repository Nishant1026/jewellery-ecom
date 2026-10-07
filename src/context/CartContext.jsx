import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'aureve_cart_v1';
const FREE_SHIPPING_THRESHOLD = 50000;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftBox, setGiftBox] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, metal, size, qty = 1) => {
    const selectedMetal = metal || product.defaultMetal || (product.metals && product.metals[0]) || '18K Yellow Gold';
    const selectedSize = size || product.defaultSize || (product.sizes && product.sizes[0]) || 'Standard';

    setCart(prev => {
      const index = prev.findIndex(
        item => item.product.id === product.id && item.metal === selectedMetal && item.size === selectedSize
      );

      if (index > -1) {
        const next = [...prev];
        next[index].qty += qty;
        return next;
      } else {
        return [...prev, { product, metal: selectedMetal, size: selectedSize, qty }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId, metal, size) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.metal === metal && item.size === size)
    ));
  };

  const updateQuantity = (productId, metal, size, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.metal === metal && item.size === size) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code) => {
    const cleaned = (code || '').trim().toUpperCase();
    if (cleaned === 'AUREVE15') {
      setDiscountPercent(15);
      setPromoCode('AUREVE15');
      setPromoMessage({ type: 'success', text: 'Privilege granted: 15% VIP Reduction Applied' });
      return true;
    } else if (cleaned === '') {
      setPromoMessage({ type: 'error', text: 'Please enter a privilege code.' });
      return false;
    } else {
      setDiscountPercent(0);
      setPromoMessage({ type: 'error', text: 'Invalid code. Use AUREVE15 for preview.' });
      return false;
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
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
      shippingProgress,
      FREE_SHIPPING_THRESHOLD
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
