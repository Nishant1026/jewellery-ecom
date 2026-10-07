import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    number: "01",
    subtitle: "AUREVÉ / 2026 COLLECTION",
    titleLine1: "THE ART",
    titleLine2: "OF BEING",
    titleLine3: "ICONIC",
    description: "Sculptural jewellery designed to become part of your signature. Cast by hand in our Parisian atelier.",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/shop",
    secondaryText: "DISCOVER THE STORY",
    secondaryLink: "/about",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop",
    floatingPiece: "L'Étoile Solitaire — 18K Gold"
  },
  {
    id: 2,
    number: "02",
    subtitle: "THE BRIDAL ARCHIVE",
    titleLine1: "SCULPTED",
    titleLine2: "FOR YOUR",
    titleLine3: "STORY",
    description: "Exceptional cushion-cut solitaires framed by hand-cut baguette diamonds on 950 platinum.",
    ctaText: "VIEW SOLITAIRES",
    ctaLink: "/collection/rings",
    secondaryText: "BESPOKE SERVICE",
    secondaryLink: "/about#concierge",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop",
    floatingPiece: "Aura Pavé — 2.4ct Solitaire"
  },
  {
    id: 3,
    number: "03",
    subtitle: "HAUTE JOAILLERIE SUITE",
    titleLine1: "TIMELESS.",
    titleLine2: "MODERN.",
    titleLine3: "YOURS.",
    description: "Unheated Colombian emeralds cascading in rhythmic harmonic balance with D-color diamonds.",
    ctaText: "ACQUIRE SUITE",
    ctaLink: "/collection/necklaces",
    secondaryText: "VIEW LOOKBOOK",
    secondaryLink: "/journal",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop",
    floatingPiece: "Sérénité d'Émeraude Drops"
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative h-[80vh] min-h-[620px] max-h-[920px] w-full overflow-hidden bg-[#141210]">
      
      {/* Background Cinematic Slide with Parallax Zoom */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.titleLine1}
            className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
          />
          {/* Subtle Film Grain & Luxury Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/90 via-[#141210]/55 to-[#141210]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Motion Graphics: Particles & Champagne Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[15%] w-36 h-36 rounded-full border border-[#B79A6B]/20"
        />
        <motion.div
          animate={{
            y: [10, -15, 10],
            x: [-6, 6, -6],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          className="absolute bottom-[25%] right-[28%] w-24 h-24 rounded-full border border-white/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-[35%] right-[22%] text-[#B79A6B]"
        >
          <Sparkles className="w-6 h-6 stroke-[1]" />
        </motion.div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-[1440px] mx-auto h-full px-6 md:px-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-8 text-[#FAF7F2] space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Subtitle */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#B79A6B]" />
                  <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#D8C7AD]">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Editorial Heading (Line by Line reveal) */}
                <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.04em] text-white leading-[1.02]">
                  <span className="block">{slide.titleLine1}</span>
                  <span className="block italic font-light text-[#D8C7AD]">{slide.titleLine2}</span>
                  <span className="block font-normal">{slide.titleLine3}</span>
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base font-light text-white/80 max-w-lg leading-relaxed pt-1">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="px-8 py-4 bg-[#B79A6B] text-[#141210] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:brightness-105 transition-all shadow-lg flex items-center gap-3 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase rounded-sm hover:bg-white/20 transition-all"
                  >
                    {slide.secondaryText}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Floating Piece Badge */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <motion.div
              key={`badge-${slide.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-5 bg-black/40 backdrop-blur-md border border-[#B79A6B]/30 rounded-sm text-right space-y-1"
            >
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#B79A6B] block">
                FEATURED ATELIER PIECE
              </span>
              <span className="font-serif-luxury text-lg text-white block">
                {slide.floatingPiece}
              </span>
              <span className="text-[10px] tracking-wider text-white/60 block">
                Place Vendôme • Serialized
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Hero Slider Navigation UI (Champagne Indicator: 01 / 03 & Next/Prev) */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between text-[#FAF7F2]">
        
        {/* Numerical Index & Drag Label */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em]">
            <span className="text-[#B79A6B] font-semibold">{slide.number}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/40">03</span>
          </div>

          {/* Thin Champagne Progress Bar */}
          <div className="w-24 md:w-36 h-[2px] bg-white/20 relative overflow-hidden rounded-full hidden sm:block">
            <motion.div
              key={current}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              className="h-full bg-[#B79A6B]"
            />
          </div>

          <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 hidden md:inline">
            SWIPE OR DRAG TO EXPLORE
          </span>
        </div>

        {/* Next / Prev Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:border-[#B79A6B] hover:text-[#B79A6B] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:border-[#B79A6B] hover:text-[#B79A6B] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
};
