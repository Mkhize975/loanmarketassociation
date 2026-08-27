import type { NextApiRequest, NextApiResponse } from 'next';
import { getReservations } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const reservations = getReservations();
  const { id } = req.query;

  const index = reservations.findIndex(
    r => String(r.id) === String(id) || r.referenceCode === String(id)
  );

  if (req.method === 'GET') {
    if (index === -1) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    return res.status(200).json(reservations[index]);
  }

  if (req.method === 'PUT') {
    if (index === -1) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservations[index] = { ...reservations[index], ...req.body };
    return res.status(200).json(reservations[index]);
  }

  if (req.method === 'DELETE') {
    if (index === -1) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservations.splice(index, 1);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
