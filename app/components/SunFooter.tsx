import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Award, ExternalLink, HeartHandshake } from 'lucide-react';

export default function SunFooter() {
  return (
    <footer className="bg-sunblue-900 text-slate-300 pt-14 pb-8 border-t-4 border-sungold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsible Gambling Warning Bar - Mandatory for Sun International */}
        <div className="bg-sunblue-800/80 border border-sungold-500/30 rounded-xl p-4 sm:p-5 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sungold-500/20 text-sungold-400 flex items-center justify-center font-bold text-sm shrink-0 border border-sungold-500/40">
              18+
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-xs">
                Sun International Supports Responsible Gambling
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Gambling is strictly for persons 18 years and older. Winners know when to stop.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sungold-300 bg-sunblue-950/80 px-4 py-2 rounded-lg border border-sunblue-700/60 shrink-0">
            <Phone className="w-4 h-4 text-sungold-400" />
            <span className="font-semibold text-xs">National Toll-Free Helpline: 0800 006 008</span>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif italic text-3xl font-extrabold text-sungold-400 tracking-tight leading-none">
                Sun
              </span>
              <span className="text-sm font-black uppercase tracking-[0.25em] text-white leading-none">
                International
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              Sun City Resort is Africa’s premier vacation and entertainment destination, featuring over 30 culinary venues, world-class golf courses, the Valley of Waves, and 5-star luxury at The Palace of the Lost City.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-sungold-300">
                <MapPin className="w-4 h-4 text-sungold-400 shrink-0" />
                <span>Sun City Resort, R556, North West Province, 0316, South Africa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sungold-400 shrink-0" />
                <span>Dining Reservations: +27 (0)14 557 1000 / 3180</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sungold-400 shrink-0" />
                <span>suncity.dining@suninternational.com</span>
              </div>
            </div>
          </div>

          {/* Dining Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sungold-400 border-b border-sungold-500/20 pb-2">
              Sun City Dining
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#the-palace" className="hover:text-sungold-300 transition-colors">The Palace of the Lost City</a></li>
              <li><a href="#cascades-soho" className="hover:text-sungold-300 transition-colors">Cascades Hotel Restaurants</a></li>
              <li><a href="#cascades-soho" className="hover:text-sungold-300 transition-colors">Soho Hotel & Casino</a></li>
              <li><a href="#the-palace" className="hover:text-sungold-300 transition-colors">The Palace High Tea</a></li>
              <li><a href="#sun-central" className="hover:text-sungold-300 transition-colors">Sun Central Eateries</a></li>
              <li><a href="#halaal-guide" className="hover:text-sungold-300 transition-colors">100% Certified Halaal (The Raj)</a></li>
            </ul>
          </div>

          {/* Sun MVG Loyalty */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sungold-400 border-b border-sungold-500/20 pb-2">
              Sun MVG Loyalty
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">MVG Dining Discounts</a></li>
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">Turquoise Tier (10% Off)</a></li>
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">Silver Tier (12.5% Off)</a></li>
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">Gold Tier (15% Off)</a></li>
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">Platinum & Diamond (20% Off)</a></li>
              <li><a href="#mvg-rewards" className="hover:text-sungold-300 transition-colors">Join Sun MVG Rewards</a></li>
            </ul>
          </div>

          {/* Sister Sun Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sungold-400 border-b border-sungold-500/20 pb-2">
              Sun Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">The Table Bay (Cape Town)</span></li>
              <li><span className="text-slate-400">Time Square (Pretoria)</span></li>
              <li><span className="text-slate-400">GrandWest (Cape Town)</span></li>
              <li><span className="text-slate-400">The Boardwalk (Gqeberha)</span></li>
              <li><span className="text-slate-400">Sibaya (Durban)</span></li>
              <li><span className="text-slate-400">Carnival City (Brakpan)</span></li>
              <li><span className="text-slate-400">Wild Coast Sun (Port Edward)</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-sunblue-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Sun International (IP) (Pty) Ltd. All rights reserved. Sun City Resort.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-200 cursor-pointer">Promotion of Access to Information Act (PAIA)</span>
            <span className="hover:text-slate-200 cursor-pointer">Sun MVG Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
