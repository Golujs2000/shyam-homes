import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, ShieldCheck, MapPin, Building } from 'lucide-react';
import { propertyTypes } from '../data/localities';

export default function SellPropertySection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Plot',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    // Prepare WhatsApp message
    const msg = `*New Property Listing Request - Shyam Homes*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Property Type:* ${formData.propertyType}\n` +
      `*Location in Patna:* ${formData.location || 'Patna'}\n` +
      `*Details:* ${formData.message || 'I want to sell my property with Shyam Homes'}`;

    const waUrl = `https://wa.me/917858832545?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    setSubmitted(true);
  };

  return (
    <section id="sell-property" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 rounded-3xl border border-navy-800 text-white overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Information Beside the Form */}
            <div className="lg:col-span-5 p-5 sm:p-10 lg:p-14 bg-navy-900/90 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-navy-800 text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                  Seller Desk
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                  Sell Your Property With Shyam Homes
                </h3>

                <p className="text-slate-300 text-base leading-relaxed">
                  Tell us about your property and our team will get in touch with you. We help you find genuine, verified buyers across Patna quickly.
                </p>

                <div className="space-y-4 pt-4 border-t border-navy-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Genuine Buyers Only</h4>
                      <p className="text-xs text-slate-400">We pre-qualify buyer budgets and genuine purchase intent.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Fair Market Price</h4>
                      <p className="text-xs text-slate-400">Guidance on current registry and market circle rates in your Patna locality.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Complete Legal Assistance</h4>
                      <p className="text-xs text-slate-400">Agreement drafting, mutation guidance, and registration support.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Call Strip */}
              <div className="mt-8 pt-6 border-t border-navy-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Direct Line</span>
                  <a href="tel:7858832545" className="text-xl font-serif font-bold text-gold-400 hover:underline">
                    Call: 7858832545
                  </a>
                </div>

                <a
                  href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20want%20to%20sell%20my%20property%20in%20Patna."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition-colors w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-4 h-4 text-gold-400" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Dedicated Lead-Generation Form */}
            <div className="lg:col-span-7 p-5 sm:p-10 lg:p-14 text-left">
              <div className="max-w-xl mx-auto">
                <div className="mb-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Want to Sell Your Property?
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Get in touch with Shyam Homes and share your property details.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-gold-500/10 border border-gold-500/40 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-white">Property Details Received!</h4>
                    <p className="text-sm text-slate-300">
                      Thank you, {formData.name}. Dhananjay Kumar from Shyam Homes will contact you on <strong>{formData.phone}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', propertyType: 'Plot', location: '', message: '' });
                      }}
                      className="mt-4 px-5 py-2 rounded-xl bg-navy-800 text-xs font-bold text-gold-400 hover:bg-navy-700"
                    >
                      Submit Another Property
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Your Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    {/* Grid: Property Type & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Property Type */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Property Type
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 cursor-pointer"
                        >
                          <option value="Plot">Plot</option>
                          <option value="House">House / Independent</option>
                          <option value="Flat">Flat / Apartment</option>
                          <option value="Commercial">Commercial / Shop</option>
                          <option value="Land">Agricultural / Land</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kankarbagh / Boring Rd"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Message / Property Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief details such as area size, expected price, floor, or status..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2 mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT PROPERTY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
