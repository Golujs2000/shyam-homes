import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, User, ArrowRight, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { guidesList } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function GuidesHubPage() {
  const breadcrumbItems = [
    { name: 'Guides & Resources', url: '/guides' }
  ];

  const guidesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guidesList.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `https://shyamhomes.com/guides/${guide.slug}`,
      description: guide.excerpt
    }))
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Patna Real Estate Guides & Legal Insights — Land Measurement, Registry & Circle Rates"
        description="Comprehensive Patna property guides by Shyam Homes. Learn land measurement (Kattha, Dhur, Decimal), stamp duty calculation, circle rates, and RERA Bihar laws."
        keywords="Patna real estate guide, Bihar land measurement, Kattha to sq ft conversion, Patna stamp duty, property registration Bihar, circle rates Patna"
        canonical="/guides"
        schemas={[getBreadcrumbSchema(breadcrumbItems), guidesListSchema]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Knowledge & Advisory Hub
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Patna Real Estate <span className="text-moonstone-600 italic font-normal">Guides & Legal Insights</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Essential educational guides on land measurement units in Bihar, circle rate calculations, stamp duty, RERA Bihar compliance, and smart buying strategies written by veteran consultant Dhananjay Kumar.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidesList.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-navy-900/90 text-gold-400 text-xs font-bold px-3 py-1 rounded-full">
                    {guide.category}
                  </div>
                </div>

                <div className="p-7 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {guide.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 group-hover:text-moonstone-700 transition-colors leading-snug">
                    <Link to={`/guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5 text-moonstone-600" />
                    <span>By <strong className="text-slate-800">{guide.author}</strong></span>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7">
                <Link
                  to={`/guides/${guide.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-gold-500 hover:text-navy-950 text-navy-900 font-bold py-3 px-4 rounded-xl text-xs transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

