import React from 'react';
import { ShieldCheck, CheckCircle2, Leaf, Heart, Utensils, ArrowRight } from 'lucide-react';

interface DietaryHalaalBannerProps {
  onFilterHalaal: () => void;
  onBookHalaal: () => void;
}

export default function DietaryHalaalBanner({
  onFilterHalaal,
  onBookHalaal,
}: DietaryHalaalBannerProps) {
  return (
    <section id="halaal-guide" className="bg-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-y-2 border-emerald-500/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Dietary Assurance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif-luxury tracking-tight">
              Halaal &amp; Special Dietary Dining at Sun City
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Sun City Resort is dedicated to catering to all cultural and dietary requirements with complete peace of mind. Enjoy strictly <strong>100% Certified Halaal dining at The Raj Indian Restaurant</strong>, extensive vegetarian &amp; vegan menus, and advance kosher arrangements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-900/50 border border-emerald-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 font-bold text-white text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Certified Halaal (The Raj)</span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  Dedicated kitchen, certified suppliers, strictly non-alcoholic cooking at Sun City Soho.
                </p>
              </div>

              <div className="bg-emerald-900/50 border border-emerald-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 font-bold text-white text-xs mb-1">
                  <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Plant-Based &amp; Gluten-Free</span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  Curated vegan menus and gluten-conscious preparations across all luxury venues.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onFilterHalaal}
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>View Certified Halaal Venues</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onBookHalaal}
                className="bg-transparent hover:bg-emerald-900 text-emerald-200 font-semibold px-4 py-2.5 rounded-lg text-xs border border-emerald-400/40 transition-colors"
              >
                Book Table at The Raj
              </button>
            </div>
          </div>

          {/* Feature Badge Card */}
          <div className="lg:col-span-5">
            <div className="bg-emerald-900/70 border border-emerald-500/50 rounded-2xl p-6 backdrop-blur-xs space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Dietary Concierge Advisory
                </span>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-bold">
                  Active Notice
                </span>
              </div>

              <div className="space-y-3 text-xs text-emerald-100">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Kosher Dining:</strong> Pre-packaged certified kosher meals can be arranged with 48 hours notice via resort concierge.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Severe Allergies:</strong> Inform your server upon arrival. Executive chefs will personalize your meal accordingly.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Children's Menus:</strong> Nutritious and toddler-friendly dishes available across all family restaurants.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
