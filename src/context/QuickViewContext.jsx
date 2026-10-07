import React, { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext();

export const QuickViewProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (prod) => {
    setProduct(prod);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{
      product,
      isOpen,
      openQuickView,
      closeQuickView
    }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => useContext(QuickViewContext);
