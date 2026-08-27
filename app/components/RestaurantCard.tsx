import React from 'react';
import { RestaurantItem } from '../../lib/db';
import { 
  Star, 
  MapPin, 
  Clock, 
  Sparkles, 
  Award, 
  UtensilsCrossed, 
  BookOpen, 
  Shirt, 
  ShieldCheck, 
  CheckCircle,
  Phone,
  ChevronRight
} from 'lucide-react';

interface RestaurantCardProps {
  restaurant: RestaurantItem;
  onBookTable: (restaurant: RestaurantItem) => void;
  onViewMenu: (restaurant: RestaurantItem) => void;
  onViewDetails?: (restaurant: RestaurantItem) => void;
}

export default function RestaurantCard({
  restaurant,
  onBookTable,
  onViewMenu,
  onViewDetails,
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sun-md border border-sunstone-200 transition-all duration-200 flex flex-col group">
      {/* Image Container with Badges */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[85%]">
          <span className="bg-sunblue-900/90 text-white backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-sunblue-700/50">
            {restaurant.category}
          </span>
          {restaurant.isHalaalCertified && (
            <span className="bg-emerald-700/95 text-white backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <CheckCircle className="w-3 h-3" />
              100% Certified Halaal
            </span>
          )}
        </div>

        {/* Top Right Price Tier */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 text-sunblue-900 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-extrabold tracking-wider shadow-sm">
            {restaurant.priceRange}
          </span>
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10">
          <div className="flex items-center gap-1.5 text-sungold-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{restaurant.hotel}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-serif-luxury text-white truncate">
            {restaurant.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Cuisine, Rating & MVG Discount */}
          <div className="flex items-center justify-between text-xs gap-2">
            <span className="text-sungold-700 font-bold uppercase tracking-wider truncate">
              {restaurant.cuisine}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-xs font-bold shrink-0 border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating}</span>
              <span className="text-slate-400 text-[10px] font-normal">({restaurant.reviewCount})</span>
            </div>
          </div>

          {/* Tagline & Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Quick Specs Grid */}
          <div className="bg-sunstone-50 border border-sunstone-200/80 rounded-lg p-2.5 space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-sungold-500 shrink-0" />
              <span className="truncate">{restaurant.hours}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shirt className="w-3.5 h-3.5 text-sungold-500 shrink-0" />
                <span>Dress code: <strong className="text-slate-800">{restaurant.dressCode}</strong></span>
              </div>
              <span className="text-slate-500">
                Avg. <strong className="text-slate-800">R {restaurant.averagePricePerPerson}</strong> pp
              </span>
            </div>
          </div>

          {/* MVG Loyalty Perk Pill */}
          <div className="flex items-center gap-1.5 text-[11px] text-sunblue-900 bg-sungold-50 border border-sungold-200 rounded-md px-2.5 py-1">
            <Award className="w-3.5 h-3.5 text-sungold-600 shrink-0" />
            <span className="font-semibold">{restaurant.mvgDiscount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-sunstone-100 flex items-center gap-2">
          <button
            onClick={() => onBookTable(restaurant)}
            className="flex-1 bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => onViewMenu(restaurant)}
            className="bg-white hover:bg-sunstone-100 text-sunblue-500 font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider border border-sunstone-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sungold-600" />
            <span>View Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
