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
      bgClass: "bg-white border-slate-200/90 shadow-sm text-gunmetal-900",
      accent: "text-yellow-800 bg-primary-100",
      btnClass: "bg-slate-100 hover:bg-primary-50 text-gunmetal-900 font-semibold border border-slate-200 hover:border-primary-300"
    },
    {
      id: "sell",
      title: "SELL PROPERTY",
      description: "Want to sell your property in Patna? Get connected with genuine buyers.",
      cta: "List Your Property",
      icon: DollarSign,
      targetHref: "#sell-property",
      bgClass: "bg-primary-500 text-gunmetal-950 border-2 border-primary-600 shadow-xl relative overflow-hidden",
      accent: "text-gunmetal-950 bg-white/80 shadow-sm",
      btnClass: "bg-gunmetal-950 hover:bg-gunmetal-900 text-primary-400 font-bold shadow-md",
      featured: true
    },
    {
      id: "rent",
      title: "RENT PROPERTY",
      description: "Looking for a property to rent? Browse flats, houses & spaces.",
      cta: "Find Rental",
      icon: Key,
      targetHref: "#properties",
      bgClass: "bg-white border-slate-200/90 shadow-sm text-gunmetal-900",
      accent: "text-yellow-800 bg-primary-100",
      btnClass: "bg-slate-100 hover:bg-primary-50 text-gunmetal-900 font-semibold border border-slate-200 hover:border-primary-300"
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
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-gunmetal-950/90 text-primary-400 border border-gunmetal-950/20 rounded-full shadow-sm">
                        High Demand
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-8 ${item.featured ? 'text-gunmetal-900 font-medium' : 'text-slate-600'}`}>
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
