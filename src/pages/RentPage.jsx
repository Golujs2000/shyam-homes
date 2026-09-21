import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, MapPin, Bed, Bath, Maximize2, MessageCircle, Phone, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { localities } from '../data/localities';

export default function RentPage() {
  const { properties, addLead, settings } = useAdminData();
  const rentalProperties = properties.filter((p) => p.status === 'FOR RENT');
  const [tenantForm, setTenantForm] = useState({
    name: '',
    phone: '',
    type: '2 BHK Flat',
    locality: 'Patliputra Colony',
    occupantType: 'Family',
    budget: '₹ 15,000 - ₹ 22,000 / mo'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTenantSubmit = (e) => {
    e.preventDefault();

    addLead({
      name: tenantForm.name,
      phone: tenantForm.phone,
      type: 'Buyer',
      propertyType: tenantForm.type,
      locality: tenantForm.locality,
      budget: tenantForm.budget,
      message: `Tenant looking for ${tenantForm.type} for ${tenantForm.occupantType} in ${tenantForm.locality} (${tenantForm.budget})`,
    });

    const msg = `*Rental Enquiry - Shyam Homes*\n\n` +
      `*Name:* ${tenantForm.name}\n` +
      `*Phone:* ${tenantForm.phone}\n` +
      `*Looking for:* ${tenantForm.type}\n` +
      `*Occupant:* ${tenantForm.occupantType}\n` +
      `*Preferred Locality:* ${tenantForm.locality}\n` +
      `*Budget:* ${tenantForm.budget}`;

    window.open(`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Banner */}
      <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-95" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 border border-gold-500/30">
            Rental & Leasing Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Rent Homes & Commercial Spaces in <span className="text-gold-gradient">Patna</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Verified rental apartments, independent builder floors, and prime commercial retail spaces with standardized tenancy agreements and background verification.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Rental Listings */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                Current Rental Listings in Patna
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore verified homes and spaces ready for immediate move-in
              </p>
            </div>

            <a
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20want%20to%20list%20my%20flat%20for%20rent%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold text-xs sm:text-sm self-start sm:self-auto"
            >
              <Key className="w-4 h-4" />
              <span>Landlords: List Your Rental</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProperties.map((property) => (
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
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-md bg-blue-600">
                      FOR RENT
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

                  <div className="grid grid-cols-2 gap-3 pt-5 mt-auto">
                    <Link
                      to={`/property/${property.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                    >
                      <span>View Details</span>
                    </Link>

                    <a
                      href={`https://wa.me/917858832545?text=${encodeURIComponent(`Hello Shyam Homes, I am interested in renting ${property.title} (${property.price}) at ${property.location}.`)}`}
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
        </div>

        {/* Tenant Request Form & Tenancy Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Tenant Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-premium">
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">
              Looking for a Rental Home or Office?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Tell us your requirements and we will match you with verified landlords across Patna.
            </p>

            {submitted ? (
              <div className="p-6 bg-gold-500/10 border border-gold-500/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-gold-500 mx-auto" />
                <h4 className="font-bold text-navy-900 text-lg">Request Forwarded!</h4>
                <p className="text-xs text-slate-600">
                  Our rental desk consultant Dhananjay Kumar will connect with you via WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTenantSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikas Kumar"
                      value={tenantForm.name}
                      onChange={(e) => setTenantForm({ ...tenantForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={tenantForm.phone}
                      onChange={(e) => setTenantForm({ ...tenantForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Property Type
                    </label>
                    <select
                      value={tenantForm.type}
                      onChange={(e) => setTenantForm({ ...tenantForm, type: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="1 BHK Flat">1 BHK Flat</option>
                      <option value="2 BHK Flat">2 BHK Flat</option>
                      <option value="3 BHK Flat">3 BHK Flat</option>
                      <option value="Independent House">House / Villa</option>
                      <option value="Commercial Space">Office / Shop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Occupant
                    </label>
                    <select
                      value={tenantForm.occupantType}
                      onChange={(e) => setTenantForm({ ...tenantForm, occupantType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="Family">Family</option>
                      <option value="Bachelors / Working">Working Professionals</option>
                      <option value="Students">Students</option>
                      <option value="Corporate / Company">Corporate Lease</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Patna Locality
                    </label>
                    <select
                      value={tenantForm.locality}
                      onChange={(e) => setTenantForm({ ...tenantForm, locality: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      {localities.map((loc) => (
                        <option key={loc.name} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Monthly Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 15,000 - ₹ 20,000 / month"
                    value={tenantForm.budget}
                    onChange={(e) => setTenantForm({ ...tenantForm, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-navy-950" />
                  <span>Send Rental Requirement via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Guidelines Box */}
          <div className="lg:col-span-5 bg-navy-900 text-white p-8 rounded-3xl border border-navy-800 space-y-5">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Rental Peace of Mind</span>
            </div>

            <h3 className="font-serif text-2xl font-bold">Standardized Tenancy in Patna</h3>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span><strong>Registered 11-Month Agreements:</strong> Complete drafting with stamp paper and notary clauses.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span><strong>Clear Deposit Terms:</strong> Standard 1-2 month security deposit with documented inventory.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span><strong>No Surprise Evictions:</strong> Defined 1-month mutual notice period terms for both parties.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-navy-800">
              <p className="text-xs text-slate-400">Direct rental desk hotline:</p>
              <a href="tel:7858832545" className="text-lg font-serif font-bold text-gold-400 hover:underline">
                Call Dhananjay Kumar: 7858832545
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
