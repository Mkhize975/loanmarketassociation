import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SunHeader from '../app/components/SunHeader';
import SunFooter from '../app/components/SunFooter';
import RestaurantHero from '../app/components/RestaurantHero';
import RestaurantFilterBar from '../app/components/RestaurantFilterBar';
import RestaurantCard from '../app/components/RestaurantCard';
import TableReservationModal from '../app/components/TableReservationModal';
import RestaurantMenuModal from '../app/components/RestaurantMenuModal';
import SunMVGSection from '../app/components/SunMVGSection';
import DietaryHalaalBanner from '../app/components/DietaryHalaalBanner';
import ResortDiningMapModal from '../app/components/ResortDiningMapModal';
import MyReservationsView from '../app/components/MyReservationsView';
import { initialRestaurants, RestaurantItem, DiningReservation } from '../lib/db';
import { 
  Building2, 
  Waves, 
  Award, 
  Sparkles, 
  Palmtree, 
  ShieldCheck, 
  HelpCircle, 
  Phone, 
  ChevronDown, 
  ChevronUp,
  UtensilsCrossed,
  Clock,
  MapPin,
  CalendarCheck
} from 'lucide-react';

export default function SunCityRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>(initialRestaurants);
  const [reservations, setReservations] = useState<DiningReservation[]>([]);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [halalOnly, setHalalOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

  // Active view: 'directory' or 'my-reservations'
  const [currentView, setCurrentView] = useState<'directory' | 'my-reservations'>('directory');

  // Modal States
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedRestaurantForBooking, setSelectedRestaurantForBooking] = useState<RestaurantItem | null>(null);
  
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [selectedRestaurantForMenu, setSelectedRestaurantForMenu] = useState<RestaurantItem | null>(null);

  const [mapModalOpen, setMapModalOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Load live data from API
  useEffect(() => {
    fetchRestaurants();
    fetchReservations();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch('/api/restaurants');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRestaurants(data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch restaurants:', e);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch('/api/reservations');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setReservations(data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch reservations:', e);
    }
  };

  const handleOpenBooking = (rest?: RestaurantItem) => {
    setSelectedRestaurantForBooking(rest || restaurants[0]);
    setReservationModalOpen(true);
  };

  const handleOpenMenu = (rest: RestaurantItem) => {
    setSelectedRestaurantForMenu(rest);
    setMenuModalOpen(true);
  };

  const handleReservationCreated = (newReservation: DiningReservation) => {
    setReservations(prev => [newReservation, ...prev]);
  };

  const handleCancelReservation = async (id: number | string) => {
    try {
      await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error('Failed to cancel reservation:', e);
    }
  };

  // Filter & Search Logic
  const filteredRestaurants = restaurants.filter(r => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.name.toLowerCase().includes(q) ||
        r.hotel.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedCategory !== 'all' && r.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (selectedHotel !== 'all' && !r.hotel.toLowerCase().includes(selectedHotel.toLowerCase())) {
      return false;
    }

    if (selectedCuisine !== 'all' && !r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())) {
      return false;
    }

    if (halalOnly && !r.isHalaalCertified) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_asc') return a.averagePricePerPerson - b.averagePricePerPerson;
    if (sortBy === 'price_desc') return b.averagePricePerPerson - a.averagePricePerPerson;
    return 0; // recommended default
  });

  // Hotel Groups for Grouped View
  const hotelGroups = [
    {
      name: 'The Palace of the Lost City',
      anchor: 'the-palace',
      tagline: 'Imperial Luxury, Sommelier Cellars & Royal High Tea',
      icon: Building2,
      restaurants: sortedRestaurants.filter(r => r.hotel.includes('Palace')),
    },
    {
      name: 'Cascades Hotel & Sun City Hotel (Soho)',
      anchor: 'cascades-soho',
      tagline: 'Lakeside Waterfall Dining, Certified Halaal & Entertainment Feasts',
      icon: Waves,
      restaurants: sortedRestaurants.filter(r => r.hotel.includes('Cascades') || r.hotel.includes('Soho')),
    },
    {
      name: 'Sun Central Entertainment Centre',
      anchor: 'sun-central',
      tagline: 'Family Trattorias, Portuguese Grills & Vibrant Eateries',
      icon: Sparkles,
      restaurants: sortedRestaurants.filter(r => r.hotel.includes('Sun Central')),
    },
    {
      name: 'Valley of Waves & Golf Clubhouses',
      anchor: 'valley-golf',
      tagline: 'Beachfront Gastro-Pubs & Championship 18th Green Terraces',
      icon: Palmtree,
      restaurants: sortedRestaurants.filter(r => r.hotel.includes('Valley') || r.hotel.includes('Cabanas')),
    },
  ].filter(g => g.restaurants.length > 0);

  const FAQS = [
    {
      q: 'Do I need to book restaurants at Sun City in advance?',
      a: 'We strongly recommend booking fine-dining venues (such as The Grill Room, Plume, and Crystal Court High Tea) at least 2 to 7 days in advance, especially during weekends, school holidays, and golf tournaments. You can reserve instantly using our online booking system.',
    },
    {
      q: 'Where can I find strictly Certified Halaal dining at Sun City?',
      a: 'The Raj Indian Restaurant at the Sun City Hotel (Soho) is 100% Certified Halaal (SANHA / MJC certified), operating with a dedicated kitchen and certified ingredients. Many other resort venues also offer certified vegetarian and pescatarian options.',
    },
    {
      q: 'How does the Sun MVG dining discount work?',
      a: 'Sun MVG members enjoy discounts from 10% (Turquoise) up to 20% (Diamond) on food and beverages at participating Sun City restaurants. Simply enter your MVG number when booking or present your card to your server upon bill settlement.',
    },
    {
      q: 'What is the dress code for fine dining at The Palace?',
      a: 'The Grill Room and Plume observe a Smart Elegant dress code (collared shirts, trousers, and closed shoes for gentlemen; elegant evening wear for ladies). Poolside and casual eateries welcome resort wear.',
    },
    {
      q: 'Is The Palace Royal High Tea open to day visitors?',
      a: 'Yes, Crystal Court High Tea at The Palace of the Lost City welcomes resort guests and day visitors with advance table reservations.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sunstone-50 text-slate-900 font-sans">
      <Head>
        <title>Sun City Restaurants &amp; Dining | Sun International</title>
        <meta
          name="description"
          content="Explore over 30 culinary destinations at Sun City Resort. From fine dining at The Palace to certified Halaal curries, poolside gastro-pubs, and Italian trattorias."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sun International Luxury Header */}
      <SunHeader
        onOpenReservation={() => handleOpenBooking()}
        onViewReservations={() => setCurrentView('my-reservations')}
        reservationCount={reservations.length}
      />

      <main className="flex-1">
        {currentView === 'my-reservations' ? (
          /* My Reservations Management View */
          <MyReservationsView
            reservations={reservations}
            onBackToDirectory={() => setCurrentView('directory')}
            onCancelReservation={handleCancelReservation}
            onNewReservation={() => {
              setCurrentView('directory');
              handleOpenBooking();
            }}
          />
        ) : (
          /* Main Sun City Restaurants Directory */
          <>
            {/* Hero Section */}
            <RestaurantHero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenReservation={() => handleOpenBooking()}
              onOpenMap={() => setMapModalOpen(true)}
              totalVenues={restaurants.length}
            />

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Filter and View Controls */}
              <RestaurantFilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedHotel={selectedHotel}
                onSelectHotel={setSelectedHotel}
                selectedCuisine={selectedCuisine}
                onSelectCuisine={setSelectedCuisine}
                halalOnly={halalOnly}
                onToggleHalal={() => setHalalOnly(!halalOnly)}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                viewMode={viewMode}
                onToggleViewMode={setViewMode}
                resultCount={sortedRestaurants.length}
              />

              {/* Restaurant Cards Container */}
              {sortedRestaurants.length === 0 ? (
                <div className="bg-white rounded-2xl border border-sunstone-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-12">
                  <div className="w-16 h-16 bg-sungold-50 text-sungold-600 rounded-full flex items-center justify-center mx-auto">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-sunblue-900 font-serif-luxury">
                    No Restaurants Matched Your Filters
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Try clearing some of your search terms or dietary filters to explore our full selection of Sun City dining venues.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedHotel('all');
                      setSelectedCuisine('all');
                      setHalalOnly(false);
                    }}
                    className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* Flat Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {sortedRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onBookTable={handleOpenBooking}
                      onViewMenu={handleOpenMenu}
                    />
                  ))}
                </div>
              ) : (
                /* Grouped by Hotel / Resort Area View */
                <div className="space-y-16 mb-16">
                  {hotelGroups.map((group) => {
                    const Icon = group.icon;
                    return (
                      <div key={group.name} id={group.anchor} className="space-y-6 pt-4 scroll-mt-24">
                        <div className="border-b-2 border-sungold-400 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 text-sungold-700 text-xs font-bold uppercase tracking-wider mb-1">
                              <Icon className="w-4 h-4" />
                              <span>Resort Precinct</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-sunblue-900 font-serif-luxury">
                              {group.name}
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                              {group.tagline}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-500 shrink-0">
                            {group.restaurants.length} {group.restaurants.length === 1 ? 'Venue' : 'Venues'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {group.restaurants.map((restaurant) => (
                            <RestaurantCard
                              key={restaurant.id}
                              restaurant={restaurant}
                              onBookTable={handleOpenBooking}
                              onViewMenu={handleOpenMenu}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* The Palace Spotlight Banner */}
              <div id="the-palace" className="bg-gradient-to-r from-sunblue-950 via-sunblue-900 to-amber-950 text-white rounded-2xl p-6 sm:p-10 border-2 border-sungold-400/50 shadow-xl mb-16 relative overflow-hidden">
                <div className="max-w-2xl relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-sungold-500/20 text-sungold-300 border border-sungold-400/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>The Palace of the Lost City Exclusive</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-white">
                    Royal Dining &amp; The Palace High Tea
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    Step inside the grand architecture of The Palace. Savor dry-aged cuts at The Grill Room, experience royal tiered High Tea at Crystal Court overlooking cascading tropical fountains, or enjoy candlelit Afro-French gastronomy at Plume.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        const palaceRest = restaurants.find(r => r.slug === 'crystal-court') || restaurants[0];
                        handleOpenBooking(palaceRest);
                      }}
                      className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Book High Tea at Crystal Court</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedHotel('The Palace of the Lost City');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="bg-sunblue-800/80 hover:bg-sunblue-700 text-white font-semibold px-4 py-2.5 rounded-lg text-xs border border-sungold-400/30 transition-colors"
                    >
                      Filter The Palace Venues
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Sun MVG Loyalty Section */}
            <SunMVGSection onBookTable={() => handleOpenBooking()} />

            {/* Halaal & Dietary Guide */}
            <DietaryHalaalBanner
              onFilterHalaal={() => {
                setHalalOnly(true);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              onBookHalaal={() => {
                const raj = restaurants.find(r => r.slug === 'the-raj') || restaurants[0];
                handleOpenBooking(raj);
              }}
            />

            {/* Resort Dining FAQ & Concierge Help */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                <div className="inline-flex items-center gap-1.5 bg-sunstone-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-sungold-600" />
                  <span>Guest Information</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunblue-900 font-serif-luxury">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Everything you need to know about dining at Sun City Resort
                </p>
              </div>

              <div className="space-y-3 mb-10">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-sunstone-200 overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-sungold-700 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-sungold-600 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-sunstone-100 bg-sunstone-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Concierge Contact Box */}
              <div className="bg-sunblue-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sungold-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sungold-500 text-sunblue-900 flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-serif-luxury text-white">
                      Need Personal Dining Recommendations?
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Contact the Sun City Central Dining Concierge desk for group banquets and private events.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <a
                    href="tel:+27145571000"
                    className="inline-block bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors"
                  >
                    Call +27 (0)14 557 1000
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modals */}
      <TableReservationModal
        restaurant={selectedRestaurantForBooking}
        allRestaurants={restaurants}
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        onReservationCreated={handleReservationCreated}
      />

      <RestaurantMenuModal
        restaurant={selectedRestaurantForMenu}
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onBookTable={(rest) => {
          handleOpenBooking(rest);
        }}
      />

      <ResortDiningMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        restaurants={restaurants}
        onSelectRestaurant={(rest) => {
          handleOpenBooking(rest);
        }}
      />

      {/* Sun International Corporate Footer */}
      <SunFooter />
    </div>
  );
}
