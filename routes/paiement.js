var express = require('express');
var router = express.Router();
let usersModel = require('../models/user');
let journeyModel = require('../models/journey');
const mongoose = require('mongoose');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
let stripeItems = [];

router.post('/create-checkout-session', async (req, res) => {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  var checkoutArray = [];
  for (var i = 0; i < req.session.ticketCard.length; i++) {
    var name = "Billet de train: [" + req.session.ticketCard[i].departure + "/" + req.session.ticketCard[i].arrival + "] - (" + req.session.ticketCard[i].date + " à " + req.session.ticketCard[i].departureTime + ")";
    checkoutArray.push({ price_data: { currency: 'eur', product_data: { name: name, }, unit_amount: 100 * parseInt(req.session.ticketCard[i].price), }, quantity: 1 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: checkoutArray,
    mode: "payment",
    success_url: 'http://localhost:3000/paiement/success',
    cancel_url: 'http://localhost:3000/paiement/cancel',
  });

  res.redirect(303, session.url);
});

router.get('/success', async (req, res) => {
  var user = await usersModel.findById(req.session.user.id).populate().exec();

  for (var i = 0; i < req.session.ticketCard.length; i++) {
    user.journeys.push(req.session.ticketCard[i]);
  }
  await user.save();
  req.session.ticketCard = []
  res.render('success');
});

router.get('/cancel', (req, res) => {
  res.render('cancel');
});


module.exports = router;