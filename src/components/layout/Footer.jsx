import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#141210] text-[#FAF7F2] pt-20 pb-12 border-t border-[#B79A6B]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Top Newsletter / Invitation Section */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase">
              PRIVATE DISPATCHES
            </span>
            <h3 className="font-serif-luxury text-3xl md:text-4xl font-light text-white">
              Enter the Universe of AUREVÉ
            </h3>
            <p className="text-xs text-white/60 max-w-md font-light leading-relaxed">
              Receive private viewings of limited high jewellery suites, salon invitations, and bespoke gemstone journals.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-white/5 border border-[#B79A6B]/40 rounded-sm flex items-center gap-3 text-xs text-[#B79A6B]">
                <Check className="w-4 h-4" />
                <span>You are invited. Welcome to the house of AUREVÉ.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3.5 bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/40 rounded-sm outline-none focus:border-[#B79A6B]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#B79A6B] text-[#141210] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-white/40 mt-2 font-light">
              By invitation only. We uphold strict discretion and zero spam protocol.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif-luxury text-2xl tracking-[0.28em] text-white uppercase block">
                AUREVÉ
              </span>
              <span className="text-[8px] tracking-[0.35em] text-[#B79A6B] uppercase block">
                JEWELS THAT MOVE WITH YOU
              </span>
            </Link>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
              Contemporary high jewellery house combining French atelier traditions with architectural modernism. Handcrafted using certified conflict-free diamonds and recycled 18-karat royal gold.
            </p>
            <div className="flex items-center gap-4 text-[10px] tracking-widest text-[#B79A6B] uppercase pt-2">
              <span>GIA ACCREDITED</span>
              <span>•</span>
              <span>RJC CERTIFIED</span>
              <span>•</span>
              <span>EST. 2026</span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white">
              Haute Creations
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><Link to="/collection/rings" className="hover:text-[#B79A6B] transition-colors">Solitaire Rings</Link></li>
              <li><Link to="/collection/necklaces" className="hover:text-[#B79A6B] transition-colors">Royal Colliers</Link></li>
              <li><Link to="/collection/earrings" className="hover:text-[#B79A6B] transition-colors">Cascade Drops</Link></li>
              <li><Link to="/collection/bracelets" className="hover:text-[#B79A6B] transition-colors">Tennis Bracelets</Link></li>
              <li><Link to="/shop" className="hover:text-[#B79A6B] transition-colors">Signature Edit</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><Link to="/about" className="hover:text-[#B79A6B] transition-colors">The Atelier Story</Link></li>
              <li><Link to="/about#craft" className="hover:text-[#B79A6B] transition-colors">Sculptural Craft</Link></li>
              <li><Link to="/about#ethics" className="hover:text-[#B79A6B] transition-colors">Ethical Sourcing</Link></li>
              <li><Link to="/journal" className="hover:text-[#B79A6B] transition-colors">Salon Journal</Link></li>
              <li><Link to="/about#contact" className="hover:text-[#B79A6B] transition-colors">Private Salons</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#" className="hover:text-[#B79A6B] transition-colors">Bespoke Ring Sizing</a></li>
              <li><a href="#" className="hover:text-[#B79A6B] transition-colors">White-Glove Courier</a></li>
              <li><a href="#" className="hover:text-[#B79A6B] transition-colors">Lifetime Ultrasonic Care</a></li>
              <li><a href="#" className="hover:text-[#B79A6B] transition-colors">Provenance Certificates</a></li>
              <li><a href="#" className="hover:text-[#B79A6B] transition-colors">Private Consultation</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-light gap-4">
          <p>© 2026 AUREVÉ Haute Joaillerie. All Rights Reserved. Paris • Mumbai • London.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Bespoke Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security & Ethics</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
