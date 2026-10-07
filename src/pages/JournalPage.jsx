import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    volume: "VOLUME IX",
    title: "The Return of the Sculptural Collar: High Fashion at Place Vendôme",
    date: "OCTOBER 2026",
    category: "EDITORIAL",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop",
    excerpt: "Why the global fashion elite are abandoning rigid necklaces in favor of fluid, articulated precious links that breathe with the collarbone."
  },
  {
    id: 2,
    volume: "VOLUME VIII",
    title: "Modern Solitaires: Moving Beyond the Traditional Engagement Ring",
    date: "SEPTEMBER 2026",
    category: "BRIDAL DISPATCH",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop",
    excerpt: "A deep dive into asymmetrical diamond prongs, emerald step-cuts, and the quiet luxury of satin-brushed gold mountings."
  },
  {
    id: 3,
    volume: "VOLUME VII",
    title: "Muzo Emeralds vs. Natural Brilliants: The Chemistry of Optical Fire",
    date: "AUGUST 2026",
    category: "GEMOLOGY",
    img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=900&auto=format&fit=crop",
    excerpt: "Examining why unheated Colombian emeralds display that rare, velvet scintillation under candlelight."
  }
];

export const JournalPage = () => {
  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-2xl mx-auto py-12 border-b border-[#E8DDCC] space-y-2 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            SALON CHRONICLES
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1815]">
            The AUREVÉ Journal
          </h1>
          <p className="text-xs text-[#8E806E] font-light">
            Dispatches on contemporary joaillerie, architectural design, and modern heirloom stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ARTICLES.map((art) => (
            <article key={art.id} className="group bg-white rounded-sm border border-[#E8DDCC] overflow-hidden flex flex-col hover:border-[#B79A6B] transition-colors shadow-sm">
              <div className="aspect-[16/11] bg-[#EFE7D9] overflow-hidden">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] tracking-widest text-[#B79A6B] uppercase font-semibold">
                    <span>{art.volume}</span>
                    <span className="text-[#8E806E] font-normal">{art.date}</span>
                  </div>
                  <h2 className="font-serif-luxury text-xl text-[#1B1815] group-hover:text-[#B79A6B] transition-colors leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-xs text-[#8E806E] font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DDCC] flex items-center justify-between text-xs text-[#1B1815] font-semibold tracking-wider uppercase">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B79A6B]" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
