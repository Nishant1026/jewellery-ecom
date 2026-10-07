import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';

const CATEGORY_META = {
  rings: {
    title: "Solitaire & Sculptural Rings",
    subtitle: "THE RING SUITE",
    desc: "Forged in solid 18K gold and platinum 950. Designed to capture light from every angle with zero compromise in everyday ergonomics.",
    heroImg: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop"
  },
  necklaces: {
    title: "Royal Colliers & Pendants",
    subtitle: "THE COLLIER ARCHIVE",
    desc: "Fluid articulating links, South-Sea golden pearls, and architectural solitaires suspended against the collarbone.",
    heroImg: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1600&auto=format&fit=crop"
  },
  earrings: {
    title: "Cascade Drops & Diamond Studs",
    subtitle: "THE EARRING REPERTOIRE",
    desc: "Baguette pendulums and vivid emeralds calibrated to move gracefully with the natural rhythm of your breath.",
    heroImg: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop"
  },
  bracelets: {
    title: "Articulated Cuffs & Tennis Bracelets",
    subtitle: "THE BRACELET ATELIER",
    desc: "Continuous streams of D-flawless brilliants and hand-fluted gold torques that flex effortlessly onto the wrist.",
    heroImg: "https://images.unsplash.com/photo-1611591475155-42e887640c49?q=80&w=1600&auto=format&fit=crop"
  }
};

export const CollectionPage = () => {
  const { slug } = useParams();
  const meta = CATEGORY_META[slug] || {
    title: `${(slug || '').toUpperCase()} Collection`,
    subtitle: "HAUTE JOAILLERIE",
    desc: "Discover limited atelier pieces sculpted for your personal signature.",
    heroImg: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop"
  };

  const filtered = PRODUCTS.filter(p => p.category === slug);

  return (
    <div className="bg-[#F6F1E8] min-h-screen">
      {/* Category Hero Section */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-end pb-16 bg-[#141210]">
        <img
          src={meta.heroImg}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-black/30 to-transparent" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full text-white space-y-3">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            {meta.subtitle}
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg font-light leading-relaxed">
            {meta.desc}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center pb-6 mb-10 border-b border-[#E8DDCC] text-xs text-[#8E806E]">
          <span>Showing {filtered.length} creations in {slug}</span>
          <Link to="/shop" className="text-[#B79A6B] hover:text-[#1B1815] uppercase tracking-wider font-semibold">
            All Collections &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};
