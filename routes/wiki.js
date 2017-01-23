'use strict';

const express = require ('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
	let title = req.body.title;
	let content = req.body.content;

	let page = Page.build({
		title: title,
		content: content
  });
  page.save()
  .then(function () {
		res.redirect('/');
  });

});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});


module.exports = router;
