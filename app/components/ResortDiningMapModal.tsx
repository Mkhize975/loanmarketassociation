import React, { useState } from 'react';
import { RestaurantItem } from '../../lib/db';
import { 
  X, 
  MapPin, 
  Compass, 
  UtensilsCrossed, 
  ChevronRight, 
  Sparkles, 
  Building2, 
  Palmtree, 
  Waves,
  Award
} from 'lucide-react';

interface ResortDiningMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: RestaurantItem[];
  onSelectRestaurant: (restaurant: RestaurantItem) => void;
}

const RESORT_ZONES = [
  {
    id: 'The Palace of the Lost City',
    name: 'The Palace of the Lost City',
    icon: Building2,
    description: 'Iconic 5-star luxury royal palace featuring fine dining, sommelier wine cellars & royal high tea.',
    bg: 'from-amber-950/80 to-sunblue-950',
    border: 'border-sungold-500',
  },
  {
    id: 'Cascades Hotel',
    name: 'Cascades Hotel',
    icon: Waves,
    description: 'Tranquil lakeside gardens with cascading waterfalls, flamingo lagoons & Mediterranean al fresco decks.',
    bg: 'from-blue-950/80 to-sunblue-950',
    border: 'border-blue-400',
  },
  {
    id: 'Sun City Hotel (Soho)',
    name: 'Sun City Hotel & Casino (Soho)',
    icon: Award,
    description: 'The vibrant heart of Sun City nightlife, gaming, authentic certified Halaal dining & buffet feasts.',
    bg: 'from-purple-950/80 to-sunblue-950',
    border: 'border-purple-400',
  },
  {
    id: 'Sun Central',
    name: 'Sun Central Entertainment Hub',
    icon: Sparkles,
    description: 'Two-level air-conditioned entertainment centre filled with beloved family eateries and fast-casual dining.',
    bg: 'from-red-950/80 to-sunblue-950',
    border: 'border-rose-400',
  },
  {
    id: 'Valley of Waves & Golf',
    name: 'Valley of Waves & Golf Courses',
    icon: Palmtree,
    description: 'Sun-drenched beachside gastro-pubs, Gary Player 18th hole clubhouse & bushveld golf views.',
    bg: 'from-emerald-950/80 to-sunblue-950',
    border: 'border-emerald-400',
  },
];

export default function ResortDiningMapModal({
  isOpen,
  onClose,
  restaurants,
  onSelectRestaurant,
}: ResortDiningMapModalProps) {
  const [activeZone, setActiveZone] = useState<string>('The Palace of the Lost City');

  if (!isOpen) return null;

  const currentZoneRestaurants = restaurants.filter(
    r => r.hotel.toLowerCase().includes(activeZone.toLowerCase()) ||
         (activeZone.includes('Sun Central') && r.hotel.includes('Sun Central')) ||
         (activeZone.includes('Valley') && r.hotel.includes('Valley'))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-sungold-300 overflow-hidden my-6 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-sunblue-500 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-sungold-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sungold-500 text-sunblue-900 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sungold-400 text-xs font-bold uppercase tracking-wider block">
                Sun City Resort Directory
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                Resort Dining Zones &amp; Locator
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-full hover:bg-sunblue-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Zone Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {RESORT_ZONES.map((zone) => {
              const Icon = zone.icon;
              const isSelected = activeZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-sunblue-900 text-white border-sungold-400 shadow-md ring-2 ring-sungold-400/50'
                      : 'bg-sunstone-50 hover:bg-sunstone-100 text-slate-800 border-sunstone-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-sungold-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">{zone.name}</div>
                    <div className={`text-[10px] mt-1 ${isSelected ? 'text-sungold-300' : 'text-slate-500'}`}>
                      {restaurants.filter(r => r.hotel.toLowerCase().includes(zone.id.toLowerCase().split(' ')[0])).length} Venues
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Zone Spotlight */}
          <div className="bg-sunstone-50 border border-sunstone-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sungold-700 font-bold text-xs uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Zone Spotlight</span>
            </div>
            <h3 className="text-lg font-bold text-sunblue-900 font-serif-luxury">
              {activeZone}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {RESORT_ZONES.find(z => z.id === activeZone)?.description}
            </p>
          </div>

          {/* Restaurant List in Selected Zone */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Dining Venues in this Area ({currentZoneRestaurants.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentZoneRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white border border-sunstone-200 rounded-xl p-3.5 flex items-center justify-between hover:border-sungold-400 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-14 h-14 rounded-lg object-cover border border-sunstone-200 shrink-0"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-sungold-700 transition-colors">
                        {restaurant.name}
                      </h5>
                      <p className="text-[11px] text-slate-500">{restaurant.cuisine}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-0.5">
                        <span className="font-semibold">{restaurant.category}</span>
                        <span>•</span>
                        <span>Avg R {restaurant.averagePricePerPerson}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectRestaurant(restaurant);
                    }}
                    className="bg-sungold-50 hover:bg-sungold-500 text-sunblue-900 hover:text-white p-2 rounded-lg transition-colors shrink-0"
                    title="Book Table"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-sunstone-50 border-t border-sunstone-200 p-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Complimentary Sun City shuttle service operates between all resort zones 24/7.
          </span>
          <button
            onClick={onClose}
            className="bg-sunblue-500 hover:bg-sunblue-600 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
