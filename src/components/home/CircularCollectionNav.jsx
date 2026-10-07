import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CIRCULAR_CATEGORIES } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

export const CircularCollectionNav = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCat = CIRCULAR_CATEGORIES[selectedIdx];

  // Rotate circle so selected item sits at top (-activeCat.angle)
  const currentRotation = -activeCat.angle;

  return (
    <section className="py-24 bg-[#EFE7D9]/60 border-t border-b border-[#E8DDCC] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            THE ORBIT ARCHIVE
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1815]">
            Explore By Silhouette
          </h2>
          <p className="text-xs text-[#8E806E] font-light">
            Select a realm to orbit our signature Place Vendôme creations.
          </p>
        </div>

        {/* Desktop Circular Rotating Showcase */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Left / Center: Interactive Orbit Wheel */}
          <div className="col-span-7 flex items-center justify-center relative">
            <div className="relative w-[440px] h-[440px] flex items-center justify-center">
              
              {/* Outer Orbit Track Line */}
              <div className="absolute inset-0 rounded-full border border-[#B79A6B]/30" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#B79A6B]/20" />

              {/* Central Sphere: AUREVÉ */}
              <div className="relative z-10 w-32 h-32 rounded-full bg-[#1B1815] text-[#FAF7F2] border border-[#B79A6B]/50 flex flex-col items-center justify-center shadow-xl">
                <span className="font-serif-luxury text-lg tracking-[0.24em] font-medium uppercase">
                  AUREVÉ
                </span>
                <span className="text-[7px] tracking-[0.3em] text-[#B79A6B] uppercase mt-0.5">
                  ATELIER
                </span>
              </div>

              {/* Orbiting Rotating Container */}
              <motion.div
                animate={{ rotate: currentRotation }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="absolute inset-0 pointer-events-none"
              >
                {CIRCULAR_CATEGORIES.map((cat, idx) => {
                  const rad = (cat.angle * Math.PI) / 180;
                  const radius = 220; // Radius in px
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <div
                      key={cat.id}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginLeft: '-45px',
                        marginTop: '-45px',
                      }}
                      className="pointer-events-auto"
                    >
                      <motion.button
                        animate={{ rotate: -currentRotation }} // Counter-rotate so text remains upright
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        onClick={() => setSelectedIdx(idx)}
                        className={`w-[90px] h-[90px] rounded-full border flex flex-col items-center justify-center p-2 text-center transition-all ${
                          selectedIdx === idx
                            ? 'bg-[#B79A6B] text-[#141210] border-[#B79A6B] shadow-xl scale-110'
                            : 'bg-[#FAF7F2] text-[#1B1815] border-[#E8DDCC] hover:border-[#B79A6B] hover:scale-105'
                        }`}
                      >
                        <span className="text-[9px] font-semibold tracking-[0.16em] uppercase">
                          {cat.label}
                        </span>
                        <span className="text-[8px] opacity-70 mt-0.5">
                          0{idx + 1}
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>

            </div>
          </div>

          {/* Right: Dynamic Category Card based on selected category */}
          <div className="col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm p-8 shadow-sm flex flex-col space-y-6"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#F6F1E8]">
                  <img
                    src={activeCat.image}
                    alt={activeCat.label}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] text-[#B79A6B] uppercase font-semibold">
                      COLLECTION ARCHIVE
                    </span>
                    <span className="text-xs text-[#8E806E]">
                      0{selectedIdx + 1} / 06
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-3xl font-light text-[#1B1815]">
                    The {activeCat.label} Edit
                  </h3>

                  <p className="text-xs text-[#8E806E] leading-relaxed font-light">
                    Hand-forged sculptural pieces designed to contour seamlessly with your movement. Every setting adheres to our Place Vendôme benchmark of zero visible imperfections.
                  </p>

                  <div className="pt-2">
                    <Link
                      to={activeCat.id === 'new' ? '/shop?filter=new' : `/collection/${activeCat.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1815] text-[#FAF7F2] text-xs font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
                    >
                      <span>Explore {activeCat.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Horizontal Carousel Version (No Page Overflow) */}
        <div className="lg:hidden space-y-6">
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {CIRCULAR_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setSelectedIdx(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-full border flex flex-col items-center justify-center p-2 text-center transition-all ${
                  selectedIdx === idx
                    ? 'bg-[#B79A6B] text-[#141210] border-[#B79A6B] shadow-md'
                    : 'bg-[#FAF7F2] text-[#1B1815] border-[#E8DDCC]'
                }`}
              >
                <span className="text-[10px] font-semibold tracking-wider uppercase">
                  {cat.label}
                </span>
                <span className="text-[8px] opacity-70 mt-1">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Display Card */}
          <div className="bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm p-6 space-y-4">
            <div className="aspect-[16/10] rounded-sm overflow-hidden bg-[#F6F1E8]">
              <img
                src={activeCat.image}
                alt={activeCat.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif-luxury text-2xl text-[#1B1815]">
                The {activeCat.label} Edit
              </h3>
              <p className="text-xs text-[#8E806E] mt-1 mb-4">
                Sculptural fine jewellery made to live beyond the moment.
              </p>
              <Link
                to={activeCat.id === 'new' ? '/shop?filter=new' : `/collection/${activeCat.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B1815] text-[#FAF7F2] text-xs tracking-wider uppercase rounded-sm"
              >
                <span>View {activeCat.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
