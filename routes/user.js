const express = require('express');
const userRouter = express.Router();
var models = require('../models');
var User = models.User;
var Page = models.Page;

userRouter.get('/:id', function (req, res, next) {
  var userPromise = User.findById(req.params.id);
  var pagePromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([userPromise, pagePromise])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('user', { user: user, pages: pages });
  })
  .catch(next);

});

userRouter.get('/', function (req, res) {
  User.findAll().then(function (allUsers) {
    res.render('users', { users: allUsers });
  });
});

module.exports = userRouter;
