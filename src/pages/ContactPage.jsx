import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import FAQSection from '../components/FAQSection';

export default function ContactPage() {
  const { addEnquiry, settings } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Buying Property',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    addEnquiry({
      clientName: formData.name,
      phone: formData.phone,
      email: formData.email,
      purpose: formData.purpose,
      message: formData.message,
    });

    const msg = `*Contact Enquiry - Shyam Homes*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Purpose:* ${formData.purpose}\n` +
      `*Message:* ${formData.message}`;

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
            Get in Touch
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Contact <span className="text-gold-gradient">Shyam Homes</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Reach out directly to property consultant Dhananjay Kumar. We are available 7 days a week for property inquiries, site visits, and consultation across Patna.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900">Direct Phone</h3>
              <p className="text-xs text-slate-500 mt-1">Speak directly with consultant</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <a href="tel:7858832545" className="text-base font-bold text-navy-900 hover:text-gold-600 transition-colors">
                7858832545
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 mt-1">Instant brochure & location sharing</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20would%20like%20to%20inquire%20about%20properties%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-emerald-600 hover:underline"
              >
                Chat on 7858832545
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900">Coverage Location</h3>
              <p className="text-xs text-slate-500 mt-1">All key residential corridors</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-sm font-bold text-navy-900">
                Patna, Bihar
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900">Consulting Hours</h3>
              <p className="text-xs text-slate-500 mt-1">Available 7 days for visits</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-navy-900">
                Mon - Sun: 9:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form & Office Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-premium">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
              Send an Enquiry
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Leave your details below and we will get back to you within 2 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-gold-500/10 border border-gold-500/30 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-gold-500 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-navy-900">Message Sent!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {formData.name}. Dhananjay Kumar has received your message and will connect with you on <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alok Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number *
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
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Inquiry Purpose
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="Buying Property">Looking to Buy Property</option>
                      <option value="Selling Property">Looking to Sell Property</option>
                      <option value="Renting Property">Looking for Rental Accommodation</option>
                      <option value="Commercial Space">Commercial Lease / Purchase</option>
                      <option value="General Consultation">General Property Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Requirement or Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Preferred locality in Patna, budget, property type, or specific question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Consultant Bio & Service Areas */}
          <div className="lg:col-span-5 bg-navy-900 text-white p-8 sm:p-10 rounded-3xl border border-navy-800 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Principal Consultant</span>
              <h3 className="font-serif text-3xl font-bold text-white mt-1">Dhananjay Kumar</h3>
              <p className="text-sm text-slate-300 mt-1">Shyam Homes • Real Estate & Property Consultants</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              We provide on-ground assistance with accurate circle rates, legal verification, site visits, and negotiation for plots, homes, and commercial units in Patna.
            </p>

            <div className="space-y-3 pt-4 border-t border-navy-800 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <a href="tel:7858832545" className="hover:text-gold-400 font-bold">7858832545</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Patna, Bihar (Kankarbagh, Boring Rd, Bailey Rd, Danapur)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800">
              <a
                href="https://wa.me/917858832545?text=Hello%20Dhananjay%20ji,%20I%20need%20property%20assistance%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-gold-glow"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <FAQSection />
      </div>
    </div>
  );
}
