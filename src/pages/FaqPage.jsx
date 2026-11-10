import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { categorizedFaqs } from '../data/seoContentData';
import { getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ '0-0': true, '1-0': true });

  const breadcrumbItems = [
    { name: 'Frequently Asked Questions', url: '/faqs' }
  ];

  // Flatten all faqs for schema
  const allFaqsForSchema = categorizedFaqs.flatMap((cat) => cat.items);

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = categorizedFaqs.map((cat) => {
    const matchingItems = cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      items: matchingItems
    };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Patna Real Estate FAQs — Registry, Land Measurement, Circle Rates & Buying Guide"
        description="Got questions about buying, selling, or registering property in Patna? Read answers on Kattha measurement, Jamabandi, stamp duty, circle rates, and RERA Bihar."
        keywords="Patna real estate FAQ, Bihar land registry questions, Kattha sq ft FAQ, Patna circle rate questions, Shyam Homes FAQs"
        canonical="/faqs"
        schemas={[getBreadcrumbSchema(breadcrumbItems), getFAQSchema(allFaqsForSchema)]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider mb-4 border border-lightblue-300 shadow-sm mt-3">
            Knowledge Base
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Frequently Asked Questions on <span className="text-moonstone-600 italic font-normal">Patna Real Estate</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Clear, authoritative answers to common questions about buying plots, apartment registration, stamp duty, mutation (Dakhil Kharij), and local market procedures in Bihar.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Kattha, Stamp Duty, Jamabandi)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-lightblue-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-moonstone-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, catIdx) => (
            <div key={category.category} className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy-900 pb-2 border-b-2 border-gold-500/30">
                {category.category}
              </h2>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(key)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-navy-900 hover:text-moonstone-700 transition-colors"
                      >
                        <span>{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gold-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <p className="text-slate-600 text-base">
              No matching questions found for "{searchQuery}".
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Have a specific inquiry? Ask consultant Dhananjay Kumar directly via WhatsApp.
            </p>
          </div>
        )}

        {/* Still have questions? */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-10 text-white border border-gold-500/30 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold">
            Still Have Questions About Property in Patna?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-light">
            We are here to provide clear, candid answers regarding land registry, circle rates, and site visits across Patna.
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
              href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20have%20a%20question%20about%20property%20in%20Patna."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
