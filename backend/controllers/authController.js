const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const inMemoryUserStore = require('../services/inMemoryUserStore');

const useInMemoryAuth = () => mongoose.connection.readyState !== 1;

class AuthController {
  /**
   * Register new user
   */
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (useInMemoryAuth()) {
        const existingUser = await inMemoryUserStore.findByEmail(email) || await inMemoryUserStore.findByUsername(username);
        if (existingUser) {
          return res.status(400).json({
            status: 'error',
            message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
          });
        }

        const user = await inMemoryUserStore.createUser({ username, email, password });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({
          status: 'success',
          message: 'User registered successfully',
          data: {
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              preferences: user.preferences,
            },
            token,
          },
        });
      }

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
        });
      }

      const user = await User.create({ username, email, password });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            preferences: user.preferences
          },
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (useInMemoryAuth()) {
        const user = await inMemoryUserStore.findByEmail(email);

        if (!user) {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
          });
        }

        const isPasswordValid = await inMemoryUserStore.comparePassword(user, password);

        if (!isPasswordValid) {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
          });
        }

        const updatedUser = await inMemoryUserStore.setLastLogin(user._id);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
          status: 'success',
          message: 'Login successful',
          data: {
            user: {
              id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
              preferences: updatedUser.preferences,
              lastLogin: updatedUser.lastLogin,
            },
            token,
          },
        });
      }

      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            preferences: user.preferences,
            lastLogin: user.lastLogin
          },
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(req, res, next) {
    try {
      if (useInMemoryAuth()) {
        const user = await inMemoryUserStore.findById(req.user._id);
        if (!user) {
          return res.status(401).json({
            status: 'error',
            message: 'User not found'
          });
        }

        return res.status(200).json({
          status: 'success',
          data: {
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              preferences: user.preferences,
              learningHistory: user.learningHistory,
              createdAt: user.createdAt,
              lastLogin: user.lastLogin,
            }
          }
        });
      }

      const user = await User.findById(req.user._id)
        .populate({
          path: 'learningHistory',
          options: { sort: { createdAt: -1 }, limit: 10 }
        });

      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            preferences: user.preferences,
            learningHistory: user.learningHistory,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user preferences
   */
  static async updatePreferences(req, res, next) {
    try {
      const { theme, language } = req.body;

      if (useInMemoryAuth()) {
        const user = await inMemoryUserStore.updatePreferences(req.user._id, {
          theme,
          language,
        });

        return res.status(200).json({
          status: 'success',
          message: 'Preferences updated successfully',
          data: {
            preferences: user.preferences
          }
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            'preferences.theme': theme,
            'preferences.language': language
          }
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: 'success',
        message: 'Preferences updated successfully',
        data: {
          preferences: user.preferences
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
