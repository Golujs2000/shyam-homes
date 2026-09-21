import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-3xl border border-slate-200/90 shadow-sm mt-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Legal & Trust</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
          Privacy Policy — Shyam Homes
        </h1>

        <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
          <p>
            At <strong>Shyam Homes</strong> (Real Estate & Property Consultants, Patna), we value the trust of our clients, property buyers, sellers, landlords, and tenants. This Privacy Policy describes how we handle and protect personal information collected through our website and consulting interactions.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">1. Information We Collect</h2>
          <p>
            When you submit a property search enquiry, schedule a site visit, or request to sell or rent your property, we collect:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600">
            <li>Your name and contact phone / WhatsApp number</li>
            <li>Email address (if voluntarily provided)</li>
            <li>Property requirements (budget, locality preference, property type)</li>
            <li>Property ownership details submitted for listing purposes</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">2. How We Use Your Information</h2>
          <p>
            Information collected is strictly used to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600">
            <li>Coordinate site visits and share verified property brochures</li>
            <li>Connect property sellers with qualified, serious buyers</li>
            <li>Verify legal titles and coordinate documentation with Patna registry offices</li>
            <li>Provide real-time market updates and circle rate consultations</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">3. Data Security & Non-Disclosure</h2>
          <p>
            We maintain strict client confidentiality. Your contact numbers and property details are never sold, rented, or distributed to unauthorized third-party telemarketers.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">4. Contact Information</h2>
          <p>
            For any queries regarding this policy, reach out directly to <strong>Dhananjay Kumar</strong> at <strong>7858832545</strong> or visit us in Patna, Bihar.
          </p>
        </div>
      </div>
    </div>
  );
}
