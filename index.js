var morgan = require('morgan');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).end("OK"));
app.get('/oauth', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.end();
});
app.post('/subscribe', (req, res) => {
    var subscribeURL = req.body.SubscribeURL; 
    request.get(subscribeURL, (err, response, body) => {
        if (err)
            return console.log(err);
        
        console.log(body);
        console.log('Subscription success');
        res.status(200).end();
    });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT);