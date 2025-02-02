const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send('No Token passed!!');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(token);
      console.log(decoded);
      return res.status(401).send('Invalid token');

    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
