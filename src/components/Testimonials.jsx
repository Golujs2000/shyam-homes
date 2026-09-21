import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "Very helpful throughout the property search process. The communication was simple and professional.",
      author: "Rajesh Ranjan",
      locality: "Kankarbagh, Patna",
      transaction: "Bought a 3 BHK House"
    },
    {
      id: 2,
      quote: "Helped us finalize our commercial space on Boring Road with clean title verification and reasonable pricing.",
      author: "Amitabh Verma",
      locality: "Boring Road, Patna",
      transaction: "Commercial Office Buyer"
    },
    {
      id: 3,
      quote: "Dhananjay ji provided honest feedback regarding plot registry and land mutation in Danapur. Highly recommended.",
      author: "Sanjay Mishra",
      locality: "Danapur, Patna",
      transaction: "Residential Plot Buyer"
    }
  ];

  return (
    <section className="py-24 bg-surface-light border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 text-gold-400 text-xs font-bold tracking-wider uppercase mb-3">
            Client Feedback
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Real experiences from property buyers, sellers, and tenants in Patna.
          </p>
        </div>

        {/* Testimonials Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-premium hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between text-left relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-gold-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif text-lg text-navy-900 italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-navy-900 text-sm">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.locality}
                  </p>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                  {item.transaction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
