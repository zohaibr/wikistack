'use strict';

const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
//const routes = require('./routes');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models');
const wikiRouter = require('./routes/wiki');

// templating boilerplate setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', ({noCache: true}));

// logging middleware
app.use(volleyball);

// start the server
app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());

// sync models with database
models.User.sync({})
.then(function() {
	return models.Page.sync({});
})
.then(function() {
	app.listen(3000, function() {
	    console.log('listening on 3000');
	});
})
.catch(console.error);


app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.use('/wiki', wikiRouter);
//app.use('/', routes);
