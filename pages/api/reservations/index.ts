import type { NextApiRequest, NextApiResponse } from 'next';
import { getReservations, DiningReservation } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const reservations = getReservations();

  if (req.method === 'GET') {
    return res.status(200).json(reservations);
  }

  if (req.method === 'POST') {
    const {
      restaurantId,
      restaurantName,
      hotelLocation,
      customerName,
      email,
      phone,
      date,
      timeSlot,
      guests,
      seatingPreference,
      dietaryNotes,
      specialOccasion,
      mvgNumber,
      mvgTier,
    } = req.body;

    if (!customerName || !email || !date || !timeSlot) {
      return res.status(400).json({ message: 'Required reservation details missing' });
    }

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const newReservation: DiningReservation = {
      id: Date.now(),
      referenceCode: `SUN-RES-${refNum}`,
      restaurantId: Number(restaurantId) || 1,
      restaurantName: restaurantName || 'The Grill Room',
      hotelLocation: hotelLocation || 'The Palace of the Lost City',
      customerName,
      email,
      phone: phone || '+27 82 000 0000',
      date,
      timeSlot,
      guests: Number(guests) || 2,
      seatingPreference: seatingPreference || 'Indoor Dining Room',
      dietaryNotes: dietaryNotes || '',
      specialOccasion: specialOccasion || 'None',
      mvgNumber: mvgNumber || '',
      mvgTier: mvgTier || 'Non-Member',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    reservations.unshift(newReservation);
    return res.status(201).json(newReservation);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
