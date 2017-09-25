const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models');
var Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function (req, res) {
  Page.findAll().then(function (allPages) {
    res.render('index', { pages: allPages });
  });
});

module.exports = router;
