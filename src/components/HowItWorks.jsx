import React from 'react';
import { MessageSquare, Search, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Tell Us Your Requirement",
      description: "Share your preferred location, budget and property type.",
      icon: MessageSquare
    },
    {
      step: "02",
      title: "Explore Suitable Properties",
      description: "Review properties matching your requirement.",
      icon: Search
    },
    {
      step: "03",
      title: "Schedule a Visit",
      description: "Shortlist properties and arrange a visit.",
      icon: CalendarCheck
    },
    {
      step: "04",
      title: "Move Forward",
      description: "Get assistance as you proceed with your property transaction.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface-light border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 text-gold-400 text-xs font-bold tracking-wider uppercase mb-3">
            Streamlined Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Finding Your Property Made Simple
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A transparent and structured approach to real estate across Patna.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-premium hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between text-left group hover:-translate-y-1"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-gold-500/80">
                    Step {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-gold-600">
                  <span>Professional Guidance</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
