import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="pt-28 pb-20 bg-surface-light min-h-screen text-center px-4">
      <SEO
        title="404 — Page Not Found | Shyam Homes Patna"
        description="The page you are looking for does not exist or has been moved. Explore verified properties, services, and locality guides on Shyam Homes."
        noIndex={true}
      />

      <div className="max-w-2xl mx-auto space-y-6 pt-8">
        <span className="text-6xl sm:text-8xl font-serif font-bold text-navy-900 block tracking-tight">
          404
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          The property page or document you are looking for might have been sold, renamed, or temporarily relocated.
        </p>

        {/* Quick Search & Explore Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
          >
            <Home className="w-4 h-4 text-gold-400" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Browse Properties</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3 rounded-xl text-sm transition-all border border-slate-300"
          >
            <Phone className="w-4 h-4 text-moonstone-600" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Popular Categories Links */}
        <div className="pt-10 border-t border-slate-200 mt-8 text-left max-w-xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <Link to="/properties?category=Plots" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Plots in Patna ↗
            </Link>
            <Link to="/properties?category=Flats" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Flats in Patna ↗
            </Link>
            <Link to="/locations/kankarbagh" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Kankarbagh ↗
            </Link>
            <Link to="/locations/boring-road" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Boring Road ↗
            </Link>
            <Link to="/locations/bihta" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Bihta Land ↗
            </Link>
            <Link to="/faqs" className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-gold-500 text-slate-800 font-medium">
              Patna FAQs ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
