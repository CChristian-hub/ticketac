var express = require('express');
var router = express.Router();

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
let stripeItems = [];

router.post('/create-checkout-session', async (req, res) => {

// NEED TO FIX, error : The `line_items` parameter is required in payment mode.

for(let i = 0;i < req.session.ticketCard; i++){
  stripeItems.push({
    price_data: {
      currency: 'eur',
      product_data: {
        name: 'Billet de train' + req.session.ticketCard[i].departure / req.session.ticketCard[i].Paris ,
      },
      unit_amount: req.session.ticketCard[i].price * 100,
    },
    quantity: req.session.ticketCard[i].quantity,
  });
}

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: stripeItems,
  mode: "payment",
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