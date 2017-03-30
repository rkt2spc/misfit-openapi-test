var morgan = require('morgan');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).end("OK"));
app.get('/login', (req, res) => res.redirect('https://api.misfitwearables.com/auth/dialog/authorize?response_type=token&client_id=uDHmdBZVZakB8jL2&client_secret=UlKUAiI2SW9RlK1d3wTlT5ZF9mM8appW&redirect_uri=mfc-P8ABAdMAhoLuBBoO://authorize&scope=public,birthday,email'));
app.get('/oauth', (req, res) => {
    var code = req.query.code;
    var postBody = {
        grant_type: 'authorization_code',
        client_id: 'uDHmdBZVZakB8jL2',
        client_secret: 'UlKUAiI2SW9RlK1d3wTlT5ZF9mM8appW',
        redirect_uri: 'https://test-openapi.herokuapp.com/oauth',
        code: req.query.code
    };

    request.post({
        url: 'https://api.misfitwearables.com/auth/tokens/exchange',
        body: postBody,
        json: true
    },
        (err, response, body) => {
            if (err) {
                console.log(err);
                res.status(500).end(err.toString());
            }

            console.log('I am here');
            console.log(body);
            res.status(200).end();
        });
});



app.post('/notification', (req, res) => {
    console.log(req.body);
    res.status(200).end();
});

// app.post('/notification', (req, res) => {
//     var subscribeURL = req.body.SubscribeURL; 

//     request.get(subscribeURL, (err, response, body) => {
//         if (err)
//             return console.log(err);

//         console.log(body);
//         console.log('Subscription success');
//         res.status(200).end();
//     });
// });

var PORT = process.env.PORT || 3000;
app.listen(PORT);