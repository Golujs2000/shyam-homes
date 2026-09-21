import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Building2, ChevronRight } from 'lucide-react';

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
    { label: 'Buy', path: '/buy' },
    { label: 'Sell', path: '/sell' },
    { label: 'Rent', path: '/rent' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const whatsappUrl = "https://wa.me/917858832545?text=" + encodeURIComponent("Hello Shyam Homes, I am looking for property assistance in Patna.");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-lg py-3 border-b border-navy-800/80'
          : 'bg-navy-950/90 md:bg-navy-950/80 backdrop-blur-sm py-4 border-b border-navy-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group text-left py-0.5">
            <img
              src="/shyam homes logo.png"
              alt="Shyam Homes — Real Estate & Property Consultants Patna"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-gold-400 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gold-400'
                      : 'text-slate-200 hover:text-gold-400 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side Actions (Desktop >= lg) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:7858832545"
              className="flex items-center gap-2 text-white hover:text-gold-400 transition-colors font-semibold text-sm group px-3 py-1.5 rounded-full hover:bg-navy-900"
            >
              <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors border border-navy-800">
                <Phone className="w-4 h-4" />
              </div>
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-navy-950 text-gold-500" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile & Tablet Right Icons (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:7858832545"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gold-400 font-semibold px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-800"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center hover:bg-gold-400 transition-colors"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-5 h-5 fill-navy-950 text-gold-500" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg bg-navy-900 text-white flex items-center justify-center hover:bg-navy-800 transition-colors focus:outline-none border border-navy-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-navy-800 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="py-2.5 border-b border-navy-800/80 mb-2 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold">
              Patna Property Advisory
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2.5 px-3 rounded-md text-base transition-colors ${
                    isActive
                      ? 'bg-navy-900 text-gold-400 font-bold'
                      : 'text-slate-200 hover:text-gold-400 hover:bg-navy-900/60 font-medium'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 mt-2 border-t border-navy-800 space-y-2.5">
            <a
              href="tel:7858832545"
              className="w-full flex items-center justify-center gap-2 py-3 bg-navy-900 text-white font-semibold rounded-lg text-sm hover:bg-navy-800 transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call 7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gold-500 text-navy-950 font-bold rounded-lg text-sm hover:bg-gold-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-navy-950 text-gold-500" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
