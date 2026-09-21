import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/faqs';

export default function FAQSection() {
  const [openId, setOpenId] = useState(1); // First open by default

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 text-gold-400 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Quick answers about real estate consultancy and procedures with Shyam Homes.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4 text-left">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className={`w-full p-5 sm:p-6 text-left font-serif font-bold text-lg sm:text-xl flex items-center justify-between gap-4 transition-colors ${
                    isOpen ? 'bg-navy-900 text-gold-400' : 'bg-surface-light text-navy-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold-400' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 bg-white border-t border-slate-100 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in-50 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
