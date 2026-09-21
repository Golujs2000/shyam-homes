import React from 'react';
import { Home, DollarSign, Key, Trees, Building2, Users, ArrowUpRight } from 'lucide-react';

export default function Services({ onSelectService }) {
  const services = [
    {
      id: "buying",
      title: "Property Buying",
      description: "Assistance in finding residential and commercial properties.",
      icon: Home,
      tag: "Residential & Commercial",
      cta: "Find Property"
    },
    {
      id: "selling",
      title: "Property Selling",
      description: "Connect with potential buyers for your property.",
      icon: DollarSign,
      tag: "Verified Buyers",
      cta: "Sell With Us",
      targetId: "#sell-property"
    },
    {
      id: "rental",
      title: "Property Rental",
      description: "Find suitable rental properties for your needs.",
      icon: Key,
      tag: "Flats & Commercial",
      cta: "Find Rental"
    },
    {
      id: "plots",
      title: "Plot Buying & Selling",
      description: "Residential and commercial plot opportunities.",
      icon: Trees,
      tag: "Registry Ready",
      cta: "Explore Plots"
    },
    {
      id: "commercial",
      title: "Commercial Property",
      description: "Shops, offices and commercial spaces.",
      icon: Building2,
      tag: "Prime Markets",
      cta: "View Commercial"
    },
    {
      id: "consultation",
      title: "Property Consultation",
      description: "Discuss your property requirement with our consultant.",
      icon: Users,
      tag: "Direct One-on-One",
      cta: "Talk to Expert",
      targetId: "#contact"
    }
  ];

  const handleCardClick = (service) => {
    if (service.targetId) {
      const el = document.querySelector(service.targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.querySelector('#properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      if (onSelectService) onSelectService(service.id);
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 text-gold-400 text-xs font-bold tracking-wider uppercase mb-3">
            What We Do
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Our Property Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Comprehensive real estate assistance tailored to the Patna property market.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-surface-light border border-slate-200/80 rounded-2xl p-8 flex flex-col justify-between hover:bg-white hover:border-gold-500/40 hover:shadow-card-hover transition-all duration-300 text-left group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Top row: Icon and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all shadow-md">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200/70 text-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mb-2.5 group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-navy-900 group-hover:text-gold-600">
                  <span>{item.cta}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
