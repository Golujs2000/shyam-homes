import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  const whatsappUrl = "https://wa.me/917858832545?text=" + encodeURIComponent("Hello Dhananjay Kumar, I am looking for property options in Patna. Please guide me.");

  return (
    <section className="relative py-28 bg-navy-950 overflow-hidden text-center text-white">
      {/* Background with Dark Overlay and high-res architectural visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Architecture Patna"
          className="w-full h-full object-cover filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Looking for Property in <span className="text-gold-gradient">Patna?</span>
        </h2>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tell us what you're looking for. We'll help you explore suitable property options across residential, commercial and land categories.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="tel:7858832545"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-navy-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-xl hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5 text-navy-950" />
            <span>Call 7858832545</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-gold-glow hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-navy-950" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Small text: Dhananjay Kumar Real Estate & Property Consultant */}
        <div className="pt-6 border-t border-slate-800/80 inline-block text-center">
          <div className="font-serif text-lg font-bold text-white tracking-wide">
            Dhananjay Kumar
          </div>
          <div className="text-xs text-gold-400 uppercase tracking-widest font-semibold mt-1">
            Real Estate & Property Consultant
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Patna, Bihar
          </div>
        </div>
      </div>
    </section>
  );
}
