var express = require('express');
var router = express.Router();


let usersModel = require('../models/user');

router.get('/', function (req, res, next) {
  res.redirect('../')
});

router.get('/sign-up', function (req, res, next) {
  res.render('index')
})

router.post('/sign-up', async function (req, res, next) {
  if (req.body.firstNameFromFront === "" || req.body.lastNameFromFront === "" || req.body.emailFromFront === "" || req.body.passwordFrommFront === "") {
    return res.redirect('/')
  }
  var alreadyExist = await usersModel.findOne({ email: req.body.emailFromFront });
  var msgSuccess = false;
  if (alreadyExist == null) {
    msgSuccess = true;
    var newUsers = new usersModel({
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
      journey: []
    });
    await newUsers.save();
  }
  console.log(req.session.msgSuccess);
  res.render('index', { message_success: msgSuccess });
});


router.post('/sign-in', async function (req, res, next) {

  let allUsers = await usersModel.find();

  // Création séssion si email est mdp in BDD
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == req.body.emailFromFront) {
      if (allUsers[i].password == req.body.passwordFromFront) {
        req.session.user = {
          id: allUsers[i]._id,
        }
        res.redirect('/homepage')
      }
    }
  }

  res.render('index');
});

module.exports = router;
