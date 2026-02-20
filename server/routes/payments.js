const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe('your_stripe_secret_key'); // Replace with your Stripe secret key

// POST route to create a payment
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(201).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;