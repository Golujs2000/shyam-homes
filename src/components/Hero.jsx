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
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[92vh] pt-28 pb-32 md:pb-36 flex items-center bg-navy-950 overflow-hidden">
      {/* Background Graphic & City/Property Imagery */}
      <div className="absolute inset-0 z-0">
        {/* Deep gradient overlay on left for generous negative space and crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60 z-10" />

        {/* High-res modern property visual placed on desktop right */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Premium Property in Patna - Shyam Homes"
          className="w-full h-full object-cover object-center lg:object-right filter brightness-90 transform scale-105"
        />

        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column (Desktop 7 cols) */}
          <div className="lg:col-span-8 text-left space-y-6">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-gold-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-gold-300">
                REAL ESTATE & PROPERTY CONSULTANTS • PATNA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              Find the Right Property in{' '}
              <span className="text-gold-gradient italic font-normal">Patna</span>
            </h1>

            {/* Highlight */}
            <div className="flex items-center gap-3 text-gold-400 font-semibold text-lg md:text-xl tracking-wide">
              <span className="bg-gold-500/10 px-3 py-1 rounded-md border border-gold-500/20">
                Buy • Sell • Rent
              </span>
              <span className="text-slate-400 hidden sm:inline text-sm font-normal">
                | Patna & NCR Bihar
              </span>
            </div>

            {/* Supporting text */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              Explore plots, houses, flats and commercial properties with <strong className="text-white font-medium">Shyam Homes</strong>.
              Get professional assistance for your next property decision from verified local consultants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#properties"
                onClick={scrollToProperties}
                className="inline-flex items-center justify-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-7 py-3.5 rounded-lg shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 transition-all text-base group"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-navy-900/80 hover:bg-navy-800 text-white font-semibold px-7 py-3.5 rounded-lg border border-slate-700 hover:border-gold-500/50 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base"
              >
                <MessageCircle className="w-5 h-5 text-gold-400 fill-gold-400/20" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Below Trust Checkmarks */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Residential & Commercial</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Buy • Sell • Rent</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Local Property Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Floating Badge / Stat Box (Desktop 4 cols) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="bg-navy-900/85 backdrop-blur-md p-6 rounded-2xl border border-gold-500/20 shadow-2xl space-y-4 max-w-xs text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Patna's Trusted</h4>
                  <p className="text-xs text-slate-400">Property Consultancy</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct advisory by <strong className="text-gold-400 font-medium">Dhananjay Kumar</strong> with verified titles, transparent dealings, and on-ground site visits.
              </p>
              <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" /> Patna, Bihar
                </span>
                <span className="text-gold-400 font-semibold">100% Free Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
