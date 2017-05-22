var jwt = require('jsonwebtoken');

var token = jwt.sign({
    id: 'abcdese',
    scopes: ['a', 'b', 'c']
  },
  // Jwt Secret
  undefined,
  // Options
  { 
    issuer: '123456',
    expiresIn: '7d'
  },
  function(err, token) {
    console.log(token);
    // done(err, JSON.stringify(token));
  });