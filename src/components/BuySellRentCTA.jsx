import React from 'react';
import { ArrowRight, Key, Home, DollarSign } from 'lucide-react';

export default function BuySellRentCTA({ onAction }) {
  const pillars = [
    {
      id: "buy",
      title: "BUY PROPERTY",
      description: "Looking for your next home, plot or commercial property?",
      cta: "Find Property",
      icon: Home,
      targetHref: "#properties",
      bgClass: "bg-white border-slate-200/90",
      accent: "text-gold-600 bg-gold-500/10",
      btnClass: "bg-navy-900 hover:bg-navy-800 text-white"
    },
    {
      id: "sell",
      title: "SELL PROPERTY",
      description: "Want to sell your property in Patna? Get connected with genuine buyers.",
      cta: "List Your Property",
      icon: DollarSign,
      targetHref: "#sell-property",
      bgClass: "bg-navy-900 text-white border-gold-500/30 shadow-2xl relative overflow-hidden",
      accent: "text-gold-400 bg-gold-500/20",
      btnClass: "bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-gold-glow",
      featured: true
    },
    {
      id: "rent",
      title: "RENT PROPERTY",
      description: "Looking for a property to rent? Browse flats, houses & spaces.",
      cta: "Find Rental",
      icon: Key,
      targetHref: "#properties",
      bgClass: "bg-white border-slate-200/90",
      accent: "text-gold-600 bg-gold-500/10",
      btnClass: "bg-navy-900 hover:bg-navy-800 text-white"
    }
  ];

  const handlePillarClick = (e, pillar) => {
    e.preventDefault();
    if (onAction) onAction(pillar.id);
    const target = document.querySelector(pillar.targetHref);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-3xl p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between text-left ${item.bgClass}`}
              >
                <div>
                  {/* Top Badge/Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.accent}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    {item.featured && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-gold-500/20 text-gold-300 border border-gold-500/30 rounded-full">
                        High Demand
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-8 ${item.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href={item.targetHref}
                  onClick={(e) => handlePillarClick(e, item)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm transition-all group ${item.btnClass}`}
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
