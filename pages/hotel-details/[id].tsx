import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BookingForm from '../../app/components/BookingForm';
import { HotelItem } from '../../lib/db';
import { MapPin, Star, Wifi, Coffee, Sparkles, Shield, ArrowLeft, Check, Users } from 'lucide-react';

export default function HotelDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [hotel, setHotel] = useState<HotelItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading property details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Hotel Not Found</h2>
        <p className="text-slate-500 mt-2">The requested hotel listing could not be found.</p>
        <Link href="/hotels" className="inline-block mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg font-medium">
          Back to Hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/hotels"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotel Directory</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details, Amenities, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Photo Banner */}
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-sm font-bold text-amber-600 flex items-center gap-1.5 shadow-md">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{hotel.rating || 4.8} / 5.0</span>
            </div>
          </div>

          {/* Title and Info */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold text-slate-900">{hotel.name}</h1>
              <div className="text-right">
                <span className="text-xs text-slate-400">Exclusive Association Rate</span>
                <p className="text-2xl font-black text-sky-600">${hotel.price} <span className="text-sm font-normal text-slate-500">/ night</span></p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>{hotel.location}</span>
            </p>
            <p className="text-base text-slate-700 mt-4 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Property Amenities & Privileges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(hotel.amenities && hotel.amenities.length > 0 ? hotel.amenities : [
                'High-speed Wi-Fi',
                'Breakfast Included',
                'Swimming Pool',
                'Business Center',
                '24/7 Room Service',
                'Executive Lounge Access'
              ]).map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Member Reviews */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Member Reviews & Ratings</h3>
            <div className="space-y-4">
              {(hotel.reviews && hotel.reviews.length > 0 ? hotel.reviews : [
                { name: 'Alice Dupont', comment: 'Amazing stay! Everything from the room views to check-in was seamless.', rating: 5 },
                { name: 'Marcus Vance', comment: 'Very comfortable bed and fast corporate Wi-Fi.', rating: 4.5 },
              ]).map((rev, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900">{rev.name}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm
              hotelName={hotel.name}
              hotelId={hotel.id}
              pricePerNight={hotel.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
