import React from 'react';
import { 
  Filter, 
  Sparkles, 
  Utensils, 
  MapPin, 
  DollarSign, 
  ArrowUpDown, 
  Layers, 
  LayoutGrid, 
  Check,
  Flame
} from 'lucide-react';

interface RestaurantFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedHotel: string;
  onSelectHotel: (hotel: string) => void;
  selectedCuisine: string;
  onSelectCuisine: (cuisine: string) => void;
  halalOnly: boolean;
  onToggleHalal: () => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  viewMode: 'grid' | 'grouped';
  onToggleViewMode: (mode: 'grid' | 'grouped') => void;
  resultCount: number;
}

const CATEGORIES = [
  'All Dining',
  'Fine Dining',
  'Casual & Family',
  'Buffets & Breakfast',
  'Bars & Lounges',
  'Poolside & Outdoor',
];

const HOTELS = [
  'All Locations',
  'The Palace of the Lost City',
  'Sun City Hotel (Soho)',
  'Cascades Hotel',
  'Cabanas Hotel',
  'Sun Central',
  'Valley of Waves & Golf',
];

const CUISINES = [
  'All Cuisines',
  'Steakhouse',
  'Afro-French',
  'Indian',
  'Mediterranean',
  'Italian',
  'Portuguese',
  'Gastro-Pub',
];

export default function RestaurantFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedHotel,
  onSelectHotel,
  selectedCuisine,
  onSelectCuisine,
  halalOnly,
  onToggleHalal,
  sortBy,
  onSelectSort,
  viewMode,
  onToggleViewMode,
  resultCount,
}: RestaurantFilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-sunstone-200 p-4 sm:p-5 mb-8">
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-sunstone-100 no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-sungold-500" />
          <span>Experience:</span>
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat || (cat === 'All Dining' && selectedCategory === 'all');
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat === 'All Dining' ? 'all' : cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-sunblue-500 text-white shadow-sm ring-2 ring-sungold-400'
                  : 'bg-sunstone-100 text-slate-700 hover:bg-sunstone-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Hotel Location Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sungold-500" />
            <span>Resort Location</span>
          </label>
          <select
            value={selectedHotel}
            onChange={(e) => onSelectHotel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sungold-500 focus:bg-white transition-all font-medium"
          >
            {HOTELS.map((hotel) => (
              <option key={hotel} value={hotel === 'All Locations' ? 'all' : hotel}>
                {hotel}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Utensils className="w-3 h-3 text-sungold-500" />
            <span>Cuisine Style</span>
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => onSelectCuisine(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sungold-500 focus:bg-white transition-all font-medium"
          >
            {CUISINES.map((cuisine) => (
              <option key={cuisine} value={cuisine === 'All Cuisines' ? 'all' : cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-sungold-500" />
            <span>Sort By</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sungold-500 focus:bg-white transition-all font-medium"
          >
            <option value="recommended">Recommended by Sun City</option>
            <option value="rating">Top Rated (Guest Reviews)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Halaal Certified Toggle & View Mode */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pt-4 sm:pt-4">
          <button
            onClick={onToggleHalal}
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              halalOnly
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% Certified Halaal</span>
            {halalOnly && <Check className="w-3.5 h-3.5" />}
          </button>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onToggleViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-sunblue-500 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleViewMode('grouped')}
              title="Grouped by Hotel Location"
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grouped'
                  ? 'bg-white text-sunblue-500 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Reset row */}
      <div className="mt-4 pt-3 border-t border-sunstone-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-sunblue-500">{resultCount}</span> dining experiences in Sun City
        </div>
        {(selectedCategory !== 'all' || selectedHotel !== 'all' || selectedCuisine !== 'all' || halalOnly) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectHotel('all');
              onSelectCuisine('all');
              if (halalOnly) onToggleHalal();
            }}
            className="text-sungold-600 hover:text-sungold-700 font-semibold underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
