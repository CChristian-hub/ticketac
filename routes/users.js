var express = require('express');
var router = express.Router();

let usersModel = require('../models/user');

router.get('/', function (req, res, next) {
  res.redirect('../')
});

router.post('/sign-up', async function (req, res, next) {
  var alreadyExist = await usersModel.findOne({ email: req.body.emailFromFront });

  if (alreadyExist == null) {
    var newUsers = new usersModel({
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
      journey: []
    });
    await newUsers.save();
  }
  res.render('index');
});


router.post('/sign-in', async function (req, res, next) {

  let allUsers = await usersModel.find();

  //Ceci marche aussi et c'est plus simple !
  //Le return permet de sortir de la fonction sinon le reste continu de s'executer !

  // var user = await usersModel.findOne({ email: req.body.emailFromFront, password: req.body.passwordFromFront })
  // console.log(user);
  // if (!user) {
  //   return res.redirect('/');
  // }
  // req.session.user = user.id;
  // res.redirect('/homepage');

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
