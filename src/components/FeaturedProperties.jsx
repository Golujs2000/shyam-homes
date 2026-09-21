import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, MessageCircle, ExternalLink, Sparkles, Filter, ArrowRight, Eye } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function FeaturedProperties({ onSelectProperty, filterCriteria }) {
  const { properties, settings } = useAdminData();
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter properties according to criteria or active category tab
  const filteredProperties = properties.filter((item) => {
    // If external filterCriteria provided from search bar
    if (filterCriteria) {
      if (filterCriteria.purpose === 'BUY' && item.status !== 'FOR SALE') return false;
      if (filterCriteria.purpose === 'RENT' && item.status !== 'FOR RENT') return false;
      if (filterCriteria.type && filterCriteria.type !== 'All Properties' && item.type !== filterCriteria.type) return false;
      if (filterCriteria.location && filterCriteria.location !== 'All Patna' && !item.location.includes(filterCriteria.location)) return false;
    }

    // Category button filter
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'FOR SALE') return item.status === 'FOR SALE';
    if (activeFilter === 'FOR RENT') return item.status === 'FOR RENT';
    if (activeFilter === 'Houses') return item.type === 'House';
    if (activeFilter === 'Flats') return item.type === 'Flat';
    if (activeFilter === 'Plots') return item.type === 'Plot';
    if (activeFilter === 'Commercial') return item.type === 'Commercial';

    return true;
  });

  const getWhatsAppLink = (prop) => {
    const text = `Hello Shyam Homes, I am interested in ${prop.title} (${prop.price}) at ${prop.location}. Please share full details and arrange a visit.`;
    return `https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="properties" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 text-gold-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Listings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Explore selected properties available for sale and rent in Patna.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
            {[
              { label: 'All', value: 'ALL' },
              { label: 'For Sale', value: 'FOR SALE' },
              { label: 'For Rent', value: 'FOR RENT' },
              { label: 'Flats', value: 'Flats' },
              { label: 'Houses', value: 'Houses' },
              { label: 'Plots', value: 'Plots' },
              { label: 'Commercial', value: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeFilter === tab.value
                    ? 'bg-navy-900 text-gold-400 shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid (6 properties) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-premium hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image & Badge Container */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Link to={`/property/${property.id}`} className="block w-full h-full">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Status Badge: FOR SALE / FOR RENT */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                      property.status === 'FOR SALE' ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* Property Type Badge */}
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <span className="inline-block bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-gold-500/30">
                    {property.type}
                  </span>
                </div>

                {/* Quick Preview Hover Button */}
                {onSelectProperty && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectProperty(property);
                    }}
                    className="absolute bottom-3 right-3 z-10 bg-navy-950/80 hover:bg-navy-900 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md border border-white/20"
                    title="Quick Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-gold-400" />
                    <span>Quick Preview</span>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  {/* Price */}
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-1.5">
                    {property.price}
                  </div>

                  {/* Title */}
                  <Link to={`/property/${property.id}`}>
                    <h3 className="font-serif text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                  </Link>

                  {/* Location with Pin */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{property.location}</span>
                  </div>

                  {/* Specs Row: Beds, Baths, Area */}
                  <div className="flex items-center gap-4 py-4 mt-3 border-y border-slate-100 text-xs sm:text-sm text-slate-600">
                    {property.beds && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{property.beds}</span> Beds
                      </div>
                    )}

                    {property.baths && (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{property.baths}</span> Baths
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <Maximize2 className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">{property.area}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: View Details & WhatsApp */}
                <div className="grid grid-cols-2 gap-3 pt-5 mt-auto">
                  <Link
                    to={`/property/${property.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm group/btn hover:shadow-md"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  <a
                    href={getWhatsAppLink(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-gold-glow"
                  >
                    <MessageCircle className="w-4 h-4 fill-navy-950" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If no properties match filter */}
        {filteredProperties.length === 0 && (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Filter className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-navy-900">No properties found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find a listing matching these specific filters right now. Contact Dhananjay Kumar directly for off-market listings across Patna.
            </p>
            <button
              onClick={() => setActiveFilter('ALL')}
              className="mt-4 px-5 py-2 bg-navy-900 text-gold-400 rounded-lg text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
