import React from 'react';

const HeroSection = () => {
    const featuredDestinations = [
        { name: 'Paris', offer: '20% off on hotels' },
        { name: 'New York', offer: '30% off on flights' },
        { name: 'Tokyo', offer: 'Buy 1 Get 1 Free on tours' },
    ];

    return (
        <div className="hero-section">
            <h1>Featured Destinations</h1>
            <div className="destinations">
                {featuredDestinations.map((destination, index) => (
                    <div key={index} className="destination">
                        <h2>{destination.name}</h2>
                        <p>{destination.offer}</p>
                    </div>
                ))}
            </div>
            <footer>
                <h2>Exclusive Offers</h2>
                <p>Check out our latest deals!</p>
            </footer>
        </div>
    );
};

export default HeroSection;