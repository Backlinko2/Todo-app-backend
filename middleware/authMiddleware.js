const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ error: 'Token missing' });

try {
  const decoded = jwt.verify(token, jwtSecret);
  req.user = decoded;
  next();
} catch (err) {
  return res.status(403).json({ error: 'Invalid token' });
}

};

module.exports = authMiddleware;
