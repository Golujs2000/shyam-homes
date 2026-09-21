import React, { useState } from 'react';
import { Search, Home, Building, MapPin, IndianRupee, Maximize2, Check } from 'lucide-react';
import { localities, propertyTypes, budgetRanges, areaRanges } from '../data/localities';

export default function PropertySearch({ onSearch, currentFilters }) {
  const [activeTab, setActiveTab] = useState('BUY'); // 'BUY' or 'RENT'
  const [selectedType, setSelectedType] = useState('All Properties');
  const [selectedLocation, setSelectedLocation] = useState('All Patna');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [searchedNotice, setSearchedNotice] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        purpose: activeTab,
        type: selectedType,
        location: selectedLocation,
        budget: selectedBudget,
        area: selectedArea,
      });
    }

    setSearchedNotice(true);
    setTimeout(() => setSearchedNotice(false), 3500);

    // Smoothly scroll down to properties section
    const elem = document.querySelector('#properties');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedBudget('All Budgets');
  };

  return (
    <div className="relative z-30 -mt-16 md:-mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 sm:p-7 md:p-8 backdrop-blur-xl">
        {/* Top Header: Heading & BUY/RENT Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-900">
              What are you looking for?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Filter verified residential & commercial properties in Patna
            </p>
          </div>

          {/* BUY | RENT Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => handleTabChange('BUY')}
              className={`px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'BUY'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('RENT')}
              className={`px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'RENT'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              RENT
            </button>
          </div>
        </div>

        {/* Search Fields Grid */}
        <form onSubmit={handleSearch} className="pt-5 sm:pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Field 1: Property Type */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="All Properties">All Properties</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Field 2: Location */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Location
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="All Patna">Patna (All Localities)</option>
                  {localities.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Field 3: Budget */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Budget
              </label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="All Budgets">Select Budget</option>
                  {budgetRanges[activeTab].map((b) => (
                    <option key={b.label} value={b.label}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Field 4: Property Area */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Property Area
              </label>
              <div className="relative">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="All Areas">Select Area</option>
                  {areaRanges.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Showing verified listings across Patna directly managed by Shyam Homes</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-navy-900 hover:bg-navy-800 text-gold-400 hover:text-gold-300 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 uppercase tracking-wider text-sm group"
            >
              <Search className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              <span>SEARCH PROPERTY</span>
            </button>
          </div>
        </form>

        {/* Feedback notice */}
        {searchedNotice && (
          <div className="mt-4 p-3 rounded-lg bg-gold-50 border border-gold-200 text-gold-900 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-gold-600" />
            <span>
              Searching for <strong>{activeTab}</strong> properties: {selectedType} in {selectedLocation}. Results updated below!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
