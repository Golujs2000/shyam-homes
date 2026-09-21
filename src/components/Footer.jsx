import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-navy-950 text-white border-t border-navy-800 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes — Real Estate & Property Consultants"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your trusted on-ground property consultant in Patna. Offering comprehensive services for buying, selling, and leasing residential, commercial, and land assets.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-md bg-navy-900 border border-gold-500/30 text-gold-300">
                Buy • Sell • Rent
              </span>
              <p className="text-xs text-slate-400 mt-2">
                Plots • Houses • Flats • Commercial Properties
              </p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-gold-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-gold-400 transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-gold-400 transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-gold-400 transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-sans">
              Property Types
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/properties?category=Plots" className="hover:text-gold-400 transition-colors">
                  Plots
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Houses" className="hover:text-gold-400 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Flats" className="hover:text-gold-400 transition-colors">
                  Flats
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Commercial" className="hover:text-gold-400 transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-gold-400 transition-colors">
                  Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 font-sans">
              Contact Consultant
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="font-semibold text-white text-base">
                Dhananjay Kumar
              </div>
              <p className="text-xs text-slate-400">
                Real Estate & Property Consultant
              </p>

              <div className="pt-1">
                <a
                  href="tel:7858832545"
                  className="inline-flex items-center gap-2 text-gold-400 font-bold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>7858832545</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Patna, Bihar</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20need%20property%20assistance%20in%20Patna."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-navy-950" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>© 2026 Shyam Homes. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link to="/admin/login" className="text-slate-500 hover:text-gold-400 transition-colors">
              Admin Portal
            </Link>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-gold-400 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
