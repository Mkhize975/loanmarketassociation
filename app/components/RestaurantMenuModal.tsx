import React, { useState } from 'react';
import { RestaurantItem } from '../../lib/db';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  UtensilsCrossed, 
  Award, 
  Clock, 
  MapPin, 
  Shirt, 
  Leaf, 
  Flame,
  Star
} from 'lucide-react';

interface RestaurantMenuModalProps {
  restaurant: RestaurantItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTable: (restaurant: RestaurantItem) => void;
}

export default function RestaurantMenuModal({
  restaurant,
  isOpen,
  onClose,
  onBookTable,
}: RestaurantMenuModalProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  if (!isOpen || !restaurant) return null;

  const currentCategory = restaurant.menu[activeCategoryIndex] || restaurant.menu[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-sungold-300 overflow-hidden my-6 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header Hero Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sunblue-950 via-sunblue-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content overlay */}
          <div className="absolute bottom-4 left-5 right-5 text-white z-10">
            <div className="flex items-center gap-2 text-sungold-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{restaurant.hotel}</span>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-white">
              {restaurant.name}
            </h2>
            <p className="text-xs text-slate-200 mt-1 max-w-xl line-clamp-1">
              {restaurant.tagline}
            </p>
          </div>
        </div>

        {/* Info & Highlights Bar */}
        <div className="bg-sunstone-50 border-b border-sunstone-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-sungold-600" />
              {restaurant.hours}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Shirt className="w-3.5 h-3.5 text-sungold-600" />
              Dress code: <strong className="text-slate-800">{restaurant.dressCode}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {restaurant.isHalaalCertified && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                100% Certified Halaal
              </span>
            )}
            <span className="bg-sungold-100 text-sungold-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {restaurant.mvgDiscount}
            </span>
          </div>
        </div>

        {/* Menu Categories Horizontal Nav */}
        <div className="border-b border-sunstone-200 px-5 bg-white shrink-0 overflow-x-auto flex gap-2 pt-3 no-scrollbar">
          {restaurant.menu.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`pb-3 px-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeCategoryIndex === idx
                  ? 'border-sungold-500 text-sunblue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat.category} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* Menu Items List (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-sunblue-900 font-serif-luxury">
              {currentCategory?.category}
            </h3>
            <span className="text-[11px] text-slate-400">All prices in South African Rand (ZAR)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentCategory?.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-sunstone-50/70 border border-sunstone-200/80 rounded-xl p-4 flex flex-col justify-between hover:border-sungold-300 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.name}
                      </h4>
                      {item.isChefSpecial && (
                        <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                          ★ Chef Special
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <Leaf className="w-2.5 h-2.5" /> Veg
                        </span>
                      )}
                      {item.isHalaal && (
                        <span className="bg-teal-100 text-teal-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                          Halaal
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-extrabold text-sungold-700 whitespace-nowrap">
                      R {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Restaurant Reviews preview */}
          {restaurant.reviews && restaurant.reviews.length > 0 && (
            <div className="mt-6 pt-6 border-t border-sunstone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Verified Guest Experiences</span>
              </h4>
              <div className="space-y-2.5">
                {restaurant.reviews.map((rev, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 text-xs border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900">{rev.author}</strong>
                        {rev.mvgTier && (
                          <span className="text-[10px] text-sungold-700 bg-sungold-100 px-1.5 py-0.2 rounded font-semibold">
                            MVG {rev.mvgTier}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-sunstone-200 p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Dress code and reservation policies apply.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTable(restaurant);
              }}
              className="flex-1 sm:flex-none bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Book Table at {restaurant.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
