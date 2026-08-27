import type { NextApiRequest, NextApiResponse } from 'next';
import { getBookings } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const bookings = getBookings();
  const { id } = req.query;

  const index = bookings.findIndex(b => String(b.id) === String(id));

  if (req.method === 'PUT') {
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...req.body };
      return res.status(200).json(bookings[index]);
    }
    return res.status(404).json({ message: 'Booking not found' });
  }

  if (req.method === 'DELETE') {
    if (index !== -1) {
      bookings.splice(index, 1);
      return res.status(204).end();
    }
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
