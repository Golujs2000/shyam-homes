import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ChevronRight, ChevronDown, Building2, MapPin, BookOpen, Layers } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Services', path: '/services' },
    { label: 'Locations', path: '/locations' },
    { label: 'Guides', path: '/guides' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const listPropertyUrl = '/list-property';
  const whatsappUrl = "https://wa.me/917858832545?text=" + encodeURIComponent("Hello Shyam Homes, I am looking for property assistance in Patna.");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-500 shadow-lg py-2.5 border-b border-primary-600'
          : 'bg-primary-500 py-3.5 border-b border-primary-600/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group text-left py-0.5 shrink-0">
            <div className="bg-white rounded-xl px-2.5 sm:px-3 py-1.5 shadow-sm border border-primary-300 transition-transform group-hover:scale-[1.02]">
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes — Real Estate & Property Consultants Patna"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-gunmetal-950 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gunmetal-950 after:rounded-full'
                      : 'text-gunmetal-900 hover:text-gunmetal-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-gunmetal-950 hover:after:w-full after:transition-all after:duration-200 after:rounded-full'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side Actions (Desktop >= xl) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to={listPropertyUrl}
              className="inline-flex items-center gap-1.5 bg-gunmetal-950 hover:bg-gunmetal-900 text-primary-400 px-3.5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>+ List Property</span>
            </Link>

            <a
              href="tel:7858832545"
              className="flex items-center gap-1.5 text-gunmetal-950 hover:text-gunmetal-900 transition-colors font-semibold text-xs sm:text-sm px-2.5 py-1.5 rounded-full hover:bg-primary-400/50"
            >
              <div className="w-7 h-7 rounded-full bg-gunmetal-950/10 flex items-center justify-center text-gunmetal-950">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gunmetal-950 hover:bg-gunmetal-900 text-white px-3.5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile & Tablet Right Icons (Visible below xl) */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="tel:7858832545"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gunmetal-950 font-semibold px-2.5 py-1.5 rounded-lg bg-gunmetal-950/10 border border-gunmetal-950/20"
            >
              <Phone className="w-3.5 h-3.5 text-gunmetal-950" />
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-gunmetal-950 text-primary-400 flex items-center justify-center hover:bg-gunmetal-900 transition-colors shadow-sm"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-4 h-4 fill-primary-400 text-gunmetal-950" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg bg-gunmetal-950/10 text-gunmetal-950 flex items-center justify-center hover:bg-gunmetal-950/20 transition-colors focus:outline-none border border-gunmetal-950/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-primary-500 border-b border-primary-600 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="py-2.5 border-b border-gunmetal-950/20 mb-2 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <div className="bg-white rounded-lg px-2 py-1 inline-block">
                <img
                  src="/shyam homes logo.png"
                  alt="Shyam Homes"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-[11px] text-gunmetal-950 uppercase tracking-widest font-bold">
              Patna Property Advisory
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-gunmetal-950/15 text-gunmetal-950 font-bold border-l-4 border-gunmetal-950'
                      : 'text-gunmetal-900 hover:text-gunmetal-950 hover:bg-gunmetal-950/10 font-medium'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gunmetal-800" />
              </NavLink>
            ))}
          </div>

          {/* Extra Mobile Links for SEO Discovery */}
          <div className="pt-2 border-t border-gunmetal-950/15 grid grid-cols-2 gap-2 text-xs">
            <Link to="/case-studies" className="p-2 rounded bg-white/40 text-gunmetal-900 font-medium">
              Case Studies ↗
            </Link>
            <Link to="/testimonials" className="p-2 rounded bg-white/40 text-gunmetal-900 font-medium">
              Reviews ↗
            </Link>
            <Link to="/faqs" className="p-2 rounded bg-white/40 text-gunmetal-900 font-medium">
              Patna FAQs ↗
            </Link>
            <Link to="/sitemap" className="p-2 rounded bg-white/40 text-gunmetal-900 font-medium">
              HTML Sitemap ↗
            </Link>
          </div>

          <div className="pt-3 border-t border-gunmetal-950/20 space-y-2">
            <Link
              to={listPropertyUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gunmetal-950 text-primary-400 font-bold rounded-lg text-xs hover:bg-gunmetal-900 transition-colors shadow-sm"
            >
              <span>+ List Your Property</span>
            </Link>
            <a
              href="tel:7858832545"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-400/50 text-gunmetal-950 font-semibold rounded-lg text-xs hover:bg-primary-400/70 transition-colors border border-gunmetal-950/20"
            >
              <Phone className="w-3.5 h-3.5 text-gunmetal-950" />
              <span>Call 7858832545</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gunmetal-900 text-white font-bold rounded-lg text-xs hover:bg-gunmetal-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Consultant</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
