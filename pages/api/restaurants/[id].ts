import type { NextApiRequest, NextApiResponse } from 'next';
import { getRestaurants } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const restaurants = getRestaurants();
  const { id } = req.query;

  const restaurant = restaurants.find(
    r => String(r.id) === String(id) || r.slug === String(id)
  );

  if (req.method === 'GET') {
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    return res.status(200).json(restaurant);
  }

  if (req.method === 'PUT') {
    const index = restaurants.findIndex(
      r => String(r.id) === String(id) || r.slug === String(id)
    );
    if (index === -1) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    restaurants[index] = { ...restaurants[index], ...req.body };
    return res.status(200).json(restaurants[index]);
  }

  if (req.method === 'DELETE') {
    const index = restaurants.findIndex(
      r => String(r.id) === String(id) || r.slug === String(id)
    );
    if (index === -1) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    restaurants.splice(index, 1);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
