import React from 'react';
import { Award, Sparkles, Check, ArrowRight, Shield, Gift } from 'lucide-react';

interface SunMVGSectionProps {
  onBookTable: () => void;
}

export default function SunMVGSection({ onBookTable }: SunMVGSectionProps) {
  const TIERS = [
    {
      tier: 'Turquoise',
      discount: '10% OFF',
      tagline: 'Welcome Tier',
      border: 'border-cyan-400',
      bg: 'from-cyan-900/40 to-sunblue-950',
      accent: 'text-cyan-400',
      perks: ['10% F&B dining discount', 'Earn Sun Leisure Points', 'Special birthday treat', 'Mobile app access'],
    },
    {
      tier: 'Silver',
      discount: '12.5% OFF',
      tagline: 'Preferred Guest',
      border: 'border-slate-300',
      bg: 'from-slate-800/60 to-sunblue-950',
      accent: 'text-slate-200',
      perks: ['12.5% dining discount', 'Priority golf tee times', 'Quarterly accommodation vouchers', 'Dedicated check-in desk'],
    },
    {
      tier: 'Gold',
      discount: '15% OFF',
      tagline: 'VIP Privileges',
      border: 'border-amber-400',
      bg: 'from-amber-900/40 to-sunblue-950',
      accent: 'text-amber-400',
      perks: ['15% dining discount', 'Complimentary Palace high tea upgrade', 'Free resort shuttle transfer', 'VIP lounge access'],
    },
    {
      tier: 'Platinum & Diamond',
      discount: '20% OFF',
      tagline: 'Elite Connoisseur',
      border: 'border-sungold-400',
      bg: 'from-sungold-900/50 to-sunblue-950',
      accent: 'text-sungold-300',
      perks: ['20% dining discount across resort', 'Private sommelier wine cellar tastings', 'Valet parking at The Palace', 'Direct Concierge Line'],
    },
  ];

  return (
    <section id="mvg-rewards" className="bg-sunblue-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-y-2 border-sungold-500 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sungold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunblue-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-sungold-500/20 border border-sungold-400/40 text-sungold-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Sun MVG Dining Privileges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-luxury tracking-tight">
            Dine &amp; Earn with Sun MVG Loyalty
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            As a Sun Most Valued Guest (MVG), you enjoy exclusive dining discounts of up to 20% on your food and beverage bill across all participating restaurants at Sun City Resort.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`bg-gradient-to-b ${tier.bg} border-2 ${tier.border} rounded-xl p-5 flex flex-col justify-between backdrop-blur-xs relative group hover:scale-[1.02] transition-transform duration-200 shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {tier.tagline}
                  </span>
                  <Award className={`w-5 h-5 ${tier.accent}`} />
                </div>
                <h3 className={`text-xl font-bold font-serif-luxury ${tier.accent} mb-1`}>
                  {tier.tier}
                </h3>
                <div className="text-2xl font-black text-white mb-4">
                  {tier.discount}
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-3.5 h-3.5 ${tier.accent} shrink-0 mt-0.5`} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                Applied automatically upon presenting card or entering MVG number during booking.
              </div>
            </div>
          ))}
        </div>

        {/* Call to action bar */}
        <div className="bg-sunblue-900/90 border border-sungold-500/40 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white font-serif-luxury">
              Not a Sun MVG member yet?
            </h4>
            <p className="text-xs text-slate-300">
              Sign up is complimentary at any Sun City Guest Relations desk or activate immediately online to start saving today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBookTable}
              className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Book Table with MVG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
