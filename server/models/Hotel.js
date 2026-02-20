const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);