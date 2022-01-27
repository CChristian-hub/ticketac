var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

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

module.exports = router;