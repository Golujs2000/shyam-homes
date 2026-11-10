import React from 'react';
import { Link } from 'react-router-dom';
import { Home, DollarSign, Key, Trees, Building2, ShieldCheck, ArrowRight, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { servicesList } from '../data/seoContentData';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

const iconMap = {
  Home,
  DollarSign,
  Key,
  Trees,
  Building2,
  ShieldCheck
};

export default function ServicesHubPage() {
  const breadcrumbItems = [
    { name: 'Services', url: '/services' }
  ];

  const serviceListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesList.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `https://shyamhomes.com/services/${service.slug}`,
      description: service.metaDescription
    }))
  };

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Real Estate Services in Patna — Buying, Selling, Plots & Legal Due Diligence"
        description="Comprehensive real estate services in Patna by Shyam Homes. Verified property buying, selling, commercial leasing, residential plots, and 30-year title verification."
        keywords="Real estate services Patna, property buying consultant Patna, sell plot Patna, commercial leasing Patna, land verification Patna, Dhananjay Kumar"
        canonical="/services"
        schemas={[getBreadcrumbSchema(breadcrumbItems), serviceListSchema]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Expert Property Solutions
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Complete Real Estate & Advisory Services in <span className="text-moonstone-600 italic font-normal">Patna</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            From residential plots and gated high-rise apartments to commercial retail leasing and 30-year title due diligence, explore specialized property solutions led by on-ground Patna consultant Dhananjay Kumar.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const Icon = iconMap[service.icon] || Home;
            return (
              <div
                key={service.slug}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 p-3 rounded-xl bg-navy-900 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3 group-hover:text-moonstone-700 transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.overview}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.keyBenefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-moonstone-700 group-hover:text-gold-600 transition-colors"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Shyam Homes Banner */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                15+ Years Ground Experience in Patna
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                Need Custom Property Consultation or On-Site Visit?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl">
                Discuss your specific requirements directly with Dhananjay Kumar. We arrange private site visits across Kankarbagh, Boring Road, Bailey Road, Danapur, and Bihta.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="tel:7858832545"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call 7858832545</span>
              </a>
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20would%20like%20to%20consult%20regarding%20property%20services%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Consultant</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

