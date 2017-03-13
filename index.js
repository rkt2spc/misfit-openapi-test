var express = require('express');
var app = express();

app.get('/', (req, res) => res.status(200).end("OK"));
app.get('/oauth', (req, res) => {
    console.log(req.query);
    res.end();
});

var PORT = process.env.PORT || 3000;
app.listen(PORT);