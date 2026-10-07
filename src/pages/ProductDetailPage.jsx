import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, RotateCw, Camera, ChevronRight, Award, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(product.defaultMetal || product.metals[0]);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    navigate('/checkout');
  };

  // 360 Drag Simulator
  const handleSimulateRotate = (e) => {
    setRotationAngle(prev => (prev + 30) % 360);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8E806E] py-4 border-b border-[#E8DDCC] mb-10">
          <Link to="/" className="hover:text-[#1B1815]">HOME</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-[#1B1815]">CREATIONS</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/collection/${product.category}`} className="uppercase hover:text-[#1B1815]">{product.categoryLabel}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1B1815] font-medium uppercase">{product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#E8DDCC]">
          
          {/* LEFT: Multi-Image Zoom Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] bg-white rounded-sm overflow-hidden border border-[#E8DDCC] shadow-sm">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-sm border border-[#E8DDCC] text-[10px] tracking-widest uppercase font-semibold text-[#1B1815]">
                {product.tag}
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] tracking-widest text-[#8E806E] bg-white/80 px-2.5 py-1 rounded-sm">
                IMAGE 0{activeImageIdx + 1} / 0{product.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-24 rounded-sm overflow-hidden border-2 bg-white transition-all ${
                    activeImageIdx === idx ? 'border-[#B79A6B]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* 360° View Simulator Feature Component */}
            <div className="mt-8 p-6 bg-white rounded-sm border border-[#E8DDCC] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-[#B79A6B]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#1B1815]">
                    360° Atelier Inspection
                  </span>
                </div>
                <span className="text-[10px] text-[#8E806E] tracking-widest uppercase">
                  ANGLE: {rotationAngle}°
                </span>
              </div>

              <div
                className="relative aspect-video bg-[#FAF7F2] rounded-sm overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border border-[#E8DDCC]"
                onClick={handleSimulateRotate}
              >
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt="360 view"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                  className="max-h-[85%] object-contain transition-transform duration-300"
                />
                <div className="absolute bottom-3 inset-x-0 text-center">
                  <span className="px-3 py-1 bg-black/60 text-white text-[10px] tracking-widest uppercase rounded-full backdrop-blur-sm">
                    CLICK OR DRAG TO ROTATE
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Information & Controls */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block mb-1">
                {product.categoryLabel} • {product.carat}
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
                {product.name}
              </h1>
              <div className="text-2xl font-serif-luxury font-semibold text-[#1B1815] mt-2 mb-4">
                ₹{product.price.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-[#8E806E] font-ui ml-2">
                  (Inclusive of all taxes & insurance)
                </span>
              </div>
              <p className="text-xs text-[#8E806E] leading-relaxed font-light">
                {product.shortDescription}
              </p>
            </div>

            {/* Metal Selection */}
            {product.metals && (
              <div className="space-y-2 pt-2">
                <label className="text-[11px] tracking-wider text-[#1B1815] uppercase font-semibold flex justify-between">
                  <span>Metal Finish:</span>
                  <span className="text-[#8E806E] font-normal">{selectedMetal}</span>
                </label>
                <div className="flex gap-2">
                  {product.metals.map(metal => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-4 py-2 text-xs rounded-sm border transition-all ${
                        selectedMetal === metal
                          ? 'bg-[#1B1815] text-[#FAF7F2] border-[#1B1815]'
                          : 'bg-white text-[#1B1815] border-[#E8DDCC] hover:border-[#B79A6B]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Circular Ring Size Selection */}
            {product.sizes && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[11px] tracking-wider text-[#1B1815] uppercase font-semibold">
                  <span>Size: <span className="text-[#8E806E] font-normal">{selectedSize}</span></span>
                  <a href="#size-guide" className="text-[#B79A6B] underline text-[10px]">Ring Sizing Guide</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#1B1815] text-[#FAF7F2] border-[#B79A6B] shadow-md'
                          : 'bg-white text-[#1B1815] border-[#E8DDCC] hover:border-[#B79A6B]'
                      }`}
                    >
                      {sz.replace('US ', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Control */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-[11px] tracking-wider text-[#1B1815] uppercase font-semibold">Quantity:</span>
              <div className="flex items-center border border-[#E8DDCC] rounded-full bg-white px-3 py-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 text-[#1B1815] hover:text-[#B79A6B]">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-1 text-[#1B1815] hover:text-[#B79A6B]">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors shadow-sm"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`px-5 rounded-sm border border-[#E8DDCC] flex items-center justify-center transition-colors ${
                    wishlisted ? 'bg-[#1B1815] text-[#B79A6B]' : 'bg-white text-[#1B1815] hover:text-[#B79A6B]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#B79A6B]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#B79A6B] text-[#141210] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:brightness-105 transition-all shadow-md"
              >
                Instant Buy Now &rarr;
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="p-4 bg-white rounded-sm border border-[#E8DDCC] space-y-2.5 text-xs text-[#8E806E]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#B79A6B]" />
                <span>Complimentary insured courier delivery worldwide (3-5 business days).</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B79A6B]" />
                <span>GIA / IGI provenance certificate & lifetime ultrasonic inspection.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#B79A6B]" />
                <span>One complimentary ring resizing within 90 days of acquisition.</span>
              </div>
            </div>

          </div>

        </div>

        {/* STORY BEHIND THE PIECE (EDITORIAL CRAFTSMANSHIP) */}
        <section className="py-20 border-b border-[#E8DDCC]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
                ATELIER NOTES
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1B1815]">
                The Story Behind {product.name}
              </h2>
            </div>

            <p className="font-serif-luxury text-xl sm:text-2xl text-[#1B1815] font-light leading-relaxed italic text-center">
              “{product.story}”
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {product.details.map((detail, idx) => (
                <div key={idx} className="p-4 bg-white rounded-sm border border-[#E8DDCC] flex items-center gap-3 text-xs text-[#8E806E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B79A6B] flex-shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIRTUAL TRY-ON (FEATURE SECTION) */}
        <section className="py-20 border-b border-[#E8DDCC] text-center bg-[#FAF7F2] rounded-sm p-8 my-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
              AUGMENTED REALITY PREVIEW
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-[#1B1815]">
              See It On You
            </h2>
            <p className="text-xs text-[#8E806E] leading-relaxed">
              Discover how {product.name} becomes part of your everyday expression. Experience live camera simulation on mobile and desktop.
            </p>
            <button
              onClick={() => alert(`Virtual Try-on Camera initiated for ${product.name}. Position your hand or collarbone towards the webcam.`)}
              className="px-8 py-3.5 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors inline-flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>TRY VIRTUALLY</span>
            </button>
          </div>
        </section>

        {/* RELATED CREATIONS */}
        {related.length > 0 && (
          <section className="pt-16">
            <h3 className="font-serif-luxury text-3xl font-light text-[#1B1815] mb-8">
              Harmonic Creations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
