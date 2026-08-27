import React, { useEffect, useState } from 'react';
import HotelCard from '../app/components/HotelCard';
import { HotelItem } from '../lib/db';
import { Search, MapPin, SlidersHorizontal, Hotel, Sparkles } from 'lucide-react';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredHotels, setFilteredHotels] = useState<HotelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hotels')
      .then(res => res.json())
      .then(data => {
        setHotels(data);
        setFilteredHotels(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = hotels;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        (h.description && h.description.toLowerCase().includes(q))
      );
    }

    if (selectedLocation !== 'all') {
      result = result.filter(h => h.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    setFilteredHotels(result);
  }, [searchQuery, selectedLocation, hotels]);

  const uniqueLocations = Array.from(new Set(hotels.map(h => h.location.split(',')[0].trim())));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Hotel className="w-3.5 h-3.5" />
            <span>Association Directory</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Partner Hotels & Stays</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse corporate rates and verified member accommodations worldwide.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by hotel name, city, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {(searchQuery || selectedLocation !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('all');
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 font-medium">Loading hotels directory...</div>
      ) : filteredHotels.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
          <Hotel className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Hotels Found</h3>
          <p className="text-sm text-slate-500 mt-1">
            No properties match your current search criteria. Try adjusting your search or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('all');
            }}
            className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={hotel.price}
              rating={hotel.rating}
              description={hotel.description}
              image={hotel.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
