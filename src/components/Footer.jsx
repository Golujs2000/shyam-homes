import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ArrowUp, Mail, Clock, ExternalLink } from 'lucide-react';
import { servicesList, localitiesDetailed, guidesList, siteConfig } from '../data/seoContentData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#eaf5f8] to-[#d8edf3] text-gunmetal-900 border-t border-lightblue-300 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-lightblue-200">
          {/* Brand Info & Consultant NAP (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes — Real Estate & Property Consultants Patna"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Patna’s premier on-ground real estate consultancy led by Dhananjay Kumar. Assisting families, investors, and businesses with 100% verified residential plots, flats, commercial property, and title due diligence.
            </p>

            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-lightblue-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-moonstone-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Office:</strong> {siteConfig.officeAddress.street}, {siteConfig.officeAddress.locality}, {siteConfig.officeAddress.city}, {siteConfig.officeAddress.state} - {siteConfig.officeAddress.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-moonstone-600 shrink-0" />
                <span>
                  <strong>Phone:</strong> <a href="tel:7858832545" className="hover:underline font-semibold text-moonstone-700">7858832545</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-moonstone-600 shrink-0" />
                <span>
                  <strong>Email:</strong> <a href="mailto:info@shyamhomes.com" className="hover:underline">info@shyamhomes.com</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-moonstone-600 shrink-0" />
                <span>
                  <strong>Hours:</strong> Mon - Sun: 9:00 AM - 8:00 PM
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-moonstone-700 hover:text-moonstone-900 font-bold hover:underline"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 1. Real Estate Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/services" className="font-bold text-moonstone-700 hover:underline">
                  All Services ↗
                </Link>
              </li>
              {servicesList.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-moonstone-600 transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Prime Patna Localities (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Patna Localities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/locations" className="font-bold text-moonstone-700 hover:underline">
                  All Localities ↗
                </Link>
              </li>
              {localitiesDetailed.slice(0, 6).map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/locations/${loc.slug}`} className="hover:text-moonstone-600 transition-colors">
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Guides & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Guides & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/guides" className="font-bold text-moonstone-700 hover:underline">
                  Knowledge Hub ↗
                </Link>
              </li>
              {guidesList.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`} className="hover:text-moonstone-600 transition-colors line-clamp-1">
                    {g.shortTitle}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/faqs" className="hover:text-moonstone-600 transition-colors font-medium text-slate-800">
                  Patna FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Quick Actions & Trust (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 font-sans">
              Trust & Connect
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/list-property" className="text-gunmetal-900 font-bold hover:text-moonstone-700">
                  + List Your Property ↗
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-moonstone-600 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-moonstone-600 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-moonstone-600 transition-colors">
                  About Consultant
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-moonstone-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20need%20property%20assistance%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gunmetal-900 hover:bg-gunmetal-800 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Sitemap Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Shyam Homes. All Rights Reserved. • Patna, Bihar, India.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <Link to="/sitemap" className="hover:text-moonstone-600 font-medium text-slate-700 transition-colors">
              HTML Sitemap
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-moonstone-600 transition-colors">
              XML Sitemap
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/privacy" className="hover:text-moonstone-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-moonstone-600 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/cookie-policy" className="hover:text-moonstone-600 transition-colors">
              Cookie Policy
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-600 transition-colors">
              Admin
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
