var express = require('express');
var router = express.Router();
let usersModel = require('../models/user');
let journeyModel = require('../models/journey');
const mongoose = require('mongoose');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
let stripeItems = [];

router.post('/create-checkout-session', async (req, res) => {


  // NEED TO FIX, error : The `line_items` parameter is required in payment mode.
  // var users = await userModel
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
  // console.log(req.session.user);
  var user = await usersModel.findById(req.session.user.id).populate().exec();
  // console.log(user);

  console.log("BEGINNING OF THE LOOP")
  // console.log(req.session.ticketCard);
  for (var i = 0; i < req.session.ticketCard.length; i++) {
    console.log(i);
    var temp = JSON.stringify(req.session.ticketCard[i]);
    var temp2 = JSON.parse(temp);
    console.log(typeof (temp))
    console.log(temp);
    console.log(typeof (temp2))
    console.log(temp2);
    // console.log(req.session.ticketCard[i]);
    // console.log(typeof (req.session.ticketCard[i]))
    // user.journeys.push(req.session.ticketCard[i]);
  }
  // console.log(user);
  // console.log(user.journeys);
  res.render('success');
});

router.get('/cancel', (req, res) => {
  res.render('cancel');
});


module.exports = router;