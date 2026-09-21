import React from 'react';
import { Building2, Award, ShieldCheck, CheckCircle2, Phone, MessageCircle, MapPin, Users, HeartHandshake, Compass } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: "Local Market Knowledge",
      description: "Deep roots across Patna's residential and commercial corridors, from Kankarbagh and Boring Road to Bailey Road and Danapur.",
      icon: Compass
    },
    {
      title: "Registry & Legal Verification",
      description: "Every plot, house, and flat listed undergoes thorough verification of Kattha, Jamabandi, Khatiyan, and non-encumbrance status.",
      icon: ShieldCheck
    },
    {
      title: "Zero Hidden Intermediaries",
      description: "Direct discussions between buyers and verified property owners, eliminating endless broker chains and inflated pricing.",
      icon: HeartHandshake
    },
    {
      title: "Personalized Property Visits",
      description: "Accompanied site visits with vehicle assistance, local landmark guidance, and candid advice on ground realities.",
      icon: Users
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Banner */}
      <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-95" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 border border-gold-500/30">
            About Shyam Homes
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Helping You Find the Right Property in <span className="text-gold-gradient">Patna</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Founded with a commitment to integrity, transparency, and dependable property guidance for families, investors, and businesses across Bihar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Two Column Founder & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Dhananjay Kumar - Shyam Homes Patna"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-gold-500/30 text-white">
                <h3 className="font-serif text-xl font-bold">Dhananjay Kumar</h3>
                <p className="text-xs text-gold-400">Chief Real Estate & Property Consultant</p>
                <p className="text-xs text-slate-300 mt-1">Patna, Bihar • 📞 7858832545</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold uppercase tracking-wider">
              Our Mission
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Simplifying Real Estate in Patna With Honest Guidance
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                <strong className="text-navy-900 font-semibold">Shyam Homes</strong> is a real estate and property consultancy serving property buyers, sellers, landlords, and tenants in Patna.
              </p>
              <p>
                The Patna real estate market can often be daunting due to unclear land titles, varying circle rates, and layered middlemen. Our goal is to make your property search simpler, transparent, and completely worry-free.
              </p>
              <p>
                Whether you are looking to purchase your dream family home in Kankarbagh, invest in high-growth plots in Danapur, buy a modern apartment on Bailey Road, or lease commercial showroom space on Boring Road, we handle every detail with absolute dedication.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="tel:7858832545"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Dhananjay Kumar</span>
              </a>
              <a
                href="https://wa.me/917858832545?text=Hello%20Shyam%20Homes,%20I%20would%20like%20to%20consult%20regarding%20property%20in%20Patna."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Pillars / Values Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-premium">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-3xl font-bold text-navy-900">
              Why Patna Trusts Shyam Homes
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Our core principles guide every transaction and consultation we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const IconComp = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl bg-surface-light border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-navy-900 mb-2">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
