import React from 'react';
import { Compass, ShieldCheck, Layers, UserCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      number: "01",
      title: "Local Market Knowledge",
      description: "Get assistance based on local property requirements and locations across Patna.",
      icon: Compass
    },
    {
      number: "02",
      title: "Buy With Confidence",
      description: "Get property information and guidance throughout your search.",
      icon: ShieldCheck
    },
    {
      number: "03",
      title: "Buy, Sell & Rent",
      description: "One place for residential, commercial and rental property requirements.",
      icon: Layers
    },
    {
      number: "04",
      title: "Personal Assistance",
      description: "Speak directly with our property consultant for your requirement.",
      icon: UserCheck
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-navy-950 relative overflow-hidden text-white">
      {/* Subtle background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            Why Choose Shyam Homes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Your Local Property Partner in{' '}
            <span className="text-gold-gradient">Patna</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Dedicated property consultancy built on trust, transparency, and verified real estate transactions.
          </p>
        </div>

        {/* Four Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="bg-navy-900/80 border border-navy-800 hover:border-gold-500/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl text-left group"
              >
                <div>
                  {/* Top row: Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-500/40 group-hover:text-gold-400 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 group-hover:border-gold-500/40 flex items-center justify-center text-gold-400 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-800/80 flex items-center gap-2 text-xs text-gold-400/80 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  <span>Patna Verified Standards</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
