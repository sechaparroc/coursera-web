var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

dishRouter(express, bodyParser, function(err, route){
	if(err){
		console.log(err);
	}else{
		app.use('/dishes', route.dishRouter());
	}
});

promoRouter(express, bodyParser, function(err, route){
	if(err){
		console.log(err);
	}else{
		app.use('/promotions', route.promoRouter());
	}
});

leaderRouter(express, bodyParser, function(err, route){
	if(err){
		console.log(err);
	}else{
		app.use('/leadership', route.leaderRouter());
	}
});


app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});