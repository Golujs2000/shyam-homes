import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export default function CookiePolicyPage() {
  const breadcrumbItems = [
    { name: 'Cookie Policy', url: '/cookie-policy' }
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      <SEO
        title="Cookie Policy — Shyam Homes Patna"
        description="Learn about the cookie policy of Shyam Homes. How we use essential, analytics, and functional cookies to improve your property search experience in Patna."
        canonical="/cookie-policy"
        schemas={[getBreadcrumbSchema(breadcrumbItems)]}
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#d9f1f6] via-[#c3e7f1] to-[#e8f7fa] text-gunmetal-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-lightblue-200">
        <div className="relative max-w-4xl mx-auto space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-moonstone-700 text-xs font-bold uppercase tracking-wider border border-lightblue-300 shadow-sm mt-3">
            Legal & Compliance
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gunmetal-900 leading-tight">
            Cookie <span className="text-moonstone-600 italic font-normal">Policy</span>
          </h1>
          <p className="text-slate-700 text-sm sm:text-base font-light">
            Last Updated: November 10, 2026 • Shyam Homes, Patna, Bihar
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit websites. They are widely used by website operators to make websites work efficiently, provide personalized property search filters, and deliver reporting insights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              2. How Shyam Homes Uses Cookies
            </h2>
            <p>
              Shyam Homes uses cookies solely to improve user navigation, remember saved property listings during a session, and analyze aggregated traffic through privacy-conscious analytics tools. We do not sell user data to advertising third parties.
            </p>
            <ul className="list-disc pl-5 space-y-2 pt-2">
              <li><strong>Essential Cookies:</strong> Required for the technical operation of our platform, search filters, and secure form submissions.</li>
              <li><strong>Performance & Analytics Cookies:</strong> Used to understand visitor navigation patterns, popular Patna localities, and optimize Core Web Vitals loading speed.</li>
              <li><strong>Functional Cookies:</strong> Allow our website to remember your preference choices (such as budget range or selected locality filters).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              3. Managing Your Cookie Preferences
            </h2>
            <p>
              You have the right to decide whether to accept or reject non-essential cookies. You can set or amend your web browser controls to accept or refuse cookies at any time. If you choose to reject cookies, you may still navigate our website and view property listings without disruption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              4. Contact Us Regarding Cookies
            </h2>
            <p>
              If you have any questions about our use of cookies or privacy practices, please contact us at <a href="mailto:info@shyamhomes.com" className="text-moonstone-700 font-semibold underline">info@shyamhomes.com</a> or visit our office at Kankarbagh Main Road, Near Tiwary Bechar, Patna, Bihar - 800020.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

