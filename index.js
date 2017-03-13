var express = require('express');
var app = express();

app.get('/', (req, res) => res.status(200).end("OK"));
app.get('/oauth', (req, res) => {
    console.log(req.query);
    res.end();
});

app.listen(3000);