import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'COLLECTIONS', path: '/shop' },
  { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
  { label: 'RINGS', path: '/collection/rings' },
  { label: 'NECKLACES', path: '/collection/necklaces' },
  { label: 'EARRINGS', path: '/collection/earrings' },
  { label: 'BRACELETS', path: '/collection/bracelets' },
  { label: 'ABOUT AUREVÉ', path: '/about' },
  { label: 'THE JOURNAL', path: '/journal' }
];

export const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-[380px] bg-[#F6F1E8] p-8 flex flex-col justify-between shadow-2xl border-l border-[#E8DDCC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DDCC]">
                <div className="flex flex-col">
                  <span className="font-serif-luxury text-xl tracking-[0.24em] font-medium text-[#1B1815]">
                    AUREVÉ
                  </span>
                  <span className="text-[8px] tracking-[0.3em] font-light text-[#8E806E]">
                    HAUTE JOAILLERIE
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 text-[#1B1815] hover:text-[#B79A6B] transition-colors"
                >
                  <X className="w-6 h-6 stroke-[1.25]" />
                </button>
              </div>

              {/* Editorial Links */}
              <nav className="mt-8 flex flex-col space-y-4">
                {MENU_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="group flex items-center justify-between text-lg md:text-xl font-serif-luxury tracking-[0.14em] text-[#1B1815] hover:text-[#B79A6B] py-1 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#B79A6B]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#E8DDCC] space-y-3 text-xs text-[#8E806E]">
              <div className="flex justify-between items-center">
                <span>CONCIERGE SALON</span>
                <span className="text-[#1B1815]">+91 22 4988 5000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>PLACE VENDÔME & MUMBAI</span>
                <span className="text-[#B79A6B]">BY APPOINTMENT</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
