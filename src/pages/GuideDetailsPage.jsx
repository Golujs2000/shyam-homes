import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, CheckCircle2, HelpCircle, Phone, MessageCircle, Share2, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { guidesList } from '../data/seoContentData';
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

export default function GuideDetailsPage() {
  const { slug } = useParams();
  const guide = guidesList.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const breadcrumbItems = [
    { name: 'Guides & Resources', url: '/guides' },
    { name: guide.shortTitle || guide.title, url: `/guides/${guide.slug}` }
  ];

  const schemas = [
    getArticleSchema(guide),
    getBreadcrumbSchema(breadcrumbItems),
    guide.faqs ? getFAQSchema(guide.faqs) : null
  ].filter(Boolean);

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${guide.title} - Read more on Shyam Homes: https://shyamhomes.com/guides/${guide.slug}`)}`;

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={`/guides/${guide.slug}`}
        ogImage={guide.image}
        ogType="article"
        schemas={schemas}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-4xl mx-auto space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider border border-lightblue-300 shadow-sm mt-3">
            {guide.category}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            {guide.title}
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-lightblue-200/80 mt-4">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-moonstone-600" />
              {guide.author} ({guide.authorRole})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {guide.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {guide.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-[360px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Key Takeaways Box (GEO / AEO - Direct Answer Optimization) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-500/50 shadow-md">
          <div className="flex items-center gap-2 text-gold-600 font-serif font-bold text-lg mb-4">
            <Sparkles className="w-5 h-5 text-gold-500" />
            <span>Key Takeaways & Quick Summary</span>
          </div>
          <ul className="space-y-2.5">
            {guide.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10">
          {guide.contentSections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 leading-snug">
                {sec.heading}
              </h2>

              {sec.text && (
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  {sec.text}
                </p>
              )}

              {sec.bullets && (
                <ul className="space-y-3 pt-2">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.table && (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-navy-900 text-white font-semibold">
                      <tr>
                        <th className="p-3">Unit</th>
                        <th className="p-3">Square Feet</th>
                        <th className="p-3">Decimals</th>
                        <th className="p-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {sec.table.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-bold text-navy-900">{row.unit}</td>
                          <td className="p-3 text-slate-700">{row.sqFt}</td>
                          <td className="p-3 text-slate-700">{row.decimals}</td>
                          <td className="p-3 text-slate-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQs */}
        {guide.faqs && guide.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-moonstone-600" />
              <span>Questions Answered in this Guide</span>
            </h2>
            <div className="space-y-4">
              {guide.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <h3 className="font-serif font-bold text-base text-navy-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box (E-E-A-T Foundation) */}
        <div className="bg-navy-900 text-white rounded-3xl p-8 border border-gold-500/30 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold-400">
            <img
              src="/logo.png"
              alt="Dhananjay Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold">About the Author: Dhananjay Kumar</h3>
            <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
              Lead Consultant • Shyam Homes Patna
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Dhananjay Kumar brings over 15 years of hands-on real estate advisory in Patna, having assisted hundreds of families and businesses with verified land purchases, commercial leasing, and dispute-free registration.
            </p>
          </div>
        </div>

        {/* Bottom CTA / Share */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200">
          <Link
            to="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-moonstone-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guides</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>
            <a
              href="tel:7858832545"
              className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-gold-400 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consult Author</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

