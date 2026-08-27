import type { NextApiRequest, NextApiResponse } from 'next';
import { getHotels } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hotels = getHotels();
  const { id } = req.query;
  const hotelId = Number(id);

  const index = hotels.findIndex(h => h.id === hotelId);

  if (req.method === 'GET') {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) {
      // Fallback for default demo
      return res.status(200).json(hotels[0] || { id: hotelId, name: 'Grand Hotel' });
    }
    return res.status(200).json(hotel);
  }

  if (req.method === 'PUT') {
    if (index === -1) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    hotels[index] = { ...hotels[index], ...req.body, id: hotelId };
    return res.status(200).json(hotels[index]);
  }

  if (req.method === 'DELETE') {
    if (index === -1) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    hotels.splice(index, 1);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
