var morgan = require('morgan');
var express = require('express');
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
    console.log(req.query);
    console.log(req.body);
    res.status(200).end();
});

var PORT = process.env.PORT || 3000;
app.listen(PORT);