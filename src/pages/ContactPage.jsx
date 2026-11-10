import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Mail, ExternalLink } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getRealEstateAgentSchema, getBreadcrumbSchema } from '../utils/seoSchemas';
import { siteConfig } from '../data/seoContentData';

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

  const breadcrumbItems = [
    { name: 'Contact Us', url: '/contact' }
  ];

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
      <SEO
        title="Contact Us — Office & Site Visit Assistance in Patna | Shyam Homes"
        description="Get in touch with Shyam Homes in Patna. Visit our Kankarbagh office near Tiwary Bechar or call Dhananjay Kumar at +91 7858832545 for verified property inquiries."
        canonical="/contact"
        schemas={[getBreadcrumbSchema(breadcrumbItems), getRealEstateAgentSchema(settings)]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Get in Touch
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Contact <span className="text-moonstone-600 italic font-normal">Shyam Homes</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
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
              <h3 className="font-serif text-lg font-bold text-navy-900">Patna Office</h3>
              <p className="text-xs text-slate-500 mt-1">{siteConfig.officeAddress.street}, {siteConfig.officeAddress.locality}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-navy-900">
                Patna, Bihar - 800020
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
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
              Send an Enquiry
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Leave your details below and consultant Dhananjay Kumar will get back to you promptly.
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
                  className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Consultant Bio & Office Details */}
          <div className="lg:col-span-5 bg-navy-900 text-white p-8 sm:p-10 rounded-3xl border border-navy-800 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Principal Consultant</span>
              <h3 className="font-serif text-3xl font-bold text-white mt-1">Dhananjay Kumar</h3>
              <p className="text-sm text-slate-300 mt-1">Shyam Homes • Real Estate & Property Consultants</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              We provide on-ground assistance with accurate circle rates, legal verification, site visits, and negotiation for plots, homes, and commercial units across Patna.
            </p>

            <div className="space-y-3 pt-4 border-t border-navy-800 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <a href="tel:7858832545" className="hover:text-gold-400 font-bold">7858832545</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{siteConfig.officeAddress.street}, {siteConfig.officeAddress.locality}, Patna - 800020</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800">
              <a
                href="https://wa.me/917858832545?text=Hello%20Dhananjay%20ji,%20I%20need%20property%20assistance%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps Location Embed */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-moonstone-600" />
                <span>Our Office Location in Patna</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kankarbagh Main Road, Near Tiwary Bechar, Patna, Bihar - 800020
              </p>
            </div>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-moonstone-700 hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200">
            <iframe
              title="Shyam Homes Office Location Kankarbagh Patna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.65780517926!2d85.1465223!3d25.5912441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5868a867b14d%3A0x6b4ef84c36199676!2sKankarbagh%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* FAQs */}
        <FAQSection />
      </div>
    </div>
  );
}
