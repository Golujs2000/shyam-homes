import React from 'react';
import { MessageCircle, ArrowRight, CheckCircle2, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const whatsappUrl = "https://wa.me/917858832545?text=" + encodeURIComponent("Hello Shyam Homes, I am looking to explore properties in Patna.");

  const scrollToProperties = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#properties');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    if (onExploreClick) onExploreClick();
  };

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[92vh] pt-28 pb-32 md:pb-36 flex items-center bg-gradient-to-br from-[#ebf7fa]/50 via-[#d7eff5]/40 to-[#c3e7f1]/30 overflow-hidden text-gunmetal-900">
      {/* Background Graphic & City/Property Imagery */}
      <div className="absolute inset-0 z-0">
        {/* Soft luminous light-blue gradient overlay with increased transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ebf7fa]/70 via-[#ebf7fa]/35 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#ebf7fa]/40 via-transparent to-[#ebf7fa]/20 z-10" />

        {/* High-res modern property visual placed on desktop right */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Premium Property in Patna - Shyam Homes"
          className="w-full h-full object-cover object-center lg:object-right filter brightness-95 opacity-90 transform scale-105"
        />

        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-lightblue-200/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column (Desktop 7 cols) */}
          <div className="lg:col-span-8 text-left space-y-6">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-lightblue-300 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-moonstone-500 animate-pulse" />
              <span className="text-[11px] md:text-xs font-bold tracking-wider uppercase text-moonstone-700">
                REAL ESTATE & PROPERTY CONSULTANTS • PATNA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gunmetal-900 tracking-tight leading-[1.15]">
              Find the Right Property in{' '}
              <span className="text-moonstone-600 italic font-normal">Patna</span>
            </h1>

            {/* Highlight */}
            <div className="flex items-center gap-3 text-moonstone-700 font-semibold text-lg md:text-xl tracking-wide">
              <span className="bg-lightblue-200/70 px-3.5 py-1 rounded-md border border-lightblue-300 shadow-sm">
                Buy • Sell • Rent
              </span>
              <span className="text-slate-600 hidden sm:inline text-sm font-normal">
                | Patna & NCR Bihar
              </span>
            </div>

            {/* Supporting text */}
            <p className="text-slate-700 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              Explore plots, houses, flats and commercial properties with <strong className="text-gunmetal-900 font-semibold">Shyam Homes</strong>.
              Get professional assistance for your next property decision from verified local consultants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#properties"
                onClick={scrollToProperties}
                className="inline-flex items-center justify-center gap-2.5 bg-moonstone-500 hover:bg-moonstone-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base group"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-gunmetal-900 font-semibold px-7 py-3.5 rounded-xl border border-lightblue-300 hover:border-moonstone-400 backdrop-blur-md shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all text-base"
              >
                <MessageCircle className="w-5 h-5 text-moonstone-500" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Below Trust Checkmarks */}
            <div className="pt-4 border-t border-lightblue-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-moonstone-500 shrink-0" />
                <span>Residential & Commercial</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-moonstone-500 shrink-0" />
                <span>Buy • Sell • Rent</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-moonstone-500 shrink-0" />
                <span>Local Property Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Floating Badge / Stat Box (Desktop 4 cols) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-lightblue-200 shadow-xl space-y-4 max-w-xs text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-lightblue-100 border border-lightblue-200 flex items-center justify-center text-moonstone-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gunmetal-900 font-bold text-base">Patna's Trusted</h4>
                  <p className="text-xs text-slate-500">Property Consultancy</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct advisory by <strong className="text-gunmetal-900 font-medium">Dhananjay Kumar</strong> with verified titles, transparent dealings, and on-ground site visits.
              </p>
              <div className="pt-2 border-t border-lightblue-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-moonstone-600" /> Patna, Bihar
                </span>
                <span className="text-moonstone-700 font-bold">100% Free Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
