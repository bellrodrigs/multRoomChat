//Import Modules
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

//Set routes views
app.set('view engine', 'ejs');
app.set('views', './app/views');

//
app.use(express.static('./app/public'));

//
app.use(bodyParser.urlencoded({extended:true}));

app.use(expressValidator());

//Do the autoload of routes,controllers and models for to app object
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//Export objet from app
module.exports = app;