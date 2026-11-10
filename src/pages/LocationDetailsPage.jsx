import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Navigation, TrendingUp, IndianRupee, HelpCircle, Phone, MessageCircle, CheckCircle2, ArrowRight, Building, Home, Bed, Bath, Maximize2 } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { localitiesDetailed } from '../data/seoContentData';
import { useAdminData } from '../context/AdminDataContext';
import { getLocalitySchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

export default function LocationDetailsPage() {
  const { slug } = useParams();
  const locality = localitiesDetailed.find((l) => l.slug === slug);
  const { properties } = useAdminData();

  if (!locality) {
    return <Navigate to="/locations" replace />;
  }

  // Filter properties matching this locality
  const matchingProperties = properties.filter((p) => {
    const locLower = (p.localityKey || p.location || '').toLowerCase();
    const nameLower = locality.name.toLowerCase();
    return locLower.includes(nameLower) || nameLower.includes(locLower);
  });

  const breadcrumbItems = [
    { name: 'Locations', url: '/locations' },
    { name: locality.name, url: `/locations/${locality.slug}` }
  ];

  const schemas = [
    getLocalitySchema(locality),
    getBreadcrumbSchema(breadcrumbItems),
    locality.faqs ? getFAQSchema(locality.faqs) : null
  ].filter(Boolean);

  const whatsappMessage = `Hello Shyam Homes, I am interested in properties in ${locality.name}, Patna. Please share available options.`;

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title={locality.metaTitle}
        description={locality.metaDescription}
        canonical={`/locations/${locality.slug}`}
        schemas={schemas}
      />

      {/* Hero Banner */}
      <div className="relative bg-navy-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gold-500/30">
        <div className="absolute inset-0 opacity-20">
          <img
            src={locality.heroImage}
            alt={locality.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/40">
            {locality.tag}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Property in <span className="text-gold-400 italic font-normal">{locality.name}</span>, Patna
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Pincode: {locality.pincode} • District: {locality.district} • State: {locality.state}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask About {locality.name} Properties</span>
            </a>
            <a
              href="tel:7858832545"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call 7858832545</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-14">
        {/* Price Trends & Benchmarks Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-gold-500" />
            <span>Current Real Estate Benchmarks in {locality.name}</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Average Flat Rate</span>
              <span className="text-base sm:text-lg font-bold text-navy-900 mt-1 block">{locality.priceTrends.flatAvgSqFt}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Residential Plot Rate</span>
              <span className="text-base sm:text-lg font-bold text-navy-900 mt-1 block">{locality.priceTrends.plotAvgKattha}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs text-slate-500 font-semibold block uppercase">2 BHK Rental Rate</span>
              <span className="text-base sm:text-lg font-bold text-navy-900 mt-1 block">{locality.priceTrends.rentalAvg2BHK}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-xs text-slate-500 font-semibold block uppercase">YoY Growth Trend</span>
              <span className="text-base sm:text-lg font-bold text-emerald-600 mt-1 block">+{locality.priceTrends.yoyAppreciation}</span>
            </div>
          </div>
        </div>

        {/* Overview & Key Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                Neighborhood Profile & Ground Reality
              </h2>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {locality.overview}
              </p>

              <h3 className="font-serif text-xl font-bold text-navy-900 pt-4 border-t border-slate-100">
                Prominent Sub-Sectors & Colonies
              </h3>
              <div className="flex flex-wrap gap-2">
                {locality.neighborhoods.map((n, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-light border border-slate-200 text-xs font-semibold text-slate-700">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Why Invest / Buy in this locality */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                Why Buy or Invest in {locality.name}?
              </h2>
              <div className="space-y-3">
                {locality.whyInvest.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 leading-relaxed font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Properties in this Locality */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                    Available Properties in {locality.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Verified properties listed with Shyam Homes
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="text-xs font-bold text-moonstone-700 hover:text-gold-600 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {matchingProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {matchingProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-navy-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                            {prop.status}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-gold-500 text-navy-950 text-xs font-bold px-2.5 py-1 rounded shadow">
                            {prop.price}
                          </div>
                        </div>

                        <div className="p-5 space-y-2.5">
                          <h3 className="font-serif font-bold text-base text-navy-900 group-hover:text-moonstone-700 transition-colors line-clamp-1">
                            {prop.title}
                          </h3>
                          <div className="flex items-center gap-1 text-slate-500 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-moonstone-600" />
                            <span className="truncate">{prop.location}</span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                            {prop.beds && (
                              <span className="flex items-center gap-1">
                                <Bed className="w-3.5 h-3.5 text-slate-400" />
                                {prop.beds} Beds
                              </span>
                            )}
                            {prop.area && (
                              <span className="flex items-center gap-1">
                                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                                {prop.area}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <Link
                          to={`/property/${prop.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-surface-light hover:bg-navy-900 hover:text-white text-navy-900 font-bold py-2 rounded-xl text-xs transition-colors border border-slate-200"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
                  <p className="text-slate-600 text-sm">
                    We have several unlisted private plots and houses in {locality.name}. Contact our consultant directly for confidential owner listings.
                  </p>
                  <a
                    href={`https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire for {locality.name} Inventory</span>
                  </a>
                </div>
              )}
            </div>

            {/* FAQs */}
            {locality.faqs && locality.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900 flex items-center gap-2 mb-4">
                  <HelpCircle className="w-6 h-6 text-moonstone-600" />
                  <span>Frequently Asked Questions — {locality.name}</span>
                </h2>
                {locality.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <h3 className="font-serif font-bold text-base text-navy-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Transit & Consultation */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Transit & Key Landmarks */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-moonstone-600" />
                <span>Connectivity & Distances</span>
              </h3>
              <div className="space-y-3 text-xs">
                {locality.connectivity.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-700">{c.hub}</span>
                    <span className="font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{c.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation */}
            <div className="bg-navy-900 rounded-3xl p-7 text-white border border-gold-500/30 shadow-xl space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                Site Visit Assistance
              </span>
              <h3 className="font-serif text-xl font-bold">
                Book a Property Visit in {locality.name}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Accompanied physical property visits with consultant Dhananjay Kumar. Vehicle support and ground legal inspection provided.
              </p>
              <div className="pt-2 space-y-2.5">
                <a
                  href="tel:7858832545"
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 7858832545</span>
                </a>
                <a
                  href={`https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Consultant</span>
                </a>
              </div>
            </div>

            {/* Other Localities Links */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-navy-900">
                Other Patna Localities
              </h3>
              <div className="flex flex-wrap gap-2">
                {localitiesDetailed.filter((l) => l.slug !== locality.slug).map((l) => (
                  <Link
                    key={l.slug}
                    to={`/locations/${l.slug}`}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-gold-500 hover:text-navy-950 text-slate-700 transition-colors"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
