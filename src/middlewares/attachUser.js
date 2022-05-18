const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth.split(' ').length < 2) {
    throw new Error('Invalid authorization token');
  } else if (auth.split(' ')[0] === 'Bearer') {
    throw new Error('Only bearer token is supported');
  }

  const token = auth.split(' ')[1];

  jwt.verify(token, config.jwt_secret, (err, user) => {
    if (err) {
      res.sendStatus(403);
      res.json({
        result: false,
        message: 'Invalid JWT Token',
      });
      return;
    }

    req.user = user;
    next();
  });
}
