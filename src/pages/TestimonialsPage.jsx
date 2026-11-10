import React from 'react';
import { Star, Quote, MapPin, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { clientTestimonials } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function TestimonialsPage() {
  const breadcrumbItems = [
    { name: 'Testimonials', url: '/testimonials' }
  ];

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://shyamhomes.com/#realestateagent',
    name: 'Shyam Homes',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: clientTestimonials.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: clientTestimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name
      },
      datePublished: '2026-10-01',
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5'
      }
    }))
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Client Reviews & Testimonials — Shyam Homes Real Estate Patna"
        description="Read verified client reviews and feedback for Shyam Homes. Discover why families, doctors, and NRI investors trust Dhananjay Kumar for property deals in Patna."
        keywords="Shyam Homes reviews, Patna real estate consultant review, Dhananjay Kumar feedback, verified property agent Patna"
        canonical="/testimonials"
        schemas={[getBreadcrumbSchema(breadcrumbItems), reviewSchema]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Client Voices & Trust
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Client Testimonials & <span className="text-moonstone-600 italic font-normal">Local Trust</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Read candid feedback from families, medical professionals, corporate leaders, and NRI investors who bought, sold, or leased property in Patna through Shyam Homes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clientTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{t.date}</span>
                </div>

                <p className="text-slate-700 text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-navy-900">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500">{t.designation}</p>
                  <p className="text-[11px] text-moonstone-700 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-moonstone-600" />
                    {t.locality}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-medium">
                    {t.propertyDealt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-gold-500/30 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Experience Transparent Property Consultation in Patna
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            Contact Dhananjay Kumar for clear title verification, realistic price negotiation, and accompanied site visits.
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
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20would%20like%20to%20consult%20regarding%20property%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
