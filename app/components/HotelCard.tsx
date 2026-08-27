import React from 'react';

export interface HotelCardProps {
  id?: number | string;
  image?: string;
  name: string;
  location?: string;
  rating?: number;
  price?: number;
  description?: string;
  onBook?: (id?: number | string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  image,
  name,
  location,
  rating = 4.5,
  price = 150,
  description,
  onBook,
}) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col">
      <div className="relative h-48 w-full bg-slate-200">
        <img
          src={image || fallbackImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-amber-600 flex items-center gap-1 shadow-sm">
          <span>★</span> {typeof rating === 'number' ? rating.toFixed(1) : rating}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{name}</h3>
          {location && (
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
              📍 {location}
            </p>
          )}
          {description && (
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Starting from</span>
            <p className="text-lg font-bold text-sky-600">${price}<span className="text-xs font-normal text-slate-500">/night</span></p>
          </div>
          {onBook ? (
            <button
              onClick={() => onBook(id)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Book Now
            </button>
          ) : (
            <a
              href={`/hotel-details/${id || 1}`}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
