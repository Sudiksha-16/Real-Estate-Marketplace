const jwt = require('jsonwebtoken');

function au(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return res.status(401).send('No token, authorization failed');

  try {
    // Verify token
    const decoded = jwt.verify(token, 'yourSecretKey');
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(400).send('Token is not valid');
  }
}

module.exports = au;
