import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gem, Hammer } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-24">
        
        {/* Hero Narrative */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-12">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            MANIFIESTO DE LA MAISON
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1815] leading-[1.08]">
            A Modern House <br />
            <span className="italic text-[#8E806E]">of Fine Jewellery</span>
          </h1>
          <p className="text-sm md:text-base text-[#8E806E] font-light leading-relaxed pt-2">
            AUREVÉ was created for a new generation of jewelry lovers — those who value craftsmanship, individuality, and sculptural pieces that feel deeply personal rather than predictable.
          </p>
        </div>

        {/* Asymmetrical Image + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 aspect-[16/10] bg-[#EFE7D9] rounded-sm overflow-hidden shadow-lg border border-[#E8DDCC]">
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop"
              alt="Place Vendôme Atelier master bench"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
              PARISIAN HERITAGE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1B1815]">
              Born in Place Vendôme, <br />
              Sculpted for the World
            </h2>
            <p className="text-xs sm:text-sm text-[#8E806E] font-light leading-relaxed">
              Every curve of our gold begins with hand-carved wax on the wooden jeweler’s peg. We reject machine mass-production in favor of micro-pavé claws that sit so low against the diamond they appear virtually invisible.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
              >
                <span>Acquire Our Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E8DDCC]">
          <div className="p-8 bg-white rounded-sm border border-[#E8DDCC] space-y-3">
            <Hammer className="w-6 h-6 text-[#B79A6B]" />
            <h3 className="font-serif-luxury text-2xl text-[#1B1815]">Sculptural Form</h3>
            <p className="text-xs text-[#8E806E] leading-relaxed font-light">
              We design jewelry that moves with you. Flexible tension bands, invisible joints, and organic flowing contours that adapt to everyday gestures.
            </p>
          </div>

          <div className="p-8 bg-white rounded-sm border border-[#E8DDCC] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#B79A6B]" />
            <h3 className="font-serif-luxury text-2xl text-[#1B1815]">100% Ethical Gold</h3>
            <p className="text-xs text-[#8E806E] leading-relaxed font-light">
              We only use RJC-certified recycled 18K solid gold and 950 platinum, eliminating environmental disruption while preserving imperial purity.
            </p>
          </div>

          <div className="p-8 bg-white rounded-sm border border-[#E8DDCC] space-y-3">
            <Gem className="w-6 h-6 text-[#B79A6B]" />
            <h3 className="font-serif-luxury text-2xl text-[#1B1815]">Certified Brilliants</h3>
            <p className="text-xs text-[#8E806E] leading-relaxed font-light">
              Every diamond over 0.5 carats arrives with full GIA or IGI pedigree certification, laser inscribed on the girdle for absolute transparency.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
