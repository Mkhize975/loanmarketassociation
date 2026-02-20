const express = require('express');
const router = express.Router();

// Mock database for bookings
let bookings = [];

// Create a booking
router.post('/bookings', (req, res) => {
    const { id, customerName, hotelName, date, status } = req.body;
    const newBooking = { id, customerName, hotelName, date, status };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

// Retrieve all bookings
router.get('/bookings', (req, res) => {
    res.status(200).json(bookings);
});

// Update a booking
router.put('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
        const updatedBooking = { ...bookings[index], ...req.body };
        bookings[index] = updatedBooking;
        res.status(200).json(updatedBooking);
    } else {
        res.status(404).send('Booking not found');
    }
});

// Cancel a booking
router.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    bookings = bookings.filter(booking => booking.id !== id);
    res.status(204).send();
});

module.exports = router;