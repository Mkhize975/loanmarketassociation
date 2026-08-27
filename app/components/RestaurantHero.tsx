import React from 'react';
import { 
  Search, 
  Sparkles, 
  UtensilsCrossed, 
  MapPin, 
  Award, 
  Clock, 
  ChevronRight, 
  Compass,
  CheckCircle2
} from 'lucide-react';

interface RestaurantHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenReservation: () => void;
  onOpenMap: () => void;
  totalVenues: number;
}

export default function RestaurantHero({
  searchQuery,
  onSearchChange,
  onOpenReservation,
  onOpenMap,
  totalVenues,
}: RestaurantHeroProps) {
  return (
    <div className="relative bg-sunblue-900 text-white overflow-hidden">
      {/* Background Image with Luxury Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Sun City Luxury Dining"
          className="w-full h-full object-cover object-center brightness-40 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunblue-950 via-sunblue-900/85 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-sunblue-950/40 to-sunblue-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[11px] font-semibold uppercase tracking-widest text-sungold-300 mb-6">
          <span className="hover:text-white transition-colors cursor-pointer">Sun International</span>
          <ChevronRight className="w-3 h-3 text-sungold-500" />
          <span className="hover:text-white transition-colors cursor-pointer">Destinations</span>
          <ChevronRight className="w-3 h-3 text-sungold-500" />
          <span className="hover:text-white transition-colors cursor-pointer">Sun City Resort</span>
          <ChevronRight className="w-3 h-3 text-sungold-500" />
          <span className="text-white">Restaurants & Dining</span>
        </nav>

        {/* Destination Badge */}
        <div className="inline-flex items-center gap-2 bg-sunblue-800/80 backdrop-blur-xs border border-sungold-500/40 text-sungold-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sungold-400" />
          <span>A World-Class Culinary Safari</span>
        </div>

        {/* Main Title & Hero Copy */}
        <div className="max-w-3xl space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-serif-luxury">
            Sun City Restaurants &amp; Dining
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            Indulge in an extraordinary gastronomy tour across <strong className="text-sungold-300 font-semibold">{totalVenues}+ distinctive dining venues</strong>. From majestic Afro-French fine dining and private wine cellars at The Palace of the Lost City to tranquil lakeside Mediterranean mezedes, 100% Certified Halaal curries, and lively poolside gastro-pubs.
          </p>
        </div>

        {/* Highlight Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mb-8">
          <div className="bg-sunblue-950/80 border border-sunblue-700/60 rounded-lg p-3 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-sungold-400 font-bold text-sm">
              <UtensilsCrossed className="w-4 h-4 text-sungold-400" />
              <span>30+ Venues</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">Fine dining to casual eats</p>
          </div>

          <div className="bg-sunblue-950/80 border border-sunblue-700/60 rounded-lg p-3 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-sungold-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certified Halaal</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">Strictly certified (The Raj)</p>
          </div>

          <div className="bg-sunblue-950/80 border border-sunblue-700/60 rounded-lg p-3 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-sungold-400 font-bold text-sm">
              <Award className="w-4 h-4 text-sungold-400" />
              <span>Sun MVG Deals</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">Up to 20% loyalty discount</p>
          </div>

          <div className="bg-sunblue-950/80 border border-sunblue-700/60 rounded-lg p-3 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-sungold-400 font-bold text-sm">
              <Clock className="w-4 h-4 text-sungold-400" />
              <span>Palace High Tea</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">Royal afternoon tea service</p>
          </div>
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-2xl max-w-4xl border border-sungold-400/40 text-slate-800 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by restaurant name, cuisine (e.g. Steakhouse, Indian, Italian), or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sungold-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenReservation}
              className="flex-1 md:flex-none bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            <button
              onClick={onOpenMap}
              className="flex-1 md:flex-none bg-sunblue-500 hover:bg-sunblue-600 text-white px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-sunblue-400/30"
            >
              <Compass className="w-3.5 h-3.5 text-sungold-400" />
              <span>Resort Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
