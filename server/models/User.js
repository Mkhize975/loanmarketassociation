'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema Definition
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Object,
        default: {},
    },
    clerkId: {
        type: String,
        required: true,
    },
    clerkSecret: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);