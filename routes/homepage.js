var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

router.post('/', function (req, res, next) {
  res.render('homepage');
})


router.get('/', function (req, res, next) {
  res.render('homepage');
})

router.get('/my-tickets',function (req,res,next){
  res.render('my-tickets');
})

module.exports = router;