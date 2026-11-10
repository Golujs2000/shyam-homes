import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { localitiesDetailed } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function LocationsHubPage() {
  const breadcrumbItems = [
    { name: 'Locations', url: '/locations' }
  ];

  const locationsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: localitiesDetailed.map((loc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${loc.name}, Patna`,
      url: `https://shyamhomes.com/locations/${loc.slug}`,
      description: loc.metaDescription
    }))
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Patna Real Estate Locations Directory — Prime Localities, Price Trends & Plots"
        description="Explore properties across prime Patna localities: Kankarbagh, Boring Road, Bailey Road, Danapur, Saguna More, Bihta & Patliputra Colony. Local price trends & verified listings."
        keywords="Property locations Patna, Kankarbagh real estate, Boring Road flats, Danapur plots, Bihta land, Bailey Road apartments, Shyam Homes Patna"
        canonical="/locations"
        schemas={[getBreadcrumbSchema(breadcrumbItems), locationsListSchema]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Local Market Intelligence
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Patna Real Estate <span className="text-moonstone-600 italic font-normal">Locations Directory</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Detailed neighborhood guides, circle rates, average per-kattha and per-sq.ft prices, connectivity highlights, and verified property inventory across Patna's most sought-after residential and commercial corridors.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localitiesDetailed.map((loc) => (
            <div
              key={loc.slug}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={loc.heroImage}
                    alt={`${loc.name} Real Estate Patna`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-serif text-xl font-bold">{loc.name}</span>
                    <span className="text-[11px] bg-gold-500 text-navy-950 px-2 py-0.5 rounded font-bold">
                      Pin {loc.pincode}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <span className="inline-block text-xs font-bold text-moonstone-700 bg-moonstone-50 px-2.5 py-1 rounded-md border border-moonstone-200">
                    {loc.tag}
                  </span>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {loc.overview}
                  </p>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Flats Avg</span>
                      <span className="font-bold text-navy-900">{loc.priceTrends.flatAvgSqFt}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Plots Avg</span>
                      <span className="font-bold text-navy-900">{loc.priceTrends.plotAvgKattha}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/locations/${loc.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-navy-900 hover:bg-gold-500 text-gold-400 hover:text-navy-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
                >
                  <span>Explore {loc.name} Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Local Area Consultation Callout */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                On-Ground Network Across Patna
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Looking for Land or Apartments in a Specific Locality?
              </h3>
              <p className="text-slate-300 text-sm font-light max-w-2xl">
                We maintain direct seller listings in private family colonies across Patna. Tell us your target location and budget, and we will arrange genuine options.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="tel:7858832545"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call 7858832545</span>
              </a>
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20am%20inquiring%20about%20properties%20in%20a%20specific%20Patna%20locality."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Consultant</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

