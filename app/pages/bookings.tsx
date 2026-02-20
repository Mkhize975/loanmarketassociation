import React from 'react';

const Bookings: React.FC = () => {
    // Sample data for user's booking history
    const bookings = [
        { id: 1, date: '2026-02-18', status: 'Confirmed' },
        { id: 2, date: '2026-02-19', status: 'Pending' },
        // Additional bookings can be added here
    ];

    return (
        <div>
            <h1>Your Bookings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.date}</td>
                            <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Manage Your Bookings</h2>
            <button onClick={() => alert('Feature to add booking')}>Add Booking</button>
            <button onClick={() => alert('Feature to cancel booking')}>Cancel Booking</button>
        </div>
    );
};

export default Bookings;