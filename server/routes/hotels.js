const express = require('express');
const router = express.Router();

// Mock database
let hotels = [];

// GET all hotels
router.get('/', (req, res) => {
    try {
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// GET hotel by ID
router.get('/:id', (req, res) => {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
});

// POST create new hotel
router.post('/', (req, res) => {
    const newHotel = {
        id: hotels.length + 1,
        name: req.body.name,
        location: req.body.location,
        price: req.body.price,
    };
    hotels.push(newHotel);
    res.status(201).json(newHotel);
});

// PUT update hotel
router.put('/:id', (req, res) => {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    hotel.name = req.body.name;
    hotel.location = req.body.location;
    hotel.price = req.body.price;
    res.status(200).json(hotel);
});

// DELETE hotel
router.delete('/:id', (req, res) => {
    const hotelIndex = hotels.findIndex(h => h.id === parseInt(req.params.id));
    if (hotelIndex === -1) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    hotels.splice(hotelIndex, 1);
    res.status(204).send();
});

module.exports = router;