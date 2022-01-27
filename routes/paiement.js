var express = require('express');
var router = express.Router();

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.post('/create-checkout-session', async (req, res) => {
 const session = await stripe.checkout.sessions.create({
   payment_method_types: ['card'],
   line_items: [
     {
       price_data: {
         currency: 'eur',
         product_data: {
           name: 'Vélo BIK098',
         },
         unit_amount: 2000,
       },
       quantity: 2,
     },
   ],
   mode: 'payment',
   success_url: 'http://localhost:3000/paiement/success',
   cancel_url: 'http://localhost:3000/paiement/cancel',
 });

 res.redirect(303, session.url);
});

router.get('/success', (req, res) => { 
  res.render('success'); 
});

router.get('/cancel', (req, res) => { 
  res.render('cancel'); 
});


module.exports = router;