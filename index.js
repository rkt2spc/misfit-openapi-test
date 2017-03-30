var morgan = require('morgan');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).end("OK"));
app.get('/login', (req, res) => res.redirect('https://api.misfitwearables.com/auth/dialog/authorize?response_type=code&client_id=uDHmdBZVZakB8jL2&redirect_uri=https://test-openapi.herokuapp.com/oauth&scope=public,birthday,email'));
app.get('/oauth', (req, res) => {
    var code = req.query.code;
    request.post(`https://api.misfitwearables.com/auth/tokens/exchange?grant_type=authorization_code&client_id=uDHmdBZVZakB8jL2&client_secret=UlKUAiI2SW9RlK1d3wTlT5ZF9mM8appW&code=${code}&redirect_uri=https://test-openapi.herokuapp.com/oauth`, 
        (err, response, body) => {
            if (err) {
                console.log(err);
                res.status(500).end(err.toString());
            }

            require('fs').writeFileSync('token.json', JSON.parse(body));
            console.log(body);
            res.status(200).end();
        });
});
app.get('/token')
app.get('/dashboard', (req, res) => {

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