import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookingItem } from '../lib/db';
import { Calendar, User, CheckCircle, Clock, XCircle, Hotel, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All');

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: number | string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      fetchBookings();
    } catch (e) {
      // fallback local update
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservations</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Your Bookings & Itineraries</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track confirmed reservations, pending requests, and manage your upcoming stays.
          </p>
        </div>

        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Hotel Booking</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List / Table */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 font-medium">Loading reservations...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">No {filter !== 'All' ? filter : ''} Bookings Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              You don't have any bookings matching this status right now.
            </p>
          </div>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700"
          >
            <span>Browse Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Booking ID</th>
                  <th className="py-3.5 px-6">Hotel Property</th>
                  <th className="py-3.5 px-6">Guest Name</th>
                  <th className="py-3.5 px-6">Stay Dates</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                      #{b.id}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-sky-600" />
                      <span>{b.hotelName}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      <div>{b.customerName}</div>
                      {b.email && <div className="text-xs text-slate-400">{b.email}</div>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      {b.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {b.status === 'Confirmed' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                        {b.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                        {b.status === 'Cancelled' && <XCircle className="w-3 h-3 text-rose-600" />}
                        <span>{b.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="text-xs font-medium text-rose-600 hover:text-rose-800 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
