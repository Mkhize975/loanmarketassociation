import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [hotels, setHotels] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [hotelName, setHotelName] = useState('');

    const fetchHotels = async () => {
        // Fetch hotels from API
        const response = await fetch('/api/hotels');
        const data = await response.json();
        setHotels(data);
    };

    const fetchBookings = async () => {
        // Fetch bookings from API
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
    };

    const handleAddHotel = async () => {
        // Add a new hotel
        const response = await fetch('/api/hotels', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: hotelName }),
        });
        if (response.ok) {
            fetchHotels();
            setHotelName('');
        }
    };

    const handleDeleteHotel = async (id) => {
        // Delete a hotel
        const response = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchHotels();
        }
    };

    useEffect(() => {
        fetchHotels();
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Manage Hotels</h2>
                <input 
                    type="text" 
                    value={hotelName} 
                    onChange={(e) => setHotelName(e.target.value)} 
                    placeholder="New Hotel Name" 
                />
                <button onClick={handleAddHotel}>Add Hotel</button>
                <ul>
                    {hotels.map((hotel) => (
                        <li key={hotel.id}>
                            {hotel.name} <button onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Manage Bookings</h2>
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>{booking.hotelName} - {booking.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
