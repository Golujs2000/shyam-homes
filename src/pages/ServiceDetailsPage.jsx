import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Home, DollarSign, Key, Trees, Building2, ShieldCheck, CheckCircle2, ArrowRight, Phone, MessageCircle, MapPin, HelpCircle, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { servicesList } from '../data/seoContentData';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

const iconMap = {
  Home,
  DollarSign,
  Key,
  Trees,
  Building2,
  ShieldCheck
};

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = servicesList.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = iconMap[service.icon] || Home;

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: service.shortTitle || service.title, url: `/services/${service.slug}` }
  ];

  const schemas = [
    getServiceSchema(service),
    getBreadcrumbSchema(breadcrumbItems),
    service.faqs ? getFAQSchema(service.faqs) : null
  ].filter(Boolean);

  const whatsappMessage = `Hello Shyam Homes, I am interested in ${service.title}. Please provide more details and consultation.`;

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={`/services/${service.slug}`}
        schemas={schemas}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            {service.badge}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight max-w-4xl">
            {service.heroHeading}
          </h1>
          <p className="mt-4 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            {service.heroSubheading}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire on WhatsApp</span>
            </a>
            <a
              href="tel:7858832545"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-gold-400 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all border border-gold-500/30"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call 7858832545</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Overview & Key Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
                Service Overview & Ground Expertise
              </h2>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-6">
                {service.overview}
              </p>

              <h3 className="font-serif text-xl font-bold text-navy-900 mb-4 pt-4 border-t border-slate-100">
                Property Categories Covered
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.inventoryFocus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-6">
                Why Work With Shyam Homes for {service.shortTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-surface-light border border-slate-200/80">
                    <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
                How Our {service.shortTitle} Process Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.process.map((step) => (
                  <div key={step.step} className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 relative">
                    <span className="text-3xl font-serif font-bold text-gold-500 block mb-2">
                      {step.step}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-moonstone-600" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
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
          </div>

          {/* Right Sidebar: Contact & Quick Links */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Quick Contact Card */}
            <div className="bg-navy-900 rounded-3xl p-7 text-white border border-gold-500/30 shadow-xl space-y-5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                Direct Contact
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Consult Dhananjay Kumar
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Available 7 days a week for property inquiries, title deed verification, and arranged on-ground site visits in Patna.
              </p>
              <div className="pt-2 space-y-3">
                <a
                  href="tel:7858832545"
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 7858832545</span>
                </a>
                <a
                  href={`https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Consultant</span>
                </a>
              </div>
            </div>

            {/* Popular Localities for this service */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-moonstone-600" />
                <span>Prime Localities Covered</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.popularLocations.map((loc) => {
                  const targetSlug = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <Link
                      key={loc}
                      to={`/locations/${targetSlug}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-gold-500 hover:text-navy-950 text-slate-700 transition-colors border border-slate-200"
                    >
                      {loc} ↗
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other Services */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-navy-900">
                Explore Other Services
              </h3>
              <ul className="space-y-2">
                {servicesList.filter((s) => s.slug !== service.slug).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-xs font-medium text-slate-700 hover:text-moonstone-600 flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0"
                    >
                      <span>{s.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
