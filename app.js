'use strict';

const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const routes = require('./routes');
const nunjucks = require('nunjucks');


app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', ({noCache: true}));

app.use(volleyball);

app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);