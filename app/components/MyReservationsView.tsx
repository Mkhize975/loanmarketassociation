import React, { useState } from 'react';
import { DiningReservation } from '../../lib/db';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  ArrowLeft, 
  UtensilsCrossed, 
  Trash2,
  AlertCircle
} from 'lucide-react';

interface MyReservationsViewProps {
  reservations: DiningReservation[];
  onBackToDirectory: () => void;
  onCancelReservation: (id: number | string) => Promise<void>;
  onNewReservation: () => void;
}

export default function MyReservationsView({
  reservations,
  onBackToDirectory,
  onCancelReservation,
  onNewReservation,
}: MyReservationsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingId, setCancellingId] = useState<number | string | null>(null);

  const filtered = reservations.filter(
    r =>
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = async (id: number | string) => {
    if (confirm('Are you sure you want to cancel this Sun City dining reservation?')) {
      setCancellingId(id);
      try {
        await onCancelReservation(id);
      } finally {
        setCancellingId(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBackToDirectory}
            className="text-xs font-bold text-sungold-600 hover:text-sungold-700 uppercase tracking-wider flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sun City Dining Directory</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-sunblue-900">
            My Table Reservations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your booked dining itineraries, table seatings, and Sun MVG discount entitlements.
          </p>
        </div>

        <button
          onClick={onNewReservation}
          className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 shrink-0"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Book Another Table</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-sunstone-200 p-4 mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Guest Name, Booking Reference (e.g. SUN-RES-8821), or Restaurant..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
          />
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">
          <strong>{filtered.length}</strong> active reservations found
        </div>
      </div>

      {/* Reservations List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sunstone-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-sungold-50 text-sungold-600 rounded-full flex items-center justify-center mx-auto">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-sunblue-900 font-serif-luxury">
            No Reservations Found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You currently have no active dining bookings under this search. Experience fine dining at The Palace, authentic Indian curries at The Raj, or lakeside meze at Maltos.
          </p>
          <button
            onClick={onNewReservation}
            className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
          >
            Explore &amp; Reserve Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl shadow-sm border border-sunstone-200 overflow-hidden flex flex-col justify-between hover:shadow-sun-md transition-all duration-200"
            >
              {/* Card Top */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-sunstone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Booking Reference
                    </span>
                    <span className="text-sm font-extrabold text-sungold-600 font-mono">
                      {res.referenceCode}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    res.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {res.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-sungold-700 uppercase tracking-wider">
                    {res.hotelLocation}
                  </div>
                  <h3 className="text-lg font-bold text-sunblue-900 font-serif-luxury">
                    {res.restaurantName}
                  </h3>
                </div>

                <div className="bg-sunstone-50 rounded-lg p-3 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Date:</span>
                    <strong className="text-slate-900">{res.date}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Time:</span>
                    <strong className="text-slate-900">{res.timeSlot}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Guests &amp; Seating:</span>
                    <strong className="text-slate-900">{res.guests} ({res.seatingPreference})</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Guest Name:</span>
                    <strong className="text-slate-900">{res.customerName}</strong>
                  </div>
                </div>

                {res.mvgTier && res.mvgTier !== 'Non-Member' && (
                  <div className="bg-sungold-50 border border-sungold-200 rounded-lg p-2 flex items-center justify-between text-xs text-sunblue-900">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-sungold-600" />
                      <span className="text-[11px] font-semibold">MVG {res.mvgTier}</span>
                    </div>
                    <span className="text-[10px] font-bold text-sungold-800">Discount Entitled</span>
                  </div>
                )}

                {res.dietaryNotes && (
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
                    <strong>Notes:</strong> {res.dietaryNotes}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="bg-sunstone-50 border-t border-sunstone-200 px-5 py-3 flex items-center justify-between gap-2">
                <button
                  onClick={() => window.print()}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={() => handleCancel(res.id)}
                  disabled={cancellingId === res.id}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{cancellingId === res.id ? 'Cancelling...' : 'Cancel Booking'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
