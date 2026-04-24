const jwt = require('jsonwebtoken');

const protectUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Differentiates from req.admin
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized. Token is invalid or expired.' });
  }
};

module.exports = { protectUser };
