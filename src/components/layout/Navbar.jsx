import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = ({ onOpenMobileMenu, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar background based on scroll or page route
  const navBackground = isScrolled || !isHome
    ? 'bg-[#F6F1E8]/95 backdrop-blur-md border-b border-[#E8DDCC]/70 shadow-[0_4px_24px_rgba(27,24,21,0.04)] py-4'
    : 'bg-transparent border-b border-white/10 py-6';

  const textColor = isScrolled || !isHome ? 'text-[#1B1815]' : 'text-[#FAF7F2]';
  const logoSubColor = isScrolled || !isHome ? 'text-[#8E806E]' : 'text-white/60';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackground}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Mobile Left: Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className={`p-1.5 transition-colors ${textColor} hover:text-[#B79A6B]`}
          >
            <Menu className="w-6 h-6 stroke-[1.25]" />
          </button>
        </div>

        {/* Desktop Left: Brand Identity */}
        <div className="hidden lg:block">
          <Link to="/" className="group flex flex-col">
            <span className={`font-serif-luxury text-2xl tracking-[0.28em] font-normal uppercase transition-colors ${textColor} group-hover:text-[#B79A6B]`}>
              AUREVÉ
            </span>
            <span className={`text-[8px] tracking-[0.35em] font-light uppercase ${logoSubColor}`}>
              HAUTE JOAILLERIE
            </span>
          </Link>
        </div>

        {/* Mobile Center: Brand Logo */}
        <div className="lg:hidden text-center">
          <Link to="/" className="flex flex-col items-center">
            <span className={`font-serif-luxury text-xl tracking-[0.24em] font-normal uppercase ${textColor}`}>
              AUREVÉ
            </span>
          </Link>
        </div>

        {/* Desktop Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            to="/shop"
            className={`text-xs tracking-[0.22em] font-medium uppercase relative py-1 transition-colors ${textColor} hover:text-[#B79A6B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B79A6B] hover:after:w-full after:transition-all after:duration-300`}
          >
            COLLECTIONS
          </Link>
          <Link
            to="/shop?filter=new"
            className={`text-xs tracking-[0.22em] font-medium uppercase relative py-1 transition-colors ${textColor} hover:text-[#B79A6B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B79A6B] hover:after:w-full after:transition-all after:duration-300`}
          >
            NEW ARRIVALS
          </Link>
          <Link
            to="/collection/rings"
            className={`text-xs tracking-[0.22em] font-medium uppercase relative py-1 transition-colors ${textColor} hover:text-[#B79A6B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B79A6B] hover:after:w-full after:transition-all after:duration-300`}
          >
            JEWELLERY
          </Link>
          <Link
            to="/about"
            className={`text-xs tracking-[0.22em] font-medium uppercase relative py-1 transition-colors ${textColor} hover:text-[#B79A6B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B79A6B] hover:after:w-full after:transition-all after:duration-300`}
          >
            ABOUT
          </Link>
        </nav>

        {/* Right Actions: Search, Account, Wishlist, Cart */}
        <div className="flex items-center gap-5 md:gap-7">
          <button
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className={`transition-colors p-1 ${textColor} hover:text-[#B79A6B]`}
          >
            <Search className="w-[18px] h-[18px] stroke-[1.25]" />
          </button>

          <Link
            to="/account"
            aria-label="Customer Account"
            className={`hidden md:block transition-colors p-1 ${textColor} hover:text-[#B79A6B]`}
          >
            <User className="w-[18px] h-[18px] stroke-[1.25]" />
          </Link>

          <Link
            to="/wishlist"
            aria-label="Saved Wishlist"
            className={`relative transition-colors p-1 ${textColor} hover:text-[#B79A6B]`}
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.25]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B79A6B] text-white text-[9px] font-semibold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Bag"
            className={`relative flex items-center gap-2 py-1.5 px-3 rounded-full transition-all duration-300 ${
              isScrolled || !isHome
                ? 'bg-[#1B1815] text-[#F6F1E8] hover:bg-[#B79A6B]'
                : 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/30'
            }`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase hidden sm:inline">
              BAG
            </span>
            <span className="w-4 h-4 rounded-full bg-[#B79A6B] text-white text-[10px] font-semibold flex items-center justify-center">
              {itemCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
