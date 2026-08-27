import type { NextApiRequest, NextApiResponse } from 'next';
import { getHotels, HotelItem } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hotels = getHotels();

  if (req.method === 'GET') {
    const { search, location } = req.query;
    let filtered = [...hotels];

    if (typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
    }

    if (typeof location === 'string' && location.trim()) {
      const loc = location.toLowerCase();
      filtered = filtered.filter(h => h.location.toLowerCase().includes(loc));
    }

    return res.status(200).json(filtered);
  }

  if (req.method === 'POST') {
    const { name, location, price, rating, description, image, amenities } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Hotel name is required' });
    }

    const newHotel: HotelItem = {
      id: Date.now(),
      name,
      location: location || 'Global Destination',
      price: Number(price) || 150,
      rating: Number(rating) || 4.5,
      description: description || 'Premium accommodation with modern amenities.',
      image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: Array.isArray(amenities) ? amenities : ['Wi-Fi', 'Air Conditioning', 'Breakfast'],
      reviews: [],
    };

    hotels.push(newHotel);
    return res.status(201).json(newHotel);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
