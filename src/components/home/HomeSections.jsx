import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Diamond, Shield, Award } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../../data/products';

// -----------------------------------------------------------------------------
// 1. COLLECTION INTRODUCTION
// -----------------------------------------------------------------------------
export const CollectionIntro = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left: Scaled Image */}
        <div className="lg:col-span-6 overflow-hidden rounded-sm bg-[#EFE7D9] aspect-[4/5] shadow-md border border-[#E8DDCC]">
          <motion.img
            initial={{ scale: 1.15, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
            alt="Editorial Jewellery Model in Place Vendôme"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#B79A6B]" />
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase">
              THE COLLECTION
            </span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1815] leading-[1.08]">
            Designed to be <br />
            <span className="italic font-light text-[#8E806E]">remembered.</span>
          </h2>

          <p className="text-sm md:text-base text-[#8E806E] font-light leading-relaxed max-w-lg">
            Every AUREVÉ piece is created with intention — sculptural silhouettes, refined details and timeless materials designed to live beyond the moment.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <Link
              to="/shop"
              className="px-8 py-4 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors flex items-center gap-3 group"
            >
              <span>Explore The Suite</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="text-xs font-medium tracking-[0.16em] uppercase text-[#1B1815] hover:text-[#B79A6B] transition-colors"
            >
              Read Manifesto &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 2. THE SIGNATURE EDIT (FILTERABLE PRODUCTS)
// -----------------------------------------------------------------------------
export const SignatureEdit = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'diamonds') return p.material.toLowerCase().includes('diamond');
    return p.category === activeTab;
  });

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#E8DDCC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
              CURATED REPERTOIRE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
              The Signature Edit
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 text-xs font-medium tracking-[0.16em] uppercase rounded-full border transition-all flex-shrink-0 ${
                  activeTab === cat.id
                    ? 'bg-[#1B1815] text-[#FAF7F2] border-[#1B1815]'
                    : 'bg-white text-[#8E806E] border-[#E8DDCC] hover:border-[#B79A6B] hover:text-[#1B1815]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid (2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filtered.slice(0, 8).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#1B1815] text-[#1B1815] text-xs font-medium tracking-[0.2em] uppercase rounded-sm hover:bg-[#1B1815] hover:text-[#FAF7F2] transition-all"
          >
            <span>View All 12 Signature Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 3. EDITORIAL SECTION (STATIC DESIGN RESTORED)
// -----------------------------------------------------------------------------
export const EditorialParallax = () => {
  return (
    <section className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] min-h-[520px] max-h-[860px] overflow-hidden flex items-center justify-center bg-[#0F0C0A]">
      {/* Completely Static Full-Width Jewellery Image */}
      <img
        src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1600&auto=format&fit=crop"
        alt="AUREVÉ Haute Joaillerie Pearl and Diamond Collier"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Dark Cinematic Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'rgba(15, 12, 10, 0.50)'
        }}
      />

      {/* Centered Editorial Content with Subtle Initial Fade-In Only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center text-[#FAF7F2] px-6 sm:px-8 max-w-4xl mx-auto space-y-4 sm:space-y-5 select-none"
      >
        <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#D8C7AD] uppercase font-medium block">
          AURÉVÉ PHILOSOPHY
        </span>

        {/* Desktop line structure */}
        <h2 className="hidden md:block font-serif-luxury text-5xl lg:text-7xl font-light text-white leading-[1.08] tracking-[0.03em]">
          JEWELLERY IS NOT <br />
          AN <br />
          <span className="italic font-light text-[#D8C7AD]">ACCESSORY.</span>
        </h2>

        {/* Mobile line structure */}
        <h2 className="block md:hidden font-serif-luxury text-3xl sm:text-4xl font-light text-white leading-[1.12] tracking-[0.03em]">
          JEWELLERY IS <br />
          NOT AN <br />
          <span className="italic font-light text-[#D8C7AD]">ACCESSORY.</span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base font-light text-white/85 tracking-wide max-w-md mx-auto pt-1 sm:pt-2 leading-relaxed">
          It is the detail that becomes part of you.
        </p>
      </motion.div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 4. SPLIT MOTION SECTION (ASYMMETRICAL AS PER SPEC)
// -----------------------------------------------------------------------------
export const SplitMotion = () => {
  return (
    <section className="py-24 md:py-32 bg-[#EFE7D9]/40 border-t border-[#E8DDCC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Large Artisan Workshop Image */}
        <div className="lg:col-span-6 relative aspect-[4/5] rounded-sm overflow-hidden bg-[#FAF7F2] shadow-lg border border-[#E8DDCC]">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop"
            alt="Master Jeweller setting diamond by hand"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur-md rounded-sm border border-[#E8DDCC]">
            <span className="text-[9px] tracking-widest uppercase text-[#B79A6B] block">HAND-FINISHED</span>
            <span className="font-serif-luxury text-base text-[#1B1815]">100+ Hours of Craftsmanship</span>
          </div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            THE ATELIER HERITAGE
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1815] leading-[1.08]">
            CRAFTED <br />
            BETWEEN <br />
            <span className="italic text-[#8E806E]">LIGHT & FORM</span>
          </h2>
          <p className="text-sm md:text-base text-[#8E806E] font-light leading-relaxed max-w-lg">
            Our master jewelers sculpt gold with the touch of a sculptor and set stones with the precision of an astronomer. We believe fine jewelry should never feel rigid — each link is balanced to flex with natural bodily warmth.
          </p>
          <div className="pt-4">
            <Link
              to="/about"
              className="px-8 py-4 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors inline-block"
            >
              DISCOVER CRAFTSMANSHIP
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 5. INFINITE MARQUEE SECTION
// -----------------------------------------------------------------------------
export const MarqueeSection = () => {
  return (
    <div className="py-7 bg-[#1B1815] text-[#FAF7F2] overflow-hidden whitespace-nowrap border-t border-b border-[#B79A6B]/30 select-none">
      <div className="inline-flex items-center gap-10 animate-[marquee_32s_linear_infinite]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="inline-flex items-center gap-10">
            <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.3em] text-[#D8C7AD]">
              AUREVÉ
            </span>
            <span className="text-[#B79A6B] text-xs">✦</span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-light uppercase text-white/80">
              TIMELESS OBJECTS
            </span>
            <span className="text-[#B79A6B] text-xs">✦</span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-light uppercase text-white/80">
              MODERN DESIRE
            </span>
            <span className="text-[#B79A6B] text-xs">✦</span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-light uppercase text-white/80">
              JEWELS THAT MOVE WITH YOU
            </span>
            <span className="text-[#B79A6B] text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 6. NEW ARRIVALS HORIZONTAL SLIDER
// -----------------------------------------------------------------------------
export const NewArrivalsSlider = () => {
  const [scrollIdx, setScrollIdx] = useState(0);
  const newProducts = PRODUCTS.filter(p => p.isNew || p.id.includes('amara') || p.id.includes('vela'));

  const scrollLeft = () => setScrollIdx(prev => Math.max(0, prev - 1));
  const scrollRight = () => setScrollIdx(prev => Math.min(newProducts.length - 2, prev + 1));

  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#E8DDCC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header with Arrow Controls */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block mb-1">
              THE LATEST FROM AUREVÉ
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
              New Arrivals
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              disabled={scrollIdx === 0}
              className="w-10 h-10 rounded-full border border-[#E8DDCC] flex items-center justify-center text-[#1B1815] hover:border-[#B79A6B] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              disabled={scrollIdx >= newProducts.length - 2}
              className="w-10 h-10 rounded-full border border-[#E8DDCC] flex items-center justify-center text-[#1B1815] hover:border-[#B79A6B] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider: 4 visible on desktop, 1.5 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.slice(0, 4).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 7. BESTSELLERS / THE AUREVÉ ICONS
// -----------------------------------------------------------------------------
export const BestsellersIcons = () => {
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);

  return (
    <section className="py-24 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            HALLMARK CREATIONS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
            The AUREVÉ Icons
          </h2>
          <p className="text-xs text-[#8E806E] font-light">
            Pieces that defined our visual lexicon and remain the most coveted by international collectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {bestsellers.slice(0, 4).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 8. CRAFTSMANSHIP: MADE WITH INTENTION (3 STAGES)
// -----------------------------------------------------------------------------
export const CraftsmanshipStages = () => {
  const stages = [
    {
      num: "01",
      title: "DESIGN",
      desc: "Architectural sketches translated into 3D sculptural waxes. Proportions are adjusted down to fractions of a millimeter to flatter bodily movement."
    },
    {
      num: "02",
      title: "CRAFT",
      desc: "Lost-wax investment casting using 100% recycled 18-karat royal gold. Master jewelers burnish and flute each surface under 40x stereoscopic microscopes."
    },
    {
      num: "03",
      title: "FINISH",
      desc: "Micro-pavé settings burnished with walnut rouge for unmatched mirror brilliance. Every gem undergoes triple GIA / IGI verification."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#1B1815] text-[#FAF7F2] border-t border-[#B79A6B]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-xl mx-auto mb-20 space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            THE ATELIER PROTOCOL
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-light text-white">
            Made With Intention
          </h2>
          <p className="text-xs text-white/60 font-light">
            Three immutable stages governing every creation that leaves our Place Vendôme benches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {stages.map((stg) => (
            <div key={stg.num} className="space-y-4 p-8 bg-white/5 rounded-sm border border-white/10 hover:border-[#B79A6B]/50 transition-colors">
              <span className="font-serif-luxury text-5xl md:text-6xl text-[#B79A6B] font-light block">
                {stg.num}
              </span>
              <h3 className="font-serif-luxury text-2xl tracking-[0.14em] text-white uppercase">
                {stg.title}
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {stg.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 9. MATERIALS SECTION
// -----------------------------------------------------------------------------
export const MaterialsSection = () => {
  const materials = [
    {
      title: "18K ROYAL GOLD",
      desc: "Ethically refined and recycled solid gold alloys with unmatched warmth and hypoallergenic comfort.",
      img: "https://images.unsplash.com/photo-1717409014701-8e630ff057f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    },
    {
      title: "LAB-GROWN BRILLIANTS",
      desc: "Type IIa diamond crystals grown in carbon-neutral laboratories, optically and chemically indistinguishable from mined gems.",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "SOLID 950 PLATINUM",
      desc: "High-density noble metal engineered to hold solitaires in timeless security without fading or oxidizing.",
      img: "https://plus.unsplash.com/premium_photo-1680181362119-5c9bf196805f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    },
    {
      title: "NATURAL GEMSTONES",
      desc: "Unheated Colombian emeralds, Australian sapphires and South-Sea pearls selected individually for rare color depth.",
      img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            ETHICAL ARCHIVE
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
            Noble Materials
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat) => (
            <div key={mat.title} className="group bg-white rounded-sm border border-[#E8DDCC] overflow-hidden flex flex-col hover:border-[#B79A6B] transition-colors">
              <div className="aspect-[4/3] bg-[#EFE7D9] overflow-hidden">
                <img src={mat.img} alt={mat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif-luxury text-lg tracking-wider text-[#1B1815]">{mat.title}</h3>
                <p className="text-xs text-[#8E806E] font-light leading-relaxed">{mat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 10. TESTIMONIALS SECTION
// -----------------------------------------------------------------------------
export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-b border-[#E8DDCC]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center space-y-8">
        <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
          WORN. LOVED. REMEMBERED.
        </span>

        <blockquote className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-[#1B1815] max-w-3xl mx-auto leading-relaxed italic">
          “The piece feels incredibly personal. Minimal, sculptural, and completely timeless. It captures morning sunlight on my collarbone like nothing I’ve ever owned.”
        </blockquote>

        <div className="space-y-1">
          <cite className="not-italic text-xs tracking-[0.2em] font-semibold text-[#1B1815] uppercase block">
            — ANANYA R.
          </cite>
          <span className="text-[10px] tracking-widest text-[#8E806E] uppercase block">
            Mumbai & London • Private Collector
          </span>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 11. INSTAGRAM / SOCIAL MASONRY SECTION
// -----------------------------------------------------------------------------
export const InstagramMasonry = () => {
  const photos = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631965004544-1762fc696476?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <section className="py-20 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10 space-y-1">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            CURATED STORIES
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1B1815]">
            @AUREVEJEWELS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((src, idx) => (
            <div key={idx} className="group relative aspect-square bg-[#EFE7D9] rounded-sm overflow-hidden shadow-sm">
              <img src={src} alt="Instagram Campaign" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white text-[#1B1815] text-[10px] tracking-widest uppercase font-semibold rounded-sm">
                  VIEW STORY
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
