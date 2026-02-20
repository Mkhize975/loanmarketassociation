import React, { useEffect, useState } from 'react';

// Sample hotel data (to be replaced with an actual fetch request)
const sampleHotels = [
    { id: 1, name: 'Hotel A', location: 'City A', rating: 4.5 },
    { id: 2, name: 'Hotel B', location: 'City B', rating: 4.0 },
    { id: 3, name: 'Hotel C', location: 'City A', rating: 3.5 },
    { id: 4, name: 'Hotel D', location: 'City C', rating: 5.0 },
];

const HotelsPage = () => {
    const [hotels, setHotels] = useState(sampleHotels);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHotels, setFilteredHotels] = useState(hotels);

    useEffect(() => {
        // Fetch hotels from an API or source here
        // Example: fetch('/api/hotels')
        //    .then(response => response.json())
        //    .then(data => setHotels(data));
    }, []);

    useEffect(() => {
        setFilteredHotels(
            hotels.filter(hotel =>
                hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, hotels]);

    return (
        <div>
            <h1>Available Hotels</h1>
            <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ul>
                {filteredHotels.map(hotel => (
                    <li key={hotel.id}>
                        <h2>{hotel.name}</h2>
                        <p>Location: {hotel.location}</p>
                        <p>Rating: {hotel.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelsPage;