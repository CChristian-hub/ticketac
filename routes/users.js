var express = require('express');
var router = express.Router();

let usersModel = require('../models/user');

router.get('/', function (req, res, next) {
  console.log('TESTTTTT')
  res.render('index')
});

router.post('/sign-up', async function (req, res, next) {
  var alreadyExist = await usersModel.findOne({ email: req.body.emailFromFront });

  if (alreadyExist == null) {
    var newUsers = new usersModel({
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    });

    await newUsers.save();
  }

  res.render('index');
});


router.post('/sign-in', async function (req, res, next) {

  let allUsers = await usersModel.find();

  // Création séssion si email est mdp in BDD
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == req.body.emailFromFront) {
      if (allUsers[i].password == req.body.passwordFromFront) {
        res.redirect('/homepage')
      }
    }
  }

  res.render('index');
});

module.exports = router;
