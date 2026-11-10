import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, MessageCircle, Check, Compass } from 'lucide-react';
import { localities } from '../data/localities';

export default function AreasServed({ onSelectLocality }) {
  const [selectedLocality, setSelectedLocality] = useState(null);

  const handleChipClick = (loc) => {
    setSelectedLocality(loc.name);
    if (onSelectLocality) {
      onSelectLocality(loc.name);
    }
  };

  const selectedLocalitySlug = selectedLocality
    ? selectedLocality.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : null;

  const askAboutLocationUrl = selectedLocality
    ? `https://wa.me/917858832545?text=${encodeURIComponent(`Hello Shyam Homes, I am looking for property options in ${selectedLocality}, Patna. Please share what is available.`)}`
    : `https://wa.me/917858832545?text=${encodeURIComponent('Hello Shyam Homes, I would like to inquire about property options in my preferred location in Patna.')}`;

  return (
    <section id="areas" className="py-24 bg-surface-light border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold tracking-wider uppercase mb-3">
            Prime Patna Localities
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Properties Across Patna
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Looking for property in a specific part of Patna? Explore verified listings, price benchmarks, and on-ground insights.
          </p>
        </div>

        {/* Locality Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-12">
          {localities.map((loc) => {
            const isSelected = selectedLocality === loc.name;
            return (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleChipClick(loc)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-navy-900 border-gold-500 shadow-lg text-white scale-[1.02]'
                    : 'bg-white border-slate-200/80 hover:border-gold-500/50 hover:shadow-md text-navy-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-gold-400' : 'text-slate-400 group-hover:text-gold-500'}`} />
                    {isSelected && <Check className="w-3.5 h-3.5 text-gold-400" />}
                  </div>
                  <h4 className={`font-serif font-bold text-sm sm:text-base leading-snug ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                    {loc.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                  <span className={`text-[11px] block font-medium ${isSelected ? 'text-gold-300' : 'text-slate-500'}`}>
                    {loc.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="bg-navy-900 rounded-3xl p-8 max-w-3xl mx-auto text-center text-white border border-gold-500/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              {selectedLocality ? `Looking for properties in ${selectedLocality}?` : "Have a specific locality in mind?"}
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
              We maintain direct relationships with plot owners, builders, and landlords across all key hubs in Patna.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={askAboutLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Inquire on WhatsApp</span>
              </a>

              {selectedLocalitySlug && (
                <Link
                  to={`/locations/${selectedLocalitySlug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all border border-white/20"
                >
                  <Compass className="w-4 h-4 text-gold-400" />
                  <span>View {selectedLocality} Guide & Rates ↗</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Directory Link */}
        <div className="text-center mt-10">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-sm font-bold text-moonstone-700 hover:text-gold-600 transition-colors uppercase tracking-wider"
          >
            <span>Explore All Patna Locations Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
