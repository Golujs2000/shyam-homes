import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Phone, MessageCircle, Send, ShieldCheck, TrendingUp, Users, FileCheck, Upload, Camera, Trash2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { propertyTypes, localities } from '../data/localities';

export default function SellPage() {
  const { addLead, settings } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Plot',
    locality: 'Kankarbagh',
    area: '',
    expectedPrice: '',
    message: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    addLead({
      name: formData.name,
      phone: formData.phone,
      type: 'Seller',
      propertyType: formData.propertyType,
      locality: formData.locality,
      area: formData.area,
      expectedPrice: formData.expectedPrice,
      message: formData.message,
    });

    const msg = `*New Property Listing for Sale - Shyam Homes*\n\n` +
      `*Owner Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Type:* ${formData.propertyType}\n` +
      `*Locality in Patna:* ${formData.locality}\n` +
      `*Area Size:* ${formData.area || 'Not specified'}\n` +
      `*Expected Price:* ${formData.expectedPrice || 'Open to discussion'}\n` +
      `*Details:* ${formData.message || 'I want to sell my property'}`;

    window.open(`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm">
            Property Sellers Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Sell Your Property with <span className="text-moonstone-600 italic font-normal">Shyam Homes</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Connect directly with verified, pre-qualified buyers across Patna. Fast turnaround, transparent valuation, and end-to-end registration assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-lightblue-200/80">
            <a
              href="tel:7858832545"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-moonstone-500 hover:bg-moonstone-600 text-white font-bold text-sm shadow-md transition-all w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>Call 7858832545 for Valuation</span>
            </a>
            <a
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20want%20to%20list%20my%20property%20for%20sale%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-gunmetal-900 font-semibold text-sm border border-lightblue-300 shadow-sm transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-moonstone-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Main Grid: Form & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-premium">
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                List Your Property For Sale
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill in your property specifications and our senior consultant will connect with you.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-gold-500/10 border border-gold-500/30 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-gold-500 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-navy-900">Listing Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {formData.name}. Dhananjay Kumar will review your property details and contact you on <strong>{formData.phone}</strong> to coordinate a quick site visit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider"
                >
                  List Another Property
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Prakash"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="Plot">Residential Plot</option>
                      <option value="House">Independent House / Villa</option>
                      <option value="Flat">Apartment / Flat</option>
                      <option value="Commercial">Commercial Showroom / Shop</option>
                      <option value="Land">Commercial / Bulk Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Patna Locality
                    </label>
                    <select
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      {localities.map((loc) => (
                        <option key={loc.name} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Area (Sq.ft or Kattha)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1,500 sq.ft or 1.5 Kattha"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Expected Selling Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 65 Lakh"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Property Description & Facing
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Floor details, road width, age of property, clear title status..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                {/* Optional Property Photos Upload */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Upload Property Photos (Optional)
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formData.photos.length} {formData.photos.length === 1 ? 'photo' : 'photos'} added
                    </span>
                  </div>

                  <label className="border-2 border-dashed border-slate-300 hover:border-gold-400 bg-slate-50 hover:bg-gold-50/20 rounded-2xl p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1.5 block">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach((file) => {
                          if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              setFormData((prev) => ({
                                ...prev,
                                photos: [...prev.photos, evt.target.result]
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        });
                      }}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-navy-950">
                      Click to upload photos of your property
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Upload exterior, bedroom, living room, or road view photos
                    </p>
                  </label>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                      {formData.photos.map((photo, pIdx) => (
                        <div key={pIdx} className="relative h-20 rounded-xl overflow-hidden border border-slate-200 group">
                          <img src={photo} alt={`Upload ${pIdx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                photos: prev.photos.filter((_, i) => i !== pIdx)
                              }));
                            }}
                            className="absolute inset-0 bg-rose-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Property for Sale</span>
                </button>
              </form>
            )}
          </div>

          {/* Seller Benefits Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-900 text-white p-8 rounded-3xl border border-navy-800 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white">
                Why Sell Through Shyam Homes?
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Active Buyer Pool in Patna</h4>
                    <p className="text-xs text-slate-300 mt-0.5">We maintain an active database of pre-screened buyers looking for plots, homes, and commercial units.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Market Valuation Guidance</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Avoid under-selling. Get accurate price estimates based on real recent transactions in your colony.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Smooth Registry & Paperwork</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Assistance with agreement to sale, non-encumbrance certificate, and registry execution in Patna.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800">
                <div className="text-xs text-slate-400 uppercase tracking-widest">Consultant Incharge</div>
                <div className="text-lg font-serif font-bold text-gold-400 mt-1">Dhananjay Kumar</div>
                <div className="text-xs text-slate-300">📞 7858832545 • Patna, Bihar</div>
              </div>
            </div>

            {/* Quick 4 Steps Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-3">
              <h4 className="font-serif text-lg font-bold text-navy-900">How Selling Works</h4>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-gold-400 text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Share property specs via form or WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-gold-400 text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Free on-site verification & market pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-gold-400 text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Coordinated visits with serious prospective buyers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-gold-400 text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
                  <span>Token agreement & final registry support</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
