import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, MapPin } from 'lucide-react';

const HeroSection = () => {
  const featuredDestinations = [
    {
      name: 'Paris',
      offer: '20% off on luxury suites',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular'
    },
    {
      name: 'New York',
      offer: '30% off on downtown hotels',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
      badge: 'Special Deal'
    },
    {
      name: 'Tokyo',
      offer: 'Complimentary breakfast & spa',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      badge: 'Exclusive'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-8 md:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Partner Rates</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Premium Hotels with Association Rates
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300">
            Access curated corporate and leisure stays at verified rates. Enjoy seamless booking management and instant confirmations.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-lg shadow-sky-500/25 transition-all transform active:scale-95"
            >
              <span>Explore Hotels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur transition-colors border border-white/20"
            >
              <span>View My Bookings</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor">
            <path d="M40 0h120c22 0 40 18 40 40v120c0 22-18 40-40 40H40c-22 0-40-18-40-40V40C0 18 18 0 40 0z" />
          </svg>
        </div>
      </div>

      {/* Featured Destinations */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Destinations</h2>
            <p className="text-sm text-slate-500">Handpicked locations with special association pricing</p>
          </div>
          <Link href="/hotels" className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map((destination, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                  <Tag className="w-3 h-3 text-sky-400" />
                  {destination.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    {destination.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 font-medium text-sky-700">{destination.offer}</p>
                </div>
                <Link
                  href="/hotels"
                  className="mt-4 inline-flex items-center justify-center w-full py-2 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-sm font-semibold rounded-lg transition-colors border border-slate-200"
                >
                  Browse Deals
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
