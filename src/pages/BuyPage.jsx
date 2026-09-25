import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Home, Building, MapPin, IndianRupee, MessageCircle, Phone, ArrowRight, HelpCircle } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { propertyTypes, localities } from '../data/localities';

export default function BuyPage() {
  const { properties, addLead, settings } = useAdminData();
  const [selectedType, setSelectedType] = useState('ALL');
  const forSaleProperties = properties.filter(
    (p) => p.status === 'FOR SALE' && (selectedType === 'ALL' || p.type === selectedType)
  );

  const [buyerReq, setBuyerReq] = useState({
    name: '',
    phone: '',
    type: 'Flat',
    locality: 'Kankarbagh',
    budget: '₹ 50 Lakh - ₹ 75 Lakh',
  });
  const [reqSubmitted, setReqSubmitted] = useState(false);

  const handleReqSubmit = (e) => {
    e.preventDefault();

    addLead({
      name: buyerReq.name,
      phone: buyerReq.phone,
      type: 'Buyer',
      propertyType: buyerReq.type,
      locality: buyerReq.locality,
      budget: buyerReq.budget,
      message: `Looking to buy ${buyerReq.type} in ${buyerReq.locality} within ${buyerReq.budget}`,
    });

    const msg = `*Buyer Requirement - Shyam Homes*\n\n` +
      `*Name:* ${buyerReq.name}\n` +
      `*Phone:* ${buyerReq.phone}\n` +
      `*Looking to Buy:* ${buyerReq.type}\n` +
      `*Preferred Locality:* ${buyerReq.locality}\n` +
      `*Budget:* ${buyerReq.budget}`;

    window.open(`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(msg)}`, '_blank');
    setReqSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-gunmetal-900 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm">
            Buyer Advisory Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Buy Verified Properties in <span className="text-primary-600 italic font-normal">Patna</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Find independent houses, modern flats, residential plots and commercial spaces with complete legal verification, transparent documentation, and on-ground site assistance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-lightblue-200/80 max-w-3xl">
            <div className="flex items-center gap-2.5 text-sm text-gunmetal-900">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
              <span>100% Verified Land Titles</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gunmetal-900">
              <CheckCircle2 className="w-5 h-5 text-primary-600" />
              <span>Direct Builder & Owner Deals</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gunmetal-900">
              <CheckCircle2 className="w-5 h-5 text-primary-600" />
              <span>Bank Loan & Registry Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
              Properties Available for Purchase
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing verified sale listings in Patna
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
            {['ALL', 'House', 'Flat', 'Plot', 'Commercial'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  selectedType === type
                    ? 'bg-navy-900 text-gold-400 shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type === 'ALL' ? 'All Sale Properties' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forSaleProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-premium hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-md bg-emerald-600">
                    FOR SALE
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-gold-500/30">
                    {property.type}
                  </span>
                </div>
              </div>

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

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                    {property.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={`/property/${property.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                  >
                    <span>View Details</span>
                  </Link>

                  <a
                    href={`https://wa.me/917858832545?text=${encodeURIComponent(`Hello Shyam Homes, I am interested in buying ${property.title} (${property.price}) at ${property.location}.`)}`}
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

        {/* Dedicated Buyer Assistance Section */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold uppercase tracking-wider">
                Buyer Protection
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 leading-tight">
                Our 4 Guarantees for Property Buyers
              </h3>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-navy-900">Chain of Title Verification</h4>
                    <p className="text-xs sm:text-sm text-slate-500">We inspect Kattha, Khatiyan, and registry papers to avoid land disputes.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-navy-900">Accurate Circle Rate Advisory</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Know the government valuation and fair market price before you commit.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-navy-900">Physical On-Site Inspection</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Accompanied visits to examine road width, water boring, drainage, and neighbors.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">4</div>
                  <div>
                    <h4 className="font-bold text-navy-900">Loan & Registry Facilitation</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Assistance with leading banks (SBI, HDFC, ICICI) and Patna registration office.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Match Form */}
            <div className="lg:col-span-6 bg-navy-950 text-white p-6 sm:p-8 rounded-2xl border border-navy-800">
              <h4 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                Tell Us What You Want to Buy
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Receive handpicked matching properties directly on WhatsApp.
              </p>

              {reqSubmitted ? (
                <div className="p-6 bg-gold-500/10 border border-gold-500/30 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-gold-400 mx-auto" />
                  <h5 className="font-bold text-white text-lg">Requirement Sent!</h5>
                  <p className="text-xs text-slate-300">
                    We will share matching property brochures with you on WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => setReqSubmitted(false)}
                    className="text-xs font-semibold text-gold-400 hover:underline pt-2 block mx-auto"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReqSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunil Sharma"
                      value={buyerReq.name}
                      onChange={(e) => setBuyerReq({ ...buyerReq, name: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={buyerReq.phone}
                      onChange={(e) => setBuyerReq({ ...buyerReq, phone: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Property Type</label>
                      <select
                        value={buyerReq.type}
                        onChange={(e) => setBuyerReq({ ...buyerReq, type: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Flat">Flat / Apartment</option>
                        <option value="House">Independent House</option>
                        <option value="Plot">Residential Plot</option>
                        <option value="Commercial">Commercial Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Preferred Area</label>
                      <select
                        value={buyerReq.locality}
                        onChange={(e) => setBuyerReq({ ...buyerReq, locality: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                      >
                        {localities.map((l) => (
                          <option key={l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Budget Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 40 Lakh - ₹ 65 Lakh"
                      value={buyerReq.budget}
                      onChange={(e) => setBuyerReq({ ...buyerReq, budget: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-navy-950" />
                    <span>Send Requirement on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
