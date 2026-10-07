import React, { useState } from 'react';
import { User, Lock, Mail, Calendar, Package, Heart } from 'lucide-react';

export const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-xl mx-auto py-12 border-b border-[#E8DDCC] space-y-2 mb-12">
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            COLLECTOR CONCIERGE
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#1B1815]">
            {loggedIn ? 'My Atelier Account' : isLogin ? 'Access Your Portfolio' : 'Create Collector Account'}
          </h1>
        </div>

        {loggedIn ? (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-sm border border-[#E8DDCC] space-y-2">
              <Package className="w-5 h-5 text-[#B79A6B]" />
              <h3 className="font-serif-luxury text-lg text-[#1B1815]">Orders & Archives</h3>
              <p className="text-xs text-[#8E806E]">Order #AUR-2026-8941 — In transit with bonded courier.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-[#E8DDCC] space-y-2">
              <Calendar className="w-5 h-5 text-[#B79A6B]" />
              <h3 className="font-serif-luxury text-lg text-[#1B1815]">Bespoke Salon</h3>
              <p className="text-xs text-[#8E806E]">Schedule private viewing at Place Vendôme or Mumbai.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-[#E8DDCC] space-y-2">
              <Heart className="w-5 h-5 text-[#B79A6B]" />
              <h3 className="font-serif-luxury text-lg text-[#1B1815]">Private Wishlist</h3>
              <p className="text-xs text-[#8E806E]">View reserved high jewellery selections.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-sm border border-[#E8DDCC] shadow-sm space-y-6">
            <div className="flex border-b border-[#E8DDCC] text-xs font-semibold tracking-wider uppercase">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-3 text-center transition-colors ${isLogin ? 'border-b-2 border-[#1B1815] text-[#1B1815]' : 'text-[#8E806E]'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 pb-3 text-center transition-colors ${!isLogin ? 'border-b-2 border-[#1B1815] text-[#1B1815]' : 'text-[#8E806E]'}`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Lady Genevieve"
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="collector@aureve.com"
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
              >
                {isLogin ? 'Enter Portfolio' : 'Join The Maison'}
              </button>
            </form>

            <div className="text-center">
              <span className="text-[11px] text-[#8E806E]">
                Need concierge assistance? <a href="mailto:concierge@aureve.com" className="text-[#B79A6B] underline">Contact our Specialist</a>.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
