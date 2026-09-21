import React from 'react';
import { ArrowRight, CheckCircle2, Award, Phone, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-surface-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with layered styling */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
                  alt="Property Consultant Shyam Homes Patna"
                  className="w-full h-[450px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                {/* Overlay card at bottom */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-gold-500/30 text-white text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center text-navy-950 font-bold shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Dhananjay Kumar</h4>
                      <p className="text-xs text-gold-400">Chief Property Consultant, Patna</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Experience Pill */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-navy-900">Patna Local</div>
                  <div className="text-xs text-slate-500">End-to-End Property Assistance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 text-left space-y-6">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold tracking-wider uppercase">
              ABOUT SHYAM HOMES
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
              Helping You Find the Right Property
            </h2>

            {/* Copy */}
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-navy-900 font-semibold">Shyam Homes</strong> is a real estate and property consultancy serving property buyers, sellers, landlords and tenants in Patna.
              </p>
              <p>
                Whether you are looking for a plot, house, flat or commercial property, our goal is to make your property search simpler and more convenient. We verify titles, arrange direct site visits, and negotiate transparent terms without confusing intermediaries.
              </p>
            </div>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Verified Legal Registry Checks</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Residential Plots & Homes</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Commercial Retail & Offices</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Zero Hidden Brokerage Ambiguity</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:7858832545"
                className="inline-flex items-center gap-2 text-navy-900 hover:text-gold-600 font-bold text-sm px-4 py-3"
              >
                <Phone className="w-4 h-4 text-gold-600" />
                <span>Call Dhananjay Kumar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
