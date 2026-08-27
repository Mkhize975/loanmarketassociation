export interface RestaurantItem {
  id: number;
  slug: string;
  name: string;
  hotel: 'The Palace of the Lost City' | 'Sun City Hotel (Soho)' | 'Cascades Hotel' | 'Cabanas Hotel' | 'Sun Central' | 'Valley of Waves & Golf';
  category: 'Fine Dining' | 'Casual & Family' | 'Buffets & Breakfast' | 'Bars & Lounges' | 'Poolside & Outdoor' | 'Quick Bites';
  cuisine: string;
  priceRange: 'R' | 'RR' | 'RRR' | 'RRRR';
  averagePricePerPerson: number; // in ZAR (R)
  rating: number;
  reviewCount: number;
  description: string;
  tagline: string;
  image: string;
  galleryImages: string[];
  hours: string;
  breakfastHours?: string;
  lunchHours?: string;
  dinnerHours?: string;
  dressCode: string;
  isHalaalCertified?: boolean;
  isVegetarianFriendly?: boolean;
  mvgDiscount: string;
  phone: string;
  email: string;
  atmosphere: string[];
  features: string[];
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number; // in ZAR
      isChefSpecial?: boolean;
      isVegetarian?: boolean;
      isHalaal?: boolean;
    }[];
  }[];
  reviews: {
    author: string;
    date: string;
    rating: number;
    title: string;
    comment: string;
    mvgTier?: string;
  }[];
}

export interface DiningReservation {
  id: number | string;
  referenceCode: string;
  restaurantId: number;
  restaurantName: string;
  hotelLocation: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingPreference: 'Indoor Dining Room' | 'Terrace / Scenic View' | 'Private Dining / Cellar' | 'Poolside Deck' | 'Window Table';
  dietaryNotes?: string;
  specialOccasion?: 'None' | 'Birthday' | 'Anniversary' | 'Business Dinner' | 'Romantic Date' | 'Family Celebration';
  mvgNumber?: string;
  mvgTier?: 'Non-Member' | 'Turquoise' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export const initialRestaurants: RestaurantItem[] = [
  {
    id: 1,
    slug: 'the-grill-room',
    name: 'The Grill Room',
    hotel: 'The Palace of the Lost City',
    category: 'Fine Dining',
    cuisine: 'Signature Steakhouse & Fine Wine',
    priceRange: 'RRRR',
    averagePricePerPerson: 650,
    rating: 4.9,
    reviewCount: 342,
    tagline: 'World-Class Steaks & Sommelier-Curated Vintage Cellar',
    description: 'The Grill Room at The Palace of the Lost City is an iconic fine-dining destination offering succulent grain-fed dry-aged steaks, ocean-fresh seafood, and an extensive sommelier wine collection. Set amidst the dramatic royal architecture of the lost kingdom.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    hours: 'Dinner: 18h30 – 22h30 (Daily)',
    dinnerHours: '18:30 – 22:30',
    dressCode: 'Smart Elegant',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 3180',
    email: 'thepalace.dining@suninternational.com',
    atmosphere: ['Intimate Fine Dining', 'Romantic', 'Historic Elegance', 'Live Classical Piano'],
    features: ['Sommelier on duty', 'Private Wine Cellar Dining', 'Dry-Aged Beef Locker', 'Complimentary Valet for Guests'],
    menu: [
      {
        category: 'Starters & Raw Bar',
        items: [
          { name: 'Saldanha Bay Oysters (6pc)', description: 'Mignonette, lemon caviar, tabasco pearls, cracked black pepper', price: 240, isChefSpecial: true },
          { name: 'Wagyu Beef Carpaccio', description: 'Truffle emulsion, 24-month parmesan crisp, caperberries, wild rocket', price: 210 },
          { name: 'Pan-Seared Scallops', description: 'Cauliflower purée, crispy pancetta, golden raisin jus', price: 260, isChefSpecial: true },
          { name: 'Heirloom Beetroot Tartare', description: 'Goat cheese mousse, candied walnuts, micro herbs', price: 175, isVegetarian: true }
        ]
      },
      {
        category: 'Signature Steaks & Grills',
        items: [
          { name: 'Prime Dry-Aged Tomahawk (1kg)', description: '35-day aged Nguni beef served with roasted marrow bone & signature red wine jus (for two)', price: 980, isChefSpecial: true },
          { name: 'Chalmar Beef Fillet (250g)', description: 'Truffled potato gratin, charred broccolini, green peppercorn Madagascar sauce', price: 420 },
          { name: 'Rib-Eye on the Bone (400g)', description: 'Basted in wild thyme herb butter, triple-cooked hand cut chips', price: 460 },
          { name: 'Karoo Lamb Cutlets (300g)', description: 'Mint chimichurri, honey-glazed baby carrots, rosemary jus', price: 395 }
        ]
      },
      {
        category: 'Ocean & Vegetarian Mains',
        items: [
          { name: 'Grilled Mozambican Queen Prawns', description: 'Garlic peri-peri or lemon herb butter, fragrant basmati rice', price: 480, isChefSpecial: true },
          { name: 'Wild Mushroom Risotto', description: 'Carnaroli rice, black winter truffle, aged pecorino, toasted pine nuts', price: 290, isVegetarian: true }
        ]
      },
      {
        category: 'Desserts & Digestifs',
        items: [
          { name: 'Valrhona Dark Chocolate Fondant', description: 'Liquid centre, Madagascar vanilla bean gelato, gold leaf', price: 165, isChefSpecial: true },
          { name: 'South African Malva Pudding Soufflé', description: 'Amarula crème anglaise, roasted macadamia crumble', price: 145 },
          { name: 'Artisan South African Cheese Board', description: 'Klein River Gruyère, blue cheese, fig preserve, seeded crackers', price: 220 }
        ]
      }
    ],
    reviews: [
      { author: 'Dr. Pieter van der Merwe', date: 'August 2026', rating: 5, title: 'Unmatched steak and wine cellar experience', comment: 'Celebrated our 20th anniversary here. The Tomahawk was cooked to absolute perfection, and the sommelier paired brilliant Stellenbosch Cabernets.', mvgTier: 'Diamond' },
      { author: 'Thandiwe Khumalo', date: 'July 2026', rating: 5, title: 'Royal service at The Palace', comment: 'The ambiance is breathtaking. Soft piano in the background and five-star hospitality throughout.', mvgTier: 'Platinum' }
    ]
  },
  {
    id: 2,
    slug: 'crystal-court',
    name: 'Crystal Court',
    hotel: 'The Palace of the Lost City',
    category: 'Buffets & Breakfast',
    cuisine: 'International Buffet, Afternoon High Tea & Fine Dining',
    priceRange: 'RRR',
    averagePricePerPerson: 480,
    rating: 4.8,
    reviewCount: 512,
    tagline: 'Sumptuous Breakfast Buffets & World-Renowned High Tea',
    description: 'Surrounded by towering floor-to-ceiling arched windows overlooking the lush tropical gardens and cascading water features of The Palace. Famous for its legendary royal breakfast feast and elegant Palace High Tea.',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    hours: 'Breakfast: 06h30 – 11h00 | High Tea: 14h00 – 16h30 | Dinner: 18h30 – 22h00',
    breakfastHours: '06:30 – 11:00',
    lunchHours: '14:00 – 16:30 (High Tea)',
    dinnerHours: '18:30 – 22:00',
    dressCode: 'Smart Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 3185',
    email: 'crystalcourt@suninternational.com',
    atmosphere: ['Grand Architecture', 'Tropical Garden & Waterfall Views', 'Sophisticated High Tea', 'Family Friendly Breakfast'],
    features: ['Live Egg & Crêpe Stations', 'The Palace Signature High Tea Stand', 'Outdoor Terrace Tables', 'Fresh Smoothie Bar'],
    menu: [
      {
        category: 'The Palace Royal High Tea',
        items: [
          { name: 'Royal Palace High Tea Experience (Per Person)', description: 'Tiered towers of sweet & savoury delicacies, smoked salmon blinis, scones with clotted cream, artisanal TWG teas & glass of MCC', price: 420, isChefSpecial: true },
          { name: 'Champagne High Tea (Per Person)', description: 'High Tea accompanied by a chilled glass of French Champagne (Veuve Clicquot)', price: 620 }
        ]
      },
      {
        category: 'Buffet & Live Stations (Dinner & Breakfast)',
        items: [
          { name: 'Grand Breakfast Buffet Feast', description: 'Fresh bakery selection, cured meats, artisan cheeses, hot carvery, live made-to-order omelettes, fresh honeycomb and juices', price: 385 },
          { name: 'International Dinner Buffet Selection', description: 'Seafood ice bar, roast rib of beef carvery, African stews, Asian wok station, extravagant dessert wonderland', price: 540, isChefSpecial: true }
        ]
      }
    ],
    reviews: [
      { author: 'Samantha Miller', date: 'August 2026', rating: 5, title: 'The High Tea is an absolute must-do!', comment: 'Sitting with views of the palace towers and lush waterfall gardens while tasting exquisite petit fours was unforgettable.', mvgTier: 'Gold' }
    ]
  },
  {
    id: 3,
    slug: 'plume-restaurant',
    name: 'Plume Restaurant',
    hotel: 'The Palace of the Lost City',
    category: 'Fine Dining',
    cuisine: 'Afro-French Haute Cuisine',
    priceRange: 'RRRR',
    averagePricePerPerson: 750,
    rating: 4.9,
    reviewCount: 198,
    tagline: 'Experiential Afro-French Culinary Artistry',
    description: 'Plume provides a multi-sensory fine dining journey blending classic French technique with indigenous South African ingredients like fynbos, marula, and ostrich fillet. An intimate setting designed for romantic dates and connoisseurs.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80'
    ],
    hours: 'Dinner: 18h30 – 22h30 (Bookings Essential)',
    dinnerHours: '18:30 – 22:30',
    dressCode: 'Smart Elegant',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 3192',
    email: 'plume.palace@suninternational.com',
    atmosphere: ['Haute Cuisine', 'Romantic', 'Intimate', 'Candlelit Tables'],
    features: ['5-Course & 7-Course Tasting Menus', 'Sommelier Wine Pairings', 'Private Dining for Groups of 10+'],
    menu: [
      {
        category: 'Tasting Journey',
        items: [
          { name: '5-Course Chef Discovery Menu', description: 'Curated seasonal journey from land to sea with indigenous African botanicals', price: 890, isChefSpecial: true },
          { name: '7-Course Royal Degustation', description: 'Including French foie gras, Karoo venison loin, Cape rock lobster & dessert climax', price: 1150, isChefSpecial: true },
          { name: 'Sommelier Reserve Wine Flight', description: 'Carefully paired rare vintages for each course', price: 550 }
        ]
      }
    ],
    reviews: [
      { author: 'Francois Joubert', date: 'June 2026', rating: 5, title: 'Michelin star quality in the bushveld', comment: 'Every single plate was a work of art. The ostrich with smoked parsnip puree was exceptional.', mvgTier: 'Diamond' }
    ]
  },
  {
    id: 4,
    slug: 'the-raj',
    name: 'The Raj Restaurant',
    hotel: 'Sun City Hotel (Soho)',
    category: 'Casual & Family',
    cuisine: 'Authentic Indian Cuisine (100% Certified Halaal)',
    priceRange: 'RR',
    averagePricePerPerson: 320,
    rating: 4.7,
    reviewCount: 620,
    tagline: 'Master Crafted North Indian Curries & Tandoor Oven Specialties',
    description: 'The Raj at Sun City Soho offers aromatic, masterfully prepared North and South Indian dishes in a vibrant luxury setting. Fully certified Halaal, featuring buttery naans, tender butter chicken, lamb rogan josh, and rich vegetarian thalis.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
    ],
    hours: 'Lunch: 12h00 – 16h00 | Dinner: 18h00 – 22h30 (Daily)',
    lunchHours: '12:00 – 16:00',
    dinnerHours: '18:00 – 22:30',
    dressCode: 'Smart Casual',
    isHalaalCertified: true,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 1404',
    email: 'theraj.suncity@suninternational.com',
    atmosphere: ['Warm & Aromatic', '100% Certified Halaal', 'Family Friendly', 'Authentic Decor'],
    features: ['Tandoori Clay Ovens', 'Extensive Vegetarian & Jain options', 'Takeaway Available', 'Private Banquet Area'],
    menu: [
      {
        category: 'Starters & Tandoor',
        items: [
          { name: 'Vegetable Samosas (4pc)', description: 'Crispy pastry stuffed with spiced potatoes & peas, tamarind chutney', price: 95, isVegetarian: true, isHalaal: true },
          { name: 'Tandoori Chicken Tikka (4pc)', description: 'Boneless chicken marinated in spiced yogurt and grilled in clay tandoor', price: 145, isHalaal: true, isChefSpecial: true },
          { name: 'Seekh Kebab', description: 'Minced lamb infused with cumin, ginger and fresh coriander', price: 165, isHalaal: true }
        ]
      },
      {
        category: 'Curry Specialties',
        items: [
          { name: 'The Raj Signature Butter Chicken', description: 'Tender tandoori chicken simmered in a silky tomato, cashew and butter gravy', price: 235, isHalaal: true, isChefSpecial: true },
          { name: 'Kashmiri Lamb Rogan Josh', description: 'Slow-cooked lamb with Kashmiri red chilies, saffron and cardamoms', price: 265, isHalaal: true },
          { name: 'Paneer Makhani', description: 'Fresh Indian cottage cheese in a rich creamy tomato sauce', price: 185, isVegetarian: true, isHalaal: true },
          { name: 'Dal Makhani', description: 'Black lentils slow cooked overnight with ginger, garlic and butter', price: 160, isVegetarian: true, isHalaal: true }
        ]
      },
      {
        category: 'Breads & Rice',
        items: [
          { name: 'Garlic Butter Naan', description: 'Freshly baked tandoori bread with crushed garlic and melted butter', price: 45, isVegetarian: true, isHalaal: true },
          { name: 'Chicken Dum Biryani', description: 'Fragrant basmati rice layered with spiced chicken, served with raita', price: 220, isHalaal: true }
        ]
      }
    ],
    reviews: [
      { author: 'Farouk Patel', date: 'August 2026', rating: 5, title: 'Best Halaal dining in Sun City by far', comment: 'The Butter Chicken and garlic naans were world-class. Strict Halaal certification gave our entire family complete peace of mind.', mvgTier: 'Silver' }
    ]
  },
  {
    id: 5,
    slug: 'maltos-restaurant',
    name: 'Maltos Restaurant',
    hotel: 'Cascades Hotel',
    category: 'Casual & Family',
    cuisine: 'Mediterranean, Greek Meze & Fresh Seafood',
    priceRange: 'RRR',
    averagePricePerPerson: 390,
    rating: 4.8,
    reviewCount: 430,
    tagline: 'Al Fresco Mediterranean Dining Overlooking Cascading Waterfalls',
    description: 'Perched on the waterside at Cascades Hotel, Maltos brings the sun-kissed spirit of the Greek islands and Mediterranean coast to Sun City. Feast on souvlaki, crispy calamari, whole grilled linefish, and artisanal wood-fired pizzas.',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
    ],
    hours: 'Lunch: 11h30 – 16h30 | Dinner: 18h00 – 22h30 (Daily)',
    lunchHours: '11:30 – 16:30',
    dinnerHours: '18:00 – 22:30',
    dressCode: 'Resort Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 5110',
    email: 'maltos.cascades@suninternational.com',
    atmosphere: ['Lakeside & Waterfalls', 'Al Fresco Deck', 'Mediterranean Vibes', 'Family Friendly'],
    features: ['Outdoor Deck Over Waterfalls', 'Greek Meze Platters', 'Cocktail Lounge', 'Sunset Views'],
    menu: [
      {
        category: 'Greek Mezedes & Starters',
        items: [
          { name: 'Maltos Meze Platter for Two', description: 'Grilled halloumi, spanakopita, tzatziki, taramasalata, falafel, warm pita bread', price: 290, isChefSpecial: true, isVegetarian: true },
          { name: 'Crispy Fried Falkland Calamari', description: 'Tender tubes & tentacles dusted in seasoned flour, lemon garlic aioli', price: 165 },
          { name: 'Grilled Halloumi Cheese', description: 'Kalamata olives, fresh lemon wedge, oregano drizzle', price: 125, isVegetarian: true }
        ]
      },
      {
        category: 'Mediterranean Mains & Seafood',
        items: [
          { name: 'Whole Grilled Mediterranean Sea Bass', description: 'Charred on open flames, lemon-oregano olive oil, roasted baby potatoes', price: 345, isChefSpecial: true },
          { name: 'Authentic Lamb Kleftiko', description: 'Slow-roasted on the bone in parchment paper with herbs, garlic & feta', price: 360, isChefSpecial: true },
          { name: 'Chicken Souvlaki Skewers', description: 'Marinated in Greek oregano and lemon, tzatziki, greek salad, chips', price: 215 }
        ]
      }
    ],
    reviews: [
      { author: 'Elena Rostova', date: 'July 2026', rating: 5, title: 'Incredible atmosphere by the waterfall', comment: 'Sitting on the deck listening to the Cascades waterfalls while eating grilled calamari and Greek meze was heavenly.', mvgTier: 'Gold' }
    ]
  },
  {
    id: 6,
    slug: 'casa-bella',
    name: 'Casa Bella',
    hotel: 'Sun Central',
    category: 'Casual & Family',
    cuisine: 'Authentic Italian, Hand-Stretched Pizza & Fresh Pasta',
    priceRange: 'RR',
    averagePricePerPerson: 290,
    rating: 4.6,
    reviewCount: 780,
    tagline: 'Passionate Italian Dining with Handcrafted Pasta & Neapolitan Pizzas',
    description: 'Located in the heart of Sun Central entertainment hub, Casa Bella serves authentic Italian hospitality with freshly handmade pasta daily, artisan thin-crust pizzas baked in wood-fired ovens, and decadent Italian desserts.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '11h00 – 22h00 Daily',
    lunchHours: '11:00 – 17:00',
    dinnerHours: '17:00 – 22:00',
    dressCode: 'Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 15% Sun MVG Discount',
    phone: '+27 (0)14 557 1820',
    email: 'casabella@suninternational.com',
    atmosphere: ['Warm Italian Trattoria', 'Bustling Family Friendly', 'Sun Central Hub'],
    features: ['Wood-Fired Pizza Oven', 'Handmade Fresh Pasta Daily', 'Kids Menu', 'Italian Wine List'],
    menu: [
      {
        category: 'Artisan Wood-Fired Pizzas',
        items: [
          { name: 'Pizza Parma Ham & Rocket', description: 'Imported prosciutto di Parma, wild rocket, shaved parmesan, fior di latte mozzarella', price: 215, isChefSpecial: true },
          { name: 'Pizza Quattro Formaggi', description: 'Gorgonzola, mozzarella, fontina, aged parmesan, truffle oil', price: 195, isVegetarian: true },
          { name: 'Pizza Carne (Meat Lovers)', description: 'Slow-cooked bolognese, salami, bacon, caramelized onions', price: 225 }
        ]
      },
      {
        category: 'Handmade Pasta',
        items: [
          { name: 'Linguine Frutti di Mare', description: 'Prawns, mussels, calamari in a white wine garlic and cherry tomato sauce', price: 265, isChefSpecial: true },
          { name: 'Fettuccine Alfredo with Truffle', description: 'Creamy parmesan sauce, pan-fried mushrooms, white truffle oil', price: 185, isVegetarian: true }
        ]
      }
    ],
    reviews: [
      { author: 'Marco Rossi', date: 'August 2026', rating: 5, title: 'Real Italian pasta in South Africa!', comment: 'The pasta was cooked perfectly al dente and the wood-fired pizza crust was blistered and airy.', mvgTier: 'Silver' }
    ]
  },
  {
    id: 7,
    slug: 'the-brew-monkey',
    name: 'The Brew Monkey',
    hotel: 'Valley of Waves & Golf',
    category: 'Bars & Lounges',
    cuisine: 'Gastro-Pub, Craft Beers & Artisanal Snack Boards',
    priceRange: 'RR',
    averagePricePerPerson: 220,
    rating: 4.7,
    reviewCount: 890,
    tagline: 'Rustic Craft Beer Gastro-Pub Right Overlooking the Tidal Beach',
    description: 'Positioned right above the tidal lagoon at Valley of Waves, The Brew Monkey is Sun City’s premier gastro-pub. Enjoy ice-cold craft beers on tap, artisanal loaded burgers, gourmet sliders, and monster snack platters while watching the wave pool action.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '10h00 – 18h00 Daily (Extended during events)',
    lunchHours: '11:00 – 17:30',
    dressCode: 'Resort Casual / Beachwear Welcome',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 15% Sun MVG Discount',
    phone: '+27 (0)14 557 3855',
    email: 'brewmonkey@suninternational.com',
    atmosphere: ['Beachside Gastro-Pub', 'Lively & Energetic', 'Valley of Waves Views', 'Craft Beer Garden'],
    features: ['12 Local Craft Beers on Tap', 'Valley of Waves Lagoon Overlook', 'Monster Nachos & Wings', 'Live Sports Screens'],
    menu: [
      {
        category: 'Gastro Burgers & Sliders',
        items: [
          { name: 'The Big Monkey Smash Burger', description: 'Double beef patties, aged cheddar, crispy bacon, beer-battered onion rings, monkey sauce, fries', price: 185, isChefSpecial: true },
          { name: 'Crispy Peri-Peri Chicken Burger', description: 'Buttermilk fried chicken breast, spicy slaw, jalapeño mayo', price: 165 },
          { name: 'Trio of Gourmet Sliders', description: 'Smash beef, pulled BBQ pork, and crispy halloumi sliders', price: 195 }
        ]
      },
      {
        category: 'Loaded Boards & Craft Brews',
        items: [
          { name: 'Valley of Waves Mega Snack Platter', description: 'Smoked BBQ pork ribs, sticky buffalo wings, cheese grillers, loaded nachos, dipping sauces', price: 340, isChefSpecial: true },
          { name: 'Craft Beer Tasting Paddle (4 x 150ml)', description: 'Selection of 4 South African craft beers from light blonde to hazy IPA', price: 110 }
        ]
      }
    ],
    reviews: [
      { author: 'Brandon Taylor', date: 'August 2026', rating: 5, title: 'Best spot after a swim at Valley of Waves', comment: 'Great craft beers and the loaded snack platter fed our entire group after swimming.', mvgTier: 'Turquoise' }
    ]
  },
  {
    id: 8,
    slug: 'calistos-portuguese',
    name: 'Calisto’s Portuguese Restaurant',
    hotel: 'Sun Central',
    category: 'Casual & Family',
    cuisine: 'Authentic Portuguese, Mozambican Prawns & Flame-Grilled Chicken',
    priceRange: 'RR',
    averagePricePerPerson: 280,
    rating: 4.6,
    reviewCount: 540,
    tagline: 'Vibrant Flavours of Portugal, LM Prawns & World-Class Peri-Peri',
    description: 'Calisto’s brings the fiery, soulful flavors of Portuguese and Mozambican cooking to Sun Central. Famous for succulent flame-grilled Peri-Peri chicken, garlic butter prawns, prego rolls, and pitchers of house red sangria.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '11h00 – 22h00 Daily',
    lunchHours: '11:00 – 16:30',
    dinnerHours: '16:30 – 22:00',
    dressCode: 'Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 15% Sun MVG Discount',
    phone: '+27 (0)14 557 1940',
    email: 'calistos@suninternational.com',
    atmosphere: ['Festive & Vibrant', 'Family Friendly', 'Portuguese Tavern Vibe'],
    features: ['Flame-Grilled Peri-Peri Pit', 'Pitchers of Sangria', 'Seafood Combos'],
    menu: [
      {
        category: 'Portuguese Specialties',
        items: [
          { name: 'Half Flame-Grilled Peri-Peri Chicken & Prawn Combo', description: 'Basted in mild, hot or extra-hot peri-peri, with 6 queen prawns, chips & savory rice', price: 295, isChefSpecial: true },
          { name: 'Traditional Portuguese Trinchado (Beef)', description: 'Tender beef cubes braised in red wine, garlic, bay leaves and chilies, with warm Portuguese roll', price: 175 },
          { name: 'Espetada Tradicional', description: 'Rump steak skewers rubbed with coarse salt and bay leaves, dripping with garlic butter', price: 245 }
        ]
      }
    ],
    reviews: [
      { author: 'Carlos Mendes', date: 'July 2026', rating: 5, title: 'Authentic Portuguese flavor', comment: 'The peri-peri sauce has real kick and the prawns are fresh and juicy.', mvgTier: 'Silver' }
    ]
  },
  {
    id: 9,
    slug: 'legends-restaurant',
    name: 'Legends Restaurant',
    hotel: 'Sun City Hotel (Soho)',
    category: 'Casual & Family',
    cuisine: 'Tribute Theme Dining, Steaks & Gourmet Comfort Food',
    priceRange: 'RR',
    averagePricePerPerson: 260,
    rating: 4.5,
    reviewCount: 410,
    tagline: 'Celebrating the Musical, Sporting & Cultural Icons of Sun City',
    description: 'Immerse yourself in the storied entertainment legacy of Sun City. Legends pays homage to the legendary international superstars, boxers, and rock icons who have graced the Superbowl. Features hearty American-style ribs, burgers, and decadent milkshakes.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '12h00 – 23h00 Daily',
    lunchHours: '12:00 – 17:00',
    dinnerHours: '17:00 – 23:00',
    dressCode: 'Smart Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 1410',
    email: 'legends@suninternational.com',
    atmosphere: ['Celebrity Memorabilia', 'Rock & Roll Energy', 'Sports Lounge', 'Casual Fun'],
    features: ['Original Concert Memorabilia', 'Cocktail Bar', 'Giant Screen Sports', 'Gourmet Shake Station'],
    menu: [
      {
        category: 'Legends Burgers & Ribs',
        items: [
          { name: 'The Superstar BBQ Pork Ribs (600g)', description: 'Slow braised tender ribs basted in bourbon glaze with onion rings and fries', price: 295, isChefSpecial: true },
          { name: 'Superbowl Heavyweight Burger', description: 'Angus beef patty, smoked brisket, cheddar, pickled jalapeños, BBQ mayo', price: 195 }
        ]
      }
    ],
    reviews: [
      { author: 'Wayne Adams', date: 'August 2026', rating: 4.8, title: 'Awesome memorabilia and great ribs', comment: 'Loved seeing all the photos of Frank Sinatra and Queen performing at Sun City!', mvgTier: 'Gold' }
    ]
  },
  {
    id: 10,
    slug: 'the-palace-pool-deck',
    name: 'The Palace Pool Deck',
    hotel: 'The Palace of the Lost City',
    category: 'Poolside & Outdoor',
    cuisine: 'Wood-Fired Pizza, Artisan Burgers & Poolside Cocktails',
    priceRange: 'RRR',
    averagePricePerPerson: 360,
    rating: 4.8,
    reviewCount: 310,
    tagline: 'Relaxed Royal Dining Beside The Palace Royal Pool',
    description: 'Exclusive to Palace guests and day visitors with reservations, enjoy poolside luxury shaded by palms. Features wood-fired thin crust pizzas, light salads, artisan burgers, and refreshing signature tropical cocktails.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '10h00 – 18h00 Daily',
    lunchHours: '11:00 – 17:00',
    dressCode: 'Resort Casual / Pool Attire',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 3190',
    email: 'thepalace.pool@suninternational.com',
    atmosphere: ['Luxury Poolside', 'Sun Loungers', 'Tropical Palms', 'Cocktail Oasis'],
    features: ['Poolside Cabana Service', 'Wood-Fired Pizza Oven', 'Frozen Cocktail Bar', 'Towel & Concierge Service'],
    menu: [
      {
        category: 'Poolside Bites',
        items: [
          { name: 'Palace Gourmet Club Sandwich', description: 'Grilled chicken, bacon, avocado, egg, tomato, herbed mayo on toasted brioche', price: 185 },
          { name: 'Chilled Seafood Ceviche', description: 'Lime marinated kingklip, prawns, fresh mango, coriander, crispy tortilla crisps', price: 195, isChefSpecial: true },
          { name: 'Sun City Sunset Colada', description: 'Fresh pineapple juice, coconut cream, dark rum, marula liqueur', price: 110 }
        ]
      }
    ],
    reviews: [
      { author: 'Jessica Bloom', date: 'August 2026', rating: 5, title: 'Pure tropical luxury', comment: 'Cocktails delivered directly to your sunbed overlooking the grand Palace pool.', mvgTier: 'Platinum' }
    ]
  },
  {
    id: 11,
    slug: 'gary-player-country-club-lounge',
    name: 'Gary Player Country Club Lounge',
    hotel: 'Valley of Waves & Golf',
    category: 'Casual & Family',
    cuisine: 'Clubhouse Grill, Breakfast & 19th Hole Fare',
    priceRange: 'RR',
    averagePricePerPerson: 250,
    rating: 4.8,
    reviewCount: 390,
    tagline: 'Championship Golf Views & Classic Clubhouse Hospitality',
    description: 'Overlooking the famed 18th hole of the Gary Player Golf Course—home of the Nedbank Golf Challenge. Start your morning with a golfers breakfast or celebrate your round with prime steaks, club sandwiches, and chilled draught beer on the sunny terrace.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '06h30 – 19h00 Daily',
    breakfastHours: '06:30 – 11:30',
    lunchHours: '11:30 – 17:30',
    dressCode: 'Golf Attire / Smart Casual',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 1265',
    email: 'golf.dining@suninternational.com',
    atmosphere: ['Golf Course Panorama', 'Nedbank Golf Challenge History', 'Terrace Seating'],
    features: ['18th Green Views', 'Full English Golfers Breakfast', 'Pro Shop Access', 'Trophy Room Display'],
    menu: [
      {
        category: 'Clubhouse Classics',
        items: [
          { name: 'The Nedbank Champions Breakfast', description: 'Two eggs, bacon, boerewors sausage, grilled mushrooms, baked beans, hash brown & toast', price: 165, isChefSpecial: true },
          { name: 'The 19th Hole Gourmet Burger', description: '200g prime beef patty, mature cheddar, caramelized onions, biltong dust, fries', price: 175 },
          { name: 'Gary Player Club Sandwich', description: 'Triple decker with chicken mayo, smoked bacon, egg, tomato, cheddar', price: 155 }
        ]
      }
    ],
    reviews: [
      { author: 'Gary Botha', date: 'August 2026', rating: 5, title: 'Spectacular view of the 18th green', comment: 'The breakfast after an early 18 holes was superb. Incredible atmosphere.', mvgTier: 'Diamond' }
    ]
  },
  {
    id: 12,
    slug: 'tusk-bar-lounge',
    name: 'Tusk Bar & Lounge',
    hotel: 'The Palace of the Lost City',
    category: 'Bars & Lounges',
    cuisine: 'Rare Whiskies, Signature Cocktails & Light Luxury Tapas',
    priceRange: 'RRR',
    averagePricePerPerson: 350,
    rating: 4.9,
    reviewCount: 280,
    tagline: 'Safari Luxury, Bespoke Cocktails & Rare Single Malt Collection',
    description: 'Imposing bronze elephant tusks arch overhead in this opulent safari-luxe lounge inside The Palace. Sink into rich leather armchairs, sip artisanal cocktails, rare single malts, and vintage cognacs accompanied by live jazz piano.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
    ],
    hours: '14h00 – 00h00 Daily',
    dinnerHours: '17:00 – 23:30',
    dressCode: 'Smart Casual / Elegant',
    isHalaalCertified: false,
    isVegetarianFriendly: true,
    mvgDiscount: 'Up to 20% Sun MVG Discount',
    phone: '+27 (0)14 557 3182',
    email: 'tuskbar@suninternational.com',
    atmosphere: ['Opulent Safari Heritage', 'Live Grand Piano', 'Cigar Friendly Terrace', 'Intimate Lighting'],
    features: ['Extensive 50+ Single Malt Whisky Library', 'Bespoke Handcrafted Cocktails', 'Cigar Menu', 'Late Night Tapas'],
    menu: [
      {
        category: 'Signature Cocktails',
        items: [
          { name: 'The Lost City Golden Sun', description: 'Inverroche Amber gin, fynbos cordial, fresh passion fruit, topped with MCC & 24k gold flakes', price: 145, isChefSpecial: true },
          { name: 'Palace Smoked Old Fashioned', description: 'Woodford Reserve bourbon, aromatic bitters, orange zest, infused with cherrywood smoke under cloche', price: 160, isChefSpecial: true }
        ]
      }
    ],
    reviews: [
      { author: 'Lord Richard Sterling', date: 'August 2026', rating: 5, title: 'One of the most extraordinary bars in the world', comment: 'The architecture with the mammoth tusks and the whisky selection is second to none.', mvgTier: 'Diamond' }
    ]
  }
];

export const initialReservations: DiningReservation[] = [
  {
    id: 1,
    referenceCode: 'SUN-RES-8821',
    restaurantId: 1,
    restaurantName: 'The Grill Room',
    hotelLocation: 'The Palace of the Lost City',
    customerName: 'Marcus Vance',
    email: 'marcus.vance@executive.co.za',
    phone: '+27 82 555 1928',
    date: '2026-09-02',
    timeSlot: '19:30',
    guests: 2,
    seatingPreference: 'Private Dining / Cellar',
    dietaryNotes: 'Celebrating wedding anniversary. One guest gluten intolerant.',
    specialOccasion: 'Anniversary',
    mvgNumber: 'MVG-9842109',
    mvgTier: 'Platinum',
    status: 'Confirmed',
    createdAt: '2026-08-26T14:30:00Z',
  },
  {
    id: 2,
    referenceCode: 'SUN-RES-8822',
    restaurantId: 2,
    restaurantName: 'Crystal Court',
    hotelLocation: 'The Palace of the Lost City',
    customerName: 'Thandiwe Khumalo',
    email: 'thandiwe.k@investments.org',
    phone: '+27 83 400 8192',
    date: '2026-09-03',
    timeSlot: '14:30',
    guests: 4,
    seatingPreference: 'Terrace / Scenic View',
    dietaryNotes: 'The Palace Royal High Tea for four guests.',
    specialOccasion: 'Birthday',
    mvgNumber: 'MVG-3129481',
    mvgTier: 'Gold',
    status: 'Confirmed',
    createdAt: '2026-08-25T10:15:00Z',
  },
  {
    id: 3,
    referenceCode: 'SUN-RES-8823',
    restaurantId: 4,
    restaurantName: 'The Raj Restaurant',
    hotelLocation: 'Sun City Hotel (Soho)',
    customerName: 'Farouk Patel',
    email: 'farouk.patel@globaltech.com',
    phone: '+27 71 889 2311',
    date: '2026-09-04',
    timeSlot: '20:00',
    guests: 6,
    seatingPreference: 'Indoor Dining Room',
    dietaryNotes: 'Strictly 100% Certified Halaal required (family dinner).',
    specialOccasion: 'Family Celebration',
    mvgNumber: 'MVG-5401923',
    mvgTier: 'Silver',
    status: 'Confirmed',
    createdAt: '2026-08-24T18:40:00Z',
  }
];

// In-memory singletons for server runtime
declare global {
  var __mockRestaurants: RestaurantItem[] | undefined;
  var __mockReservations: DiningReservation[] | undefined;
}

export function getRestaurants(): RestaurantItem[] {
  if (!global.__mockRestaurants) {
    global.__mockRestaurants = [...initialRestaurants];
  }
  return global.__mockRestaurants;
}

export function getReservations(): DiningReservation[] {
  if (!global.__mockReservations) {
    global.__mockReservations = [...initialReservations];
  }
  return global.__mockReservations;
}

// Backward-compatibility interfaces & stubs
export interface HotelItem {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  amenities: string[];
  reviews?: { name: string; comment: string; rating: number }[];
}

export interface BookingItem {
  id: number | string;
  customerName: string;
  email?: string;
  hotelName: string;
  hotelId?: number | string;
  date: string;
  guests?: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export function getHotels(): HotelItem[] {
  return initialRestaurants.map(r => ({
    id: r.id,
    name: r.name,
    location: r.hotel,
    price: r.averagePricePerPerson,
    rating: r.rating,
    description: r.description,
    image: r.image,
    amenities: r.features,
    reviews: r.reviews.map(rev => ({ name: rev.author, comment: rev.comment, rating: rev.rating }))
  }));
}

export function getBookings(): BookingItem[] {
  return getReservations().map(res => ({
    id: res.id,
    customerName: res.customerName,
    email: res.email,
    hotelName: res.restaurantName,
    hotelId: res.restaurantId,
    date: `${res.date} (${res.timeSlot})`,
    guests: res.guests,
    status: res.status,
  }));
}

