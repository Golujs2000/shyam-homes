import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-3xl border border-slate-200/90 shadow-sm mt-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
          Terms & Conditions — Shyam Homes
        </h1>

        <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to <strong>Shyam Homes</strong>. By accessing our website or engaging our real estate consultancy services in Patna, Bihar, you agree to comply with the terms and practices outlined below.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">1. Scope of Real Estate Consultancy</h2>
          <p>
            Shyam Homes acts as a professional real estate and property consultancy connecting buyers, sellers, landlords, and tenants. While we take every effort to conduct title searches and physical on-site inspections, buyers and tenants are advised to review final title deeds, registry documents, and encumbrance certificates prior to financial disbursement.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">2. Property Listings & Accuracy</h2>
          <p>
            Listing information (including carpet area, super built-up area, prices, and specifications) is based on disclosures made by respective property owners and builders. Prices are subject to negotiation and final market circle rate adjustments determined by the Bihar Department of Registration.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">3. Professional Consultancy Fees</h2>
          <p>
            Consultancy service fees and brokerage charges for purchase, sale, or lease transactions are clearly established prior to agreement execution in accordance with transparent local industry standards in Patna.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">4. Governing Law & Jurisdiction</h2>
          <p>
            All real estate agreements and legal matters handled under our guidance are subject to the laws and jurisdiction of courts in <strong>Patna, Bihar</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
