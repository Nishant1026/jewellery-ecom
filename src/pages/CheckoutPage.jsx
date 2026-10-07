import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, subtotal, discountAmount, total, isFreeShipping, giftBox, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete Order
      setIsSuccess(true);
      clearCart();
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 bg-[#F6F1E8] min-h-screen flex items-center justify-center">
        <div className="max-w-xl mx-auto p-10 bg-white rounded-sm border border-[#E8DDCC] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#B79A6B]/20 text-[#B79A6B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] tracking-[0.3em] font-medium text-[#B79A6B] uppercase block">
            RESERVATION CONFIRMED
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1B1815]">
            Thank You, {formData.firstName || 'Collector'}
          </h1>
          <p className="text-xs text-[#8E806E] leading-relaxed">
            Your acquisition order <strong className="text-[#1B1815]">#AUR-2026-8941</strong> has been officially logged with our Place Vendôme concierge. A confirmation dossier with wax-sealed certificate tracking has been dispatched to <strong>{formData.email || 'your email'}</strong>.
          </p>
          <div className="p-4 bg-[#F6F1E8] rounded-sm text-xs text-[#1B1815] font-medium text-left space-y-1">
            <div className="flex justify-between">
              <span>White-Glove Courier:</span>
              <span className="text-[#B79A6B]">Complimentary Insured Air</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Presentation:</span>
              <span>3-5 Business Days</span>
            </div>
          </div>
          <Link
            to="/"
            className="inline-block px-8 py-3.5 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors"
          >
            Return to Atelier
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#F6F1E8] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Step Indicator Header */}
        <div className="py-8 border-b border-[#E8DDCC] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-serif-luxury text-2xl tracking-[0.28em] text-[#1B1815] uppercase">
            AUREVÉ
          </Link>
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold">
            <span className={step >= 1 ? 'text-[#1B1815]' : 'text-[#8E806E]'}>01 INFORMATION</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8E806E]" />
            <span className={step >= 2 ? 'text-[#1B1815]' : 'text-[#8E806E]'}>02 SHIPPING</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8E806E]" />
            <span className={step >= 3 ? 'text-[#1B1815]' : 'text-[#8E806E]'}>03 PAYMENT</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form (Steps) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-sm border border-[#E8DDCC] shadow-sm">
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* STEP 1: INFORMATION */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-serif-luxury text-2xl text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                    Collector Identification
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="For insured certificate delivery"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Telephone / Concierge Line</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 / International"
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-serif-luxury text-2xl text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                    Courier Destination
                  </h2>
                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Residential / Suite Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">State / Province</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none focus:border-[#B79A6B]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-semibold text-[#1B1815] block mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm outline-none"
                      >
                        <option value="India">India</option>
                        <option value="France">France</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="UAE">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-serif-luxury text-2xl text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
                    Secure Payment Protocol
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-[#FAF7F2] border border-[#B79A6B] rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="accent-[#B79A6B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1B1815] block">Luxury Card / Wire Transfer</span>
                        <span className="text-[#8E806E]">Amex Platinum, Visa Infinite, Mastercard Black Card</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-[#FAF7F2] border border-[#E8DDCC] rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="accent-[#B79A6B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1B1815] block">UPI / Net Banking / Net Wire</span>
                        <span className="text-[#8E806E]">Instant verification via secure encrypted gateway</span>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-[#F6F1E8] rounded-sm flex items-center gap-3 text-xs text-[#8E806E]">
                    <Lock className="w-4 h-4 text-[#B79A6B]" />
                    <span>256-Bit Military Grade SSL Encryption. No card data is stored.</span>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-[#E8DDCC] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#8E806E] hover:text-[#1B1815]"
                  >
                    &larr; Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#1B1815] text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#B79A6B] transition-colors flex items-center gap-2"
                >
                  <span>{step === 3 ? 'Complete Acquisition' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-white p-8 rounded-sm border border-[#E8DDCC] shadow-sm space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#1B1815] pb-2 border-b border-[#E8DDCC]">
              Order Summary
            </h3>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="w-14 h-16 bg-[#F6F1E8] rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury text-sm font-semibold text-[#1B1815]">{item.product.name}</h4>
                      <span className="text-[10px] text-[#8E806E]">{item.metal} • {item.size} • Qty {item.qty}</span>
                    </div>
                    <span className="font-semibold text-[#1B1815]">₹{(item.product.price * item.qty).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#8E806E] pt-4 border-t border-[#E8DDCC]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1B1815]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Discount (15%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier</span>
                <span className="text-[#1B1815]">{isFreeShipping ? 'Complimentary' : '₹1,500'}</span>
              </div>
              {giftBox && (
                <div className="flex justify-between">
                  <span>Parisian Gift Presentation</span>
                  <span className="text-[#B79A6B]">Included</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif-luxury font-semibold text-[#1B1815] pt-3 border-t border-[#E8DDCC]">
                <span>Total Amount</span>
                <span>₹{(total + (isFreeShipping ? 0 : 1500)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-sm border border-[#E8DDCC] space-y-1 text-xs text-[#8E806E]">
              <div className="flex items-center gap-2 text-[#1B1815] font-semibold text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#B79A6B]" />
                <span>The AUREVÉ Assurance</span>
              </div>
              <p className="text-[11px]">All parcels travel via bonded, armed courier with full replacement value insurance.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
