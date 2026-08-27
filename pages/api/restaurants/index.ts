import type { NextApiRequest, NextApiResponse } from 'next';
import { getRestaurants, RestaurantItem } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const restaurants = getRestaurants();

  if (req.method === 'GET') {
    const { search, hotel, category, cuisine, halalOnly, sort } = req.query;
    let filtered = [...restaurants];

    if (typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.hotel.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    if (typeof hotel === 'string' && hotel !== 'all') {
      filtered = filtered.filter(r => r.hotel.toLowerCase().includes(hotel.toLowerCase()));
    }

    if (typeof category === 'string' && category !== 'all') {
      filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (typeof cuisine === 'string' && cuisine !== 'all') {
      filtered = filtered.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }

    if (halalOnly === 'true') {
      filtered = filtered.filter(r => r.isHalaalCertified);
    }

    if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price_asc') {
      filtered.sort((a, b) => a.averagePricePerPerson - b.averagePricePerPerson);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.averagePricePerPerson - a.averagePricePerPerson);
    }

    return res.status(200).json(filtered);
  }

  if (req.method === 'POST') {
    const { name, hotel, category, cuisine, averagePricePerPerson, rating, description, image, hours, dressCode } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Restaurant name is required' });
    }

    const newRestaurant: RestaurantItem = {
      id: Date.now(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      hotel: hotel || 'The Palace of the Lost City',
      category: category || 'Casual & Family',
      cuisine: cuisine || 'International',
      priceRange: 'RRR',
      averagePricePerPerson: Number(averagePricePerPerson) || 350,
      rating: Number(rating) || 4.7,
      reviewCount: 1,
      tagline: 'Authentic dining experience at Sun City',
      description: description || 'Experience exceptional cuisine and hospitality.',
      image: image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      hours: hours || '12h00 – 22h00 Daily',
      dressCode: dressCode || 'Smart Casual',
      isHalaalCertified: Boolean(req.body.isHalaalCertified),
      isVegetarianFriendly: true,
      mvgDiscount: 'Up to 20% Sun MVG Discount',
      phone: '+27 (0)14 557 1000',
      email: 'suncity.dining@suninternational.com',
      atmosphere: ['Resort Dining', 'Sun City Luxury'],
      features: ['Reservation Recommended', 'MVG Loyalty Discount'],
      menu: [
        {
          category: 'Chef Specialties',
          items: [
            { name: 'House Signature Dish', description: 'Seasonal fresh ingredients prepared daily', price: 280, isChefSpecial: true }
          ]
        }
      ],
      reviews: []
    };

    restaurants.push(newRestaurant);
    return res.status(201).json(newRestaurant);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
