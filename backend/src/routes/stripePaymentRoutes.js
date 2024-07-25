import User from '../models/user.js';
import express from 'express';
import Stripe from 'stripe';
const stripe = Stripe(
  'sk_test_51PfzDtSA0aLBsyg443L25nRpxLccbz9vm98oLeXqWMjgWzs5yq1KQD4tzIt6Pjf9i0eGpgUmfPjGIGWuhAw3tG8u00aMTEmUpf'
);
const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'Premium Membership',
            },
            unit_amount: 59900, // Amount in paise (599 INR)
          },
          quantity: 1,
        },
      ],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      metadata: {
        customer_name: 'test',
        customer_address: JSON.stringify(''),
      },
      mode: 'payment',
      success_url:
        'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return res.json({ id: session.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/success', async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customerEmail = session.customer_details.email;

    // Update the user's subscription status in the database
    await User.findOneAndUpdate(
      { email: customerEmail },
      { subscriptionStatus: true },
      { new: true, upsert: true }
    );

    return res.send('Payment successful and user updated.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
