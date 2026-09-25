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
    <section id="why-us" className="py-24 bg-gradient-to-b from-[#eef7fa] via-white to-[#f4fafc] relative overflow-hidden text-gunmetal-900">
      {/* Subtle background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-lightblue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-lightblue-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-lightblue-300 text-moonstone-700 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            Why Choose Shyam Homes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gunmetal-900 tracking-tight">
            Your Local Property Partner in{' '}
            <span className="text-gunmetal-800 italic font-normal">Patna</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
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
                className="bg-white border border-lightblue-200 hover:border-moonstone-400 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl text-left group"
              >
                <div>
                  {/* Top row: Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-lightblue-300 group-hover:text-moonstone-500 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-lightblue-100 border border-lightblue-200 group-hover:bg-moonstone-500 group-hover:text-white flex items-center justify-center text-moonstone-600 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-gunmetal-900 mb-3 group-hover:text-moonstone-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
