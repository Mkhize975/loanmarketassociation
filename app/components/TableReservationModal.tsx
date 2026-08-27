import React, { useState } from 'react';
import { RestaurantItem, DiningReservation } from '../../lib/db';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  UtensilsCrossed, 
  Printer, 
  Download,
  AlertCircle
} from 'lucide-react';

interface TableReservationModalProps {
  restaurant: RestaurantItem | null;
  allRestaurants: RestaurantItem[];
  isOpen: boolean;
  onClose: () => void;
  onReservationCreated: (reservation: DiningReservation) => void;
}

export default function TableReservationModal({
  restaurant,
  allRestaurants,
  isOpen,
  onClose,
  onReservationCreated,
}: TableReservationModalProps) {
  const [selectedRestId, setSelectedRestId] = useState<number>(
    restaurant?.id || allRestaurants[0]?.id || 1
  );

  // Form State
  const [date, setDate] = useState<string>('2026-09-05');
  const [timeSlot, setTimeSlot] = useState<string>('19:30');
  const [guests, setGuests] = useState<number>(2);
  const [seatingPreference, setSeatingPreference] = useState<any>('Indoor Dining Room');
  const [specialOccasion, setSpecialOccasion] = useState<any>('None');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [mvgNumber, setMvgNumber] = useState<string>('');
  const [mvgTier, setMvgTier] = useState<any>('Non-Member');

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<DiningReservation | null>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const currentRest = allRestaurants.find(r => r.id === Number(selectedRestId)) || restaurant || allRestaurants[0];

  const TIME_SLOTS = [
    '07:00', '08:00', '09:00', '10:00', // Breakfast
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', // Lunch / High Tea
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00' // Dinner
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !date || !timeSlot) {
      setError('Please provide your name, email, date, and preferred time slot.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        restaurantId: currentRest.id,
        restaurantName: currentRest.name,
        hotelLocation: currentRest.hotel,
        customerName,
        email,
        phone: phone || '+27 82 555 0100',
        date,
        timeSlot,
        guests: Number(guests),
        seatingPreference,
        specialOccasion,
        dietaryNotes,
        mvgNumber,
        mvgTier,
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to create reservation.');
      }

      const data: DiningReservation = await res.json();
      setConfirmedReservation(data);
      onReservationCreated(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your reservation.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-sungold-300 overflow-hidden my-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-sunblue-500 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-sungold-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sungold-500 text-sunblue-900 flex items-center justify-center font-bold">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sungold-400 text-xs font-bold uppercase tracking-wider block">
                Sun City Resort Table Reservation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                {confirmedReservation ? 'Booking Confirmed' : currentRest.name}
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

        {/* Confirmation Screen */}
        {confirmedReservation ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-sunblue-900 font-serif-luxury">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-slate-600">
                Your dining reservation at Sun City Resort has been officially registered with the concierge.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-sunstone-50 border-2 border-dashed border-sungold-400 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-sunstone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Booking Reference</span>
                  <div className="text-lg font-black text-sungold-600 font-mono">
                    {confirmedReservation.referenceCode}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</span>
                  <div className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Confirmed
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Restaurant</span>
                  <strong className="text-slate-900 text-sm">{confirmedReservation.restaurantName}</strong>
                  <span className="text-[11px] text-sungold-700 block">{confirmedReservation.hotelLocation}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Guest Name</span>
                  <strong className="text-slate-900 text-sm">{confirmedReservation.customerName}</strong>
                  <span className="text-[11px] text-slate-500 block">{confirmedReservation.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date &amp; Time</span>
                  <strong className="text-slate-900 text-sm">{confirmedReservation.date} at {confirmedReservation.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Party Size &amp; Seating</span>
                  <strong className="text-slate-900 text-sm">{confirmedReservation.guests} Guests ({confirmedReservation.seatingPreference})</strong>
                </div>
              </div>

              {confirmedReservation.mvgTier && confirmedReservation.mvgTier !== 'Non-Member' && (
                <div className="bg-sungold-50 border border-sungold-300 rounded-lg p-2.5 flex items-center justify-between text-xs text-sunblue-900">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sungold-600" />
                    <span>Sun MVG Tier: <strong>{confirmedReservation.mvgTier}</strong></span>
                  </div>
                  <span className="font-bold text-sungold-800">Loyalty Discount Applied</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-slate-300"
              >
                <Printer className="w-4 h-4" />
                <span>Print Confirmation</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedReservation(null);
                  onClose();
                }}
                className="flex-1 bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Done &amp; Return to Directory
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Restaurant Selector & Info Banner */}
            <div className="bg-sunstone-50 border border-sunstone-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentRest.image}
                  alt={currentRest.name}
                  className="w-14 h-14 rounded-lg object-cover border border-sungold-300 shrink-0"
                />
                <div>
                  <select
                    value={selectedRestId}
                    onChange={(e) => setSelectedRestId(Number(e.target.value))}
                    className="font-bold text-sm text-sunblue-900 bg-white border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-sungold-500"
                  >
                    {allRestaurants.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.hotel})</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-0.5">{currentRest.cuisine} • Dress code: {currentRest.dressCode}</p>
                </div>
              </div>

              <div className="text-right text-xs shrink-0 sm:self-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hours</span>
                <span className="font-semibold text-slate-800 text-[11px]">{currentRest.hours}</span>
              </div>
            </div>

            {/* Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-08-27"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                  required
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Party Size (Guests) *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Preference & Special Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Seating Preference
                </label>
                <select
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                >
                  <option value="Indoor Dining Room">Indoor Dining Room</option>
                  <option value="Terrace / Scenic View">Terrace / Scenic Water View</option>
                  <option value="Private Dining / Cellar">Private Dining / Cellar Room</option>
                  <option value="Poolside Deck">Poolside Deck</option>
                  <option value="Window Table">Window Table</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Special Occasion
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                >
                  <option value="None">None / Regular Dining</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Wedding Anniversary</option>
                  <option value="Business Dinner">Business Dinner</option>
                  <option value="Romantic Date">Romantic Date</option>
                  <option value="Family Celebration">Family Gathering</option>
                </select>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Dr. Pieter van der Merwe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="p.vandermerwe@executive.co.za"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 555 1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
                />
              </div>
            </div>

            {/* Sun MVG Loyalty & Discount */}
            <div className="bg-sungold-50/70 border border-sungold-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sunblue-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sungold-600" />
                  <span>Sun MVG Loyalty Member Benefits</span>
                </span>
                <span className="text-[10px] text-sungold-700 font-semibold uppercase">Save up to 20%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    value={mvgNumber}
                    onChange={(e) => setMvgNumber(e.target.value)}
                    placeholder="MVG Card Number (Optional)"
                    className="w-full bg-white border border-sungold-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <select
                    value={mvgTier}
                    onChange={(e) => setMvgTier(e.target.value)}
                    className="w-full bg-white border border-sungold-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="Non-Member">Non-Member</option>
                    <option value="Turquoise">Turquoise Tier (10% Discount)</option>
                    <option value="Silver">Silver Tier (12.5% Discount)</option>
                    <option value="Gold">Gold Tier (15% Discount)</option>
                    <option value="Platinum">Platinum Tier (17.5% Discount)</option>
                    <option value="Diamond">Diamond Tier (20% Discount)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dietary notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Dietary Requests, Allergies or Table Notes
              </label>
              <textarea
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder="e.g. Vegetarian/Halaal preferred, gluten intolerance, window table requested..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sungold-500"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{loading ? 'Confirming...' : 'Confirm Table Booking'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
