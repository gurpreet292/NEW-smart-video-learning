const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const inMemoryUserStore = require('../services/inMemoryUserStore');

const useInMemoryAuth = () => mongoose.connection.readyState !== 1;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No authentication token, access denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (useInMemoryAuth()) {
      const user = await inMemoryUserStore.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      req.user = user;
      return next();
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token is not valid'
    });
  }
};

module.exports = authMiddleware;
