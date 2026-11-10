import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, FileText, BookOpen, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { servicesList, localitiesDetailed, guidesList } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function HtmlSitemapPage() {
  const breadcrumbItems = [
    { name: 'HTML Sitemap', url: '/sitemap' }
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="HTML Sitemap — Shyam Homes Patna Real Estate"
        description="Comprehensive website sitemap for Shyam Homes. Navigate all property services, Patna locality guides, educational real estate articles, listings, and contact pages."
        canonical="/sitemap"
        schemas={[getBreadcrumbSchema(breadcrumbItems)]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider border border-lightblue-300 shadow-sm mt-3">
            Website Directory
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Complete Website <span className="text-moonstone-600 italic font-normal">Sitemap</span>
          </h1>
          <p className="text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Quickly navigate all sections of Shyam Homes: real estate services, Patna neighborhood guides, property categories, educational articles, and customer care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Core Pages */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <Home className="w-5 h-5 text-gold-500" />
              <h2>Core Pages</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/" className="hover:text-moonstone-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-moonstone-600">About Shyam Homes</Link></li>
              <li><Link to="/properties" className="hover:text-moonstone-600">All Property Listings</Link></li>
              <li><Link to="/buy" className="hover:text-moonstone-600">Buy Property</Link></li>
              <li><Link to="/sell" className="hover:text-moonstone-600">Sell Property</Link></li>
              <li><Link to="/rent" className="hover:text-moonstone-600">Rent Property</Link></li>
              <li><Link to="/list-property" className="hover:text-moonstone-600">List Your Property For Sale/Rent</Link></li>
              <li><Link to="/case-studies" className="hover:text-moonstone-600">Verified Case Studies & Deals</Link></li>
              <li><Link to="/testimonials" className="hover:text-moonstone-600">Client Reviews & Testimonials</Link></li>
              <li><Link to="/faqs" className="hover:text-moonstone-600">Frequently Asked Questions (FAQs)</Link></li>
              <li><Link to="/contact" className="hover:text-moonstone-600">Contact & Office Location</Link></li>
            </ul>
          </div>

          {/* 2. Real Estate Services */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <Layers className="w-5 h-5 text-moonstone-600" />
              <h2>Real Estate Services</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <Link to="/services" className="font-bold text-moonstone-700 hover:underline">
                  All Services Overview ↗
                </Link>
              </li>
              {servicesList.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-moonstone-600">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Patna Locality Guides */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2>Patna Localities</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <Link to="/locations" className="font-bold text-moonstone-700 hover:underline">
                  All Locations Directory ↗
                </Link>
              </li>
              {localitiesDetailed.map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/locations/${loc.slug}`} className="hover:text-moonstone-600">
                    Property in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Educational Guides & Articles */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <h2>Educational Guides</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <Link to="/guides" className="font-bold text-moonstone-700 hover:underline">
                  Guides & Resources Index ↗
                </Link>
              </li>
              {guidesList.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`} className="hover:text-moonstone-600">
                    {g.shortTitle || g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Property Categories */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <Home className="w-5 h-5 text-gold-500" />
              <h2>Property Categories</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/properties?category=Plots" className="hover:text-moonstone-600">Plots & Land in Patna</Link></li>
              <li><Link to="/properties?category=Houses" className="hover:text-moonstone-600">Houses & Kothis in Patna</Link></li>
              <li><Link to="/properties?category=Flats" className="hover:text-moonstone-600">Flats & Apartments in Patna</Link></li>
              <li><Link to="/properties?category=Commercial" className="hover:text-moonstone-600">Commercial Spaces & Shops</Link></li>
              <li><Link to="/rent" className="hover:text-moonstone-600">Rental Properties in Patna</Link></li>
            </ul>
          </div>

          {/* 6. Legal & Policy Pages */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-navy-900 font-serif font-bold text-xl pb-3 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              <h2>Legal & Compliance</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/privacy" className="hover:text-moonstone-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-moonstone-600">Terms & Conditions</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-moonstone-600">Cookie Policy</Link></li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-moonstone-600 text-moonstone-700 font-semibold">
                  XML Sitemap (For Search Engines) ↗
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-moonstone-600 text-slate-500">
                  Robots.txt ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
