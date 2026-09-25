import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#eaf5f8] to-[#d8edf3] text-gunmetal-900 border-t border-lightblue-300 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-lightblue-200">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes — Real Estate & Property Consultants"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Your trusted on-ground property consultant in Patna. Offering comprehensive services for buying, selling, and leasing residential, commercial, and land assets.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-md bg-white border border-lightblue-300 text-moonstone-700 shadow-sm">
                Buy • Sell • Rent
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Plots • Houses • Flats • Commercial Properties
              </p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-moonstone-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-moonstone-600 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-moonstone-600 transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-primary-600 transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="hover:text-primary-700 font-semibold transition-colors text-gunmetal-800">
                  List Your Property ↗
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-moonstone-600 transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-moonstone-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-moonstone-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Property Types
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/properties?category=Plots" className="hover:text-moonstone-600 transition-colors">
                  Plots
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Houses" className="hover:text-moonstone-600 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Flats" className="hover:text-moonstone-600 transition-colors">
                  Flats
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Commercial" className="hover:text-moonstone-600 transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-moonstone-600 transition-colors">
                  Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Contact Consultant
            </h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="font-bold text-gunmetal-900 text-base">
                Dhananjay Kumar
              </div>
              <p className="text-xs text-slate-500">
                Real Estate & Property Consultant
              </p>

              <div className="pt-1">
                <a
                  href="tel:7858832545"
                  className="inline-flex items-center gap-2 text-moonstone-700 font-bold hover:underline"
                >
                  <Phone className="w-4 h-4 text-moonstone-600" />
                  <span>7858832545</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-600 text-xs">
                <MapPin className="w-4 h-4 text-moonstone-600 shrink-0" />
                <span>Patna, Bihar</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20need%20property%20assistance%20in%20Patna."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gunmetal-900 hover:bg-gunmetal-800 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Shyam Homes. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-moonstone-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-moonstone-600 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/admin/login" className="text-slate-500 hover:text-moonstone-600 transition-colors">
              Admin Portal
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-moonstone-600 transition-colors"
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
