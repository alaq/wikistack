const express = require('express');
const wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/add', function(req, res, next) {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', function(req, res, next) {
  // res.send('got to GET /wiki/');
  // res.send(req.params.urlTitle);

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function (pageFound) {
    console.log(pageFound);
    pageFound.getAuthor()
    .then(
      function (author) {
        res.render('wikipage', {pageFound: pageFound, user: author });
      });
  }).catch(next);

});

wikiRouter.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var tags = req.body.tags.split(' ');

  User.findOrCreate(
    { where: {
    name: req.body.name,
    email: req.body.email
  }}).then(function (success) {

    var user = success[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: tags
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

   })
   .then(function (page) {
     res.redirect(page.route);
   })
   .catch(next);


  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.

});

module.exports = wikiRouter;
