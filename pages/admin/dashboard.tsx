import React, { useState, useEffect } from 'react';
import { HotelItem, BookingItem } from '../../lib/db';
import { LayoutDashboard, Hotel, Calendar, Plus, Trash2, Edit3, DollarSign, CheckCircle2, Star, MapPin } from 'lucide-react';

export default function AdminDashboardPage() {
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [activeTab, setActiveTab] = useState<'hotels' | 'bookings'>('hotels');

  // New Hotel Form State
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelLocation, setNewHotelLocation] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState('200');
  const [newHotelRating, setNewHotelRating] = useState('4.8');
  const [newHotelDescription, setNewHotelDescription] = useState('');
  const [isAddingHotel, setIsAddingHotel] = useState(false);

  const fetchHotels = async () => {
    try {
      const res = await fetch('/api/hotels');
      const data = await res.json();
      setHotels(data);
    } catch (e) {}
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim()) return;

    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newHotelName,
          location: newHotelLocation || 'Association Destination',
          price: Number(newHotelPrice) || 150,
          rating: Number(newHotelRating) || 4.5,
          description: newHotelDescription || 'Verified partner property.',
        }),
      });

      if (response.ok) {
        fetchHotels();
        setNewHotelName('');
        setNewHotelLocation('');
        setNewHotelDescription('');
        setIsAddingHotel(false);
      }
    } catch (err) {}
  };

  const handleDeleteHotel = async (id: number) => {
    if (!confirm('Are you sure you want to remove this hotel listing?')) return;
    try {
      const response = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchHotels();
      }
    } catch (err) {}
  };

  const handleUpdateBookingStatus = async (id: number | string, status: 'Confirmed' | 'Pending' | 'Cancelled') => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch (err) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Stats */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Management Portal</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage partner hotels, rates, availability, and member booking reservations.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Partner Hotels</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{hotels.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Hotel className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{bookings.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmed Stays</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {bookings.filter(b => b.status === 'Confirmed').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'hotels'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Manage Hotels ({hotels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'bookings'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Manage Bookings ({bookings.length})</span>
        </button>
      </div>

      {/* Tab 1: Manage Hotels */}
      {activeTab === 'hotels' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Hotel Inventory</h2>
            <button
              onClick={() => setIsAddingHotel(!isAddingHotel)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingHotel ? 'Cancel' : 'Add New Hotel'}</span>
            </button>
          </div>

          {isAddingHotel && (
            <form onSubmit={handleAddHotel} className="bg-white p-6 rounded-2xl border border-sky-100 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900">Add New Partner Property</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Hotel Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zurich Grand Resort"
                    value={newHotelName}
                    onChange={(e) => setNewHotelName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zurich, Switzerland"
                    value={newHotelLocation}
                    onChange={(e) => setNewHotelLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Price Per Night ($)</label>
                  <input
                    type="number"
                    required
                    value={newHotelPrice}
                    onChange={(e) => setNewHotelPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newHotelRating}
                    onChange={(e) => setNewHotelRating(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short summary of amenities and location..."
                  value={newHotelDescription}
                  onChange={(e) => setNewHotelDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
              >
                Save & Add Property
              </button>
            </form>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {hotels.map(h => (
                <div key={h.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80'} alt={h.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{h.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600" />
                        <span>{h.location}</span>
                        <span className="mx-1">•</span>
                        <span className="font-semibold text-slate-700">${h.price}/night</span>
                        <span className="mx-1">•</span>
                        <span className="text-amber-600 font-medium">★ {h.rating}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleDeleteHotel(h.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Member Booking Logs</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                    <th className="py-3.5 px-6">ID</th>
                    <th className="py-3.5 px-6">Guest</th>
                    <th className="py-3.5 px-6">Hotel</th>
                    <th className="py-3.5 px-6">Dates</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-mono text-xs text-slate-400">#{b.id}</td>
                      <td className="py-4 px-6 font-medium text-slate-900">
                        {b.customerName}
                        {b.email && <div className="text-xs font-normal text-slate-400">{b.email}</div>}
                      </td>
                      <td className="py-4 px-6 text-slate-700">{b.hotelName}</td>
                      <td className="py-4 px-6 text-slate-600 text-xs">{b.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : b.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                          className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
