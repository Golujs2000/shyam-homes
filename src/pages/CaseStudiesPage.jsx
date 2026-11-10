import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Clock, MapPin, Building, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { caseStudiesList } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function CaseStudiesPage() {
  const breadcrumbItems = [
    { name: 'Case Studies', url: '/case-studies' }
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Real Estate Case Studies Patna — Verified Deals & Client Success Stories"
        description="Review successful property transactions in Patna by Shyam Homes. Resolving ancestral land disputes, fast-track apartment sales, and high-yield commercial leasing."
        keywords="Patna real estate case studies, property deals Patna, ancestral plot dispute Bihar, commercial lease Patna, Dhananjay Kumar track record"
        canonical="/case-studies"
        schemas={[getBreadcrumbSchema(breadcrumbItems)]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Proven Track Record
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Verified Property Transactions & <span className="text-moonstone-600 italic font-normal">Case Studies</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Real outcomes from Patna's property market. Explore how Shyam Homes resolved complex revenue paperwork, screened genuine buyers, and delivered dispute-free closings for families and investors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="space-y-8">
          {caseStudiesList.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy-900 text-gold-400">
                    {cs.propertyType}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-moonstone-600" />
                    {cs.locality}
                  </span>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Closed in {cs.timeline}</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
                {cs.title}
              </h2>

              <p className="text-slate-700 text-base leading-relaxed mb-6">
                {cs.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                  <span className="text-xs font-bold text-amber-900 block mb-1 uppercase tracking-wider">The Challenge</span>
                  <p className="text-xs sm:text-sm text-slate-700">{cs.challenge}</p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/70">
                  <span className="text-xs font-bold text-sky-900 block mb-1 uppercase tracking-wider">Our Strategy</span>
                  <p className="text-xs sm:text-sm text-slate-700">{cs.solution}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                  <span className="text-xs font-bold text-emerald-900 block mb-1 uppercase tracking-wider">Final Outcome</span>
                  <p className="text-xs sm:text-sm text-slate-700">{cs.result}</p>
                </div>
              </div>

              {cs.testimonial && (
                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-gold-500 text-xs sm:text-sm text-slate-700 italic">
                  "{cs.testimonial}"
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-gold-500/30 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Have a Complex Property Challenge in Patna?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            Whether you need 30-year title verification, urgent liquidation of ancestral assets, or institutional leasing, we are here to assist.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <a
              href="tel:7858832545"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call 7858832545</span>
            </a>
            <a
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20have%20a%20property%20consultation%20requirement%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

