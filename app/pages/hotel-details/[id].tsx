import React from 'react';
import { useRouter } from 'next/router';

const HotelDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    // Dummy data for hotel details
    const hotel = {
        id,
        name: 'Grand Hotel',
        description: 'A luxurious stay in the heart of the city.',
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Parking'],
        reviews: [
            { name: 'Alice', comment: 'Amazing experience!', rating: 5 },
            { name: 'Bob', comment: 'Very comfortable.', rating: 4 },
        ],
    };

    return (
        <div>
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
            <h2>Amenities</h2>
            <ul>
                {hotel.amenities.map((amenity) => (<li key={amenity}>{amenity}</li>))}
            </ul>
            <h2>Reviews</h2>
            <ul>
                {hotel.reviews.map((review) => (
                    <li key={review.name}>
                        <strong>{review.name}</strong>: {review.comment} ({review.rating}/5)
                    </li>
                ))}
            </ul>
            <h2>Book Your Stay</h2>
            <form>
                <input type='date' required />
                <input type='number' placeholder='Number of guests' required />
                <button type='submit'>Book Now</button>
            </form>
        </div>
    );
};

export default HotelDetails;
