import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Categories({ onSelectCategory }) {
  const categoryCards = [
    {
      id: "plots",
      title: "Plots",
      subtitle: "Residential & commercial plots",
      cta: "Explore Plots",
      categoryKey: "Plots",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      tag: "Freehold & Registry Ready"
    },
    {
      id: "flats",
      title: "Flats",
      subtitle: "Apartments for sale & rent",
      cta: "Explore Flats",
      categoryKey: "Flats",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      tag: "2 & 3 BHK Highrises"
    },
    {
      id: "houses",
      title: "Houses",
      subtitle: "Independent homes & houses",
      cta: "Explore Houses",
      categoryKey: "Houses",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      tag: "Independent Villas & Kothis"
    },
    {
      id: "commercial",
      title: "Commercial",
      subtitle: "Shops, offices & commercial spaces",
      cta: "Explore Commercial",
      categoryKey: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      tag: "High Footfall Prime Locations"
    },
    {
      id: "rentals",
      title: "Rental Properties",
      subtitle: "Homes & commercial spaces for rent",
      cta: "Explore Rentals",
      categoryKey: "Rental Properties",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      tag: "Verified Family & Bachelor Homes"
    }
  ];

  const handleCardClick = (catKey) => {
    if (onSelectCategory) {
      onSelectCategory(catKey);
    }
    const elem = document.querySelector('#properties');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold tracking-wider uppercase mb-3">
            Property Portfolio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Explore Properties
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Find a property that matches your needs and budget.
          </p>
        </div>

        {/* 5 Large Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categoryCards.map((card, index) => {
            // Give card 1 and 2 special layout or sleek grid styling
            const isWide = index === 0 || index === 1;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.categoryKey)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isWide ? 'lg:col-span-1' : ''
                } h-[340px] sm:h-[380px] bg-navy-950 flex flex-col justify-end`}
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.8] group-hover:brightness-[0.7]"
                />

                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold px-3 py-1 rounded-full border border-gold-500/30">
                    {card.tag}
                  </span>
                </div>

                {/* Card Content at bottom */}
                <div className="relative z-10 p-6 text-left space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {card.subtitle}
                  </p>

                  <div className="pt-2 flex items-center text-gold-400 font-semibold text-sm group-hover:text-gold-300 gap-2">
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
