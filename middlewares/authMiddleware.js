const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorizeRole = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user.role)
    console.log(role)
    if (user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { protect, authorizeRole };

