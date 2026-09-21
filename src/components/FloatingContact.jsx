import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  const whatsappUrl = "https://wa.me/917858832545?text=" + encodeURIComponent("Hello Shyam Homes, I would like to consult regarding property in Patna.");

  return (
    <>
      {/* Mobile Fixed Bottom Action Bar (Native App-like Experience) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-lg border-t border-navy-800/90 px-3 py-2 shadow-[0_-8px_20px_rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <a
            href="tel:7858832545"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-navy-900 border border-gold-500/40 text-gold-400 font-bold text-xs shadow-sm active:scale-95 transition-all"
            aria-label="Call Dhananjay Kumar at 7858832545"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call 7858832545</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Desktop Floating Action Buttons (Hidden on Mobile) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3 items-end">
        {/* Phone Call Floating Button */}
        <a
          href="tel:7858832545"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-navy-900 text-white shadow-2xl border-2 border-gold-500 hover:bg-navy-800 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Call Dhananjay Kumar at 7858832545"
        >
          <Phone className="w-5 h-5 text-gold-400" />
          <span className="absolute right-14 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-gold-500/30 pointer-events-none">
            Call 7858832545
          </span>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce-short"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10" />
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="absolute right-16 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-gold-500/30 pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </>
  );
}
