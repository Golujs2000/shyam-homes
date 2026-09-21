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
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-lightblue-200'
          : 'bg-[#eaf5f8]/90 backdrop-blur-sm py-4 border-b border-lightblue-200/70'
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
                      ? 'text-moonstone-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-moonstone-500'
                      : 'text-gunmetal-900/80 hover:text-moonstone-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-moonstone-500 hover:after:w-full after:transition-all after:duration-200'
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
              className="flex items-center gap-2 text-gunmetal-900 hover:text-moonstone-600 transition-colors font-semibold text-sm group px-3 py-1.5 rounded-full hover:bg-lightblue-100"
            >
              <div className="w-8 h-8 rounded-full bg-lightblue-100 flex items-center justify-center text-moonstone-600 group-hover:bg-moonstone-500 group-hover:text-white transition-colors border border-lightblue-200">
                <Phone className="w-4 h-4" />
              </div>
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-gunmetal-950 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-gunmetal-950 text-saffron-500" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile & Tablet Right Icons (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:7858832545"
              className="hidden sm:flex items-center gap-1.5 text-xs text-moonstone-700 font-semibold px-2.5 py-1.5 rounded-lg bg-lightblue-100 border border-lightblue-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-saffron-500 text-gunmetal-950 flex items-center justify-center hover:bg-saffron-400 transition-colors shadow-sm"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-5 h-5 fill-gunmetal-950 text-saffron-500" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg bg-lightblue-100 text-gunmetal-900 flex items-center justify-center hover:bg-lightblue-200 transition-colors focus:outline-none border border-lightblue-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-lightblue-200 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="py-2.5 border-b border-lightblue-200/80 mb-2 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-moonstone-600 uppercase tracking-widest font-semibold">
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
                      ? 'bg-lightblue-100 text-moonstone-700 font-bold'
                      : 'text-gunmetal-900 hover:text-moonstone-600 hover:bg-lightblue-50 font-medium'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 mt-2 border-t border-lightblue-200 space-y-2.5">
            <a
              href="tel:7858832545"
              className="w-full flex items-center justify-center gap-2 py-3 bg-lightblue-100 text-gunmetal-900 font-semibold rounded-lg text-sm hover:bg-lightblue-200 transition-colors border border-lightblue-200"
            >
              <Phone className="w-4 h-4 text-moonstone-600" />
              <span>Call 7858832545</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-saffron-500 text-gunmetal-950 font-bold rounded-lg text-sm hover:bg-saffron-400 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-gunmetal-950 text-saffron-500" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
