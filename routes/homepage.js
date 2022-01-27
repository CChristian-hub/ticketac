var express = require('express');
var router = express.Router();
let usersModel = require('../models/user');
let journeyModel = require('../models/journey');
const mongoose = require('mongoose');
const { aggregate } = require('../models/user');


router.post('/', function (req, res, next) {
  res.render('homepage');
})


router.get('/', function (req, res, next) {
  res.render('homepage');
})

router.get('/my-tickets', function (req, res, next) {
  res.render('my-tickets');
})

router.get('/lastTrips', function (req, res, next) {
  res.render('lastTrips')
})

router.get('/ticketError', function (req, res, next) {
  res.render('ticketerror');
})

router.get('/search', function (req, res, next) {
  res.render('search')
})
router.post('/search', async function (req, res, next) {
  var journeys = await journeyModel.find();

  if (!req.body.departure || !req.body.arrival) {
    return res.render('search');
  }

  //Formatting string
  var stockDeparture = req.body.departure.toLowerCase();
  stockDeparture = req.body.departure.charAt(0).toUpperCase() + req.body.departure.slice(1);
  var stockArrival = req.body.arrival.toLowerCase();
  stockArrival = req.body.arrival.charAt(0).toUpperCase() + req.body.arrival.slice(1);

  //Calling DB and error management
  var journey = await journeyModel.find({ "departure": stockDeparture, "arrival": stockArrival });
  if (journey.length === 0) {
    return res.redirect('ticketerror');
  }

  //Parsing Date and Saving valid array in Stock variable
  var date = new Date(Date.parse(req.body.date));
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var stock = [];
  for (var i = 0; i < journey.length; i++) {
    var dbDate = new Date(Date.parse(journey[i].date));
    var dbMonth = dbDate.getMonth() + 1;
    var dbDay = dbDate.getDate();
    if (dbMonth == month && dbDay >= day) {
      stock.push(journey[i]);
    }
  }
  //Rendering with array of valid travels, the month and day for display
  res.render('search', { journey: stock, month, day })
})

module.exports = router;