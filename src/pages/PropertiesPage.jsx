import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Bed, Bath, Maximize2, MessageCircle, Filter, RotateCcw, Building2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { localities, propertyTypes } from '../data/localities';
import PropertyModal from '../components/PropertyModal';

export default function PropertiesPage() {
  const { properties } = useAdminData();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const localityParam = searchParams.get('locality');
  const purposeParam = searchParams.get('purpose');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState(purposeParam || 'ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedLocality, setSelectedLocality] = useState(localityParam || 'ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [modalProperty, setModalProperty] = useState(null);

  useEffect(() => {
    if (categoryParam) {
      if (categoryParam === 'Plots') setSelectedType('Plot');
      else if (categoryParam === 'Flats') setSelectedType('Flat');
      else if (categoryParam === 'Houses') setSelectedType('House');
      else if (categoryParam === 'Commercial') setSelectedType('Commercial');
      else if (categoryParam === 'Rental Properties') setSelectedPurpose('FOR RENT');
    }
    if (localityParam) {
      setSelectedLocality(localityParam);
    }
    if (purposeParam) {
      setSelectedPurpose(purposeParam);
    }
  }, [categoryParam, localityParam, purposeParam]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedPurpose('ALL');
    setSelectedType('ALL');
    setSelectedLocality('ALL');
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProperties = properties.filter((p) => {
    // Search keyword
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }

    // Purpose (BUY / RENT)
    if (selectedPurpose === 'BUY' && p.status !== 'FOR SALE') return false;
    if (selectedPurpose === 'RENT' && p.status !== 'FOR RENT') return false;
    if (selectedPurpose === 'FOR SALE' && p.status !== 'FOR SALE') return false;
    if (selectedPurpose === 'FOR RENT' && p.status !== 'FOR RENT') return false;

    // Type
    if (selectedType !== 'ALL' && p.type !== selectedType) return false;

    // Locality
    if (selectedLocality !== 'ALL' && !p.location.includes(selectedLocality)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
    return 0; // Default featured
  });

  const getWhatsAppLink = (prop) => {
    const text = `Hello Shyam Homes, I am interested in "${prop.title}" (${prop.price}) at ${prop.location}. Please share complete details.`;
    return `https://wa.me/917858832545?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen">
      {/* Top Banner */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-95" />
        <div className="relative max-w-7xl mx-auto text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-500/30">
            Patna Real Estate Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Explore Properties in <span className="text-gold-gradient">Patna</span>
          </h1>
          <p className="mt-2 text-slate-300 text-base max-w-2xl">
            Browse verified independent houses, high-rise flats, prime residential plots, and commercial properties across Patna.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filters Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Keyword Search */}
            <div className="lg:col-span-2 relative">
              <input
                type="text"
                placeholder="Search by locality, project or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 bg-slate-50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Purpose: Buy / Rent */}
            <div>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
              >
                <option value="ALL">All Listing Types</option>
                <option value="FOR SALE">Buy (For Sale)</option>
                <option value="FOR RENT">Rent (Rental)</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
              >
                <option value="ALL">All Property Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality */}
            <div>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
              >
                <option value="ALL">All Patna Localities</option>
                {localities.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-bar: Results count, sorting & Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div>
              Showing <strong className="text-navy-900 font-semibold">{filteredProperties.length}</strong> properties matching your criteria
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-navy-900 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-gold-600 font-semibold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-premium hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group text-left"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                      property.status === 'FOR SALE' ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-gold-500/30">
                    {property.type}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-1.5">
                    {property.price}
                  </div>

                  <Link
                    to={`/property/${property.id}`}
                    className="font-serif text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1 block hover:underline"
                  >
                    {property.title}
                  </Link>

                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 py-4 mt-3 border-y border-slate-100 text-xs sm:text-sm text-slate-600">
                    {property.beds && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{property.beds}</span> Beds
                      </div>
                    )}

                    {property.baths && (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{property.baths}</span> Baths
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <Maximize2 className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">{property.area}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-5 mt-auto">
                  <Link
                    to={`/property/${property.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                  >
                    <span>View Details</span>
                  </Link>

                  <a
                    href={getWhatsAppLink(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-gold-glow"
                  >
                    <MessageCircle className="w-4 h-4 fill-navy-950" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300 my-8 p-8">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-navy-900">No properties match your filter</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              We frequently add verified plots, houses, flats, and commercial opportunities across Patna. Speak with our consultant for off-market options.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm"
              >
                Clear Filters
              </button>
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20have%20a%20custom%20property%20requirement%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm shadow-gold-glow"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="mt-16 bg-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Personalized Matching</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Can't find what you are looking for?</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Share your target locality, preferred budget, and configuration. Dhananjay Kumar will shortlist suitable properties directly for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:7858832545"
              className="px-6 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-sm border border-slate-700 text-center"
            >
              Call 7858832545
            </a>
            <a
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20am%20looking%20for%20a%20specific%20property%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow text-center"
            >
              Request Custom Property
            </a>
          </div>
        </div>
      </div>

      {modalProperty && (
        <PropertyModal
          property={modalProperty}
          onClose={() => setModalProperty(null)}
        />
      )}
    </div>
  );
}
