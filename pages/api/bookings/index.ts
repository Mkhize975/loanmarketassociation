import type { NextApiRequest, NextApiResponse } from 'next';
import { getBookings, BookingItem } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const bookings = getBookings();

  if (req.method === 'GET') {
    return res.status(200).json(bookings);
  }

  if (req.method === 'POST') {
    const { customerName, hotelName, hotelId, date, guests, status, email } = req.body;
    const newBooking: BookingItem = {
      id: Date.now(),
      customerName: customerName || 'Guest Member',
      email: email || '',
      hotelName: hotelName || 'Associated Hotel',
      hotelId: hotelId || 1,
      date: date || new Date().toISOString().split('T')[0],
      guests: guests || 1,
      status: status || 'Confirmed',
    };

    bookings.unshift(newBooking);
    return res.status(201).json(newBooking);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
