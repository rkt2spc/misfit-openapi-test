var morgan = require('morgan');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var configs = require('./configs.json');

//===========================================================
var router = express.Router();
router.get('/', (req, res, next) => res.status(200).end("OK"));

// Oauth login: Get authorization_code
router.get('/login', (req, res, next) => {
    var url = 'https://api.misfitwearables.com/auth/dialog/authorize?';
    url += 'response_type=code' + '&';
    url += `client_id=${configs.client_id}` + '&';
    url += 'redirect_uri=https://test-openapi.herokuapp.com/callback' + '&';
    url += 'scope=public,birthday,email';

    res.redirect(url)
});

// Oauth callback: Exchange authorization_code for token
router.get('/callback', (req, res, next) => {

    request.post({
        url: 'https://api.misfitwearables.com/auth/tokens/exchange',
        body: {
            grant_type: 'authorization_code',
            client_id: configs.client_id,
            client_secret: configs.client_secret,
            redirect_uri: 'https://test-openapi.herokuapp.com/callback',
            code: req.query.code
        },
        json: true
    },
        (err, response, body) => {
            if (err) return next(err);

            console.log(body);
            res.status(200).json(body);
        });
});

// Subscription API
router.post('/subscription/endpoint', (req, res, next) => {

    console.log(req);
    var type = req.body.Type;
    console.log('>>> Message type:', type);

    if (type === 'SubscriptionConfirmation') {

        var subscribeURL = req.body.SubscribeURL;
        var options = {
            url: subscribeURL,
            headers: { verify_token: req.body.Token }
        };

        console.log(">>> Replying to " + subscribeURL);
        request.get(options, function (err, response, body) {
            if (err) {
                return res.status(500).json(err.message);
            }

            console.log(body);
            return res.status(200).json({});
        });
    }
    else {
        console.log(req.body);
        res.status(200).json({});
    }
});

//===========================================================
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).end(err.message);
});


//===========================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is listening on', PORT));