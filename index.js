var morgan = require('morgan');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

//===========================================================
var yamlConfig = require('node-yaml-config');
var config = {
    oauth: yamlConfig.load('config/oauth.yaml'),
    oauth_thirdparty: yamlConfig.load('config/oauth_thirdparty.yaml'),
};

//===========================================================
var router = express.Router();

//===========================================================
// Ping
router.get('/', (req, res, next) => res.status(200).end("OK"));

//===========================================================
// Oauth login: Get authorization_code
router.get('/login', (req, res, next) => {
    var url = configs.oauth.dialog_url;
    url += '?response_type=code' + '&';
    url += `client_id=${configs.oauth.client_id}` + '&';
    url += 'redirect_uri=' + configs.oauth.redirect_uri + '&';
    url += 'scope=public,birthday,email';

    res.redirect(url);
});

// Oauth callback: Exchange authorization_code for token
router.get('/callback', (req, res, next) => {

    request.post({
        url: configs.oauth.exchange_url,
        body: {
            grant_type: 'authorization_code',
            client_id: configs.oauth.client_id,
            client_secret: configs.oauth.client_secret,
            redirect_uri: configs.oauth.redirect_uri,
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

//===========================================================
// Thirdparty OAuth
router.get('/login_thirdparty', (req, res, next) => {
    var url = configs.oauth_thirdparty.dialog_url;
    url += '?response_type=code' + '&';
    url += `client_id=${configs.oauth_thirdparty.client_id}` + '&';
    url += `client_secret=${configs.oauth_thirdparty.client_secret}` + '&';
    url += 'redirect_uri=' + configs.oauth_thirdparty.redirect_uri + '&';
    url += 'scope=public,birthday,email';

    res.redirect(url);    
});

router.get('/callback_thirdparty', (req, res, next) => {
    request.post({
        url: configs.oauth_thirdparty.exchange_url,
        body: {
            grant_type: 'authorization_code',
            client_id: configs.oauth_thirdparty.client_id,
            client_secret: configs.oauth_thirdparty.client_secret,
            redirect_uri: configs.oauth_thirdparty.redirect_uri,
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

//===========================================================
// Subscription API
router.post('/subscription/endpoint', (req, res, next) => {

    console.log(">>> Request Body");
    console.log(req.body);

    console.log(">>> Request Headers");
    console.log(req.headers);

    var message = req.body;
    if (typeof message === 'string') message = JSON.parse(message);
    var type = message.Type;
    console.log('>>> Message type:', type);

    if (type === 'SubscriptionConfirmation') {

        // console.log(req);

        var subscribeURL = message.SubscribeURL;
        var options = {
            url: subscribeURL,
            headers: { verify_token: message.Token }
        };

        console.log(">>> Replying to " + subscribeURL);
        request.get(options, function (err, response, body) {
            if (err) {
                return res.status(500).json(err.message);
            }

            // console.log(response.body);
            return res.status(200).json({});
        });
    }
    else {
        console.log(message);
        res.status(200).json({});
    }
});

//===========================================================
var app = express();
app.use(morgan('dev'));
// app.use(bodyParser.raw());
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
app.listen(PORT, () => console.log('Server is listening on', `http://localhost:${PORT}`));