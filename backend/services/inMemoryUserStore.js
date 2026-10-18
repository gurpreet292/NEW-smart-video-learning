const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const usersById = new Map();
const usersByEmail = new Map();
const usersByUsername = new Map();

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();
const normalizeUsername = (username = '') => String(username).trim();

const toSafeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  preferences: user.preferences || { theme: 'light', language: 'en' },
  learningHistory: user.learningHistory || [],
  createdAt: user.createdAt,
  lastLogin: user.lastLogin,
});

const findById = async (userId) => {
  const user = usersById.get(String(userId));
  return user ? { ...user } : null;
};

const findByEmail = async (email) => {
  const key = normalizeEmail(email);
  const userId = usersByEmail.get(key);
  if (!userId) return null;
  const user = usersById.get(userId);
  return user ? { ...user } : null;
};

const findByUsername = async (username) => {
  const key = normalizeUsername(username);
  const userId = usersByUsername.get(key);
  if (!userId) return null;
  const user = usersById.get(userId);
  return user ? { ...user } : null;
};

const createUser = async ({ username, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedUsername = normalizeUsername(username);

  if (usersByEmail.has(normalizedEmail)) {
    const error = new Error('Email already registered');
    error.code = 'EMAIL_EXISTS';
    throw error;
  }

  if (usersByUsername.has(normalizedUsername)) {
    const error = new Error('Username already taken');
    error.code = 'USERNAME_EXISTS';
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    _id: new mongoose.Types.ObjectId().toString(),
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    learningHistory: [],
    preferences: { theme: 'light', language: 'en' },
    createdAt: new Date(),
    lastLogin: null,
  };

  usersById.set(user._id, user);
  usersByEmail.set(normalizedEmail, user._id);
  usersByUsername.set(normalizedUsername, user._id);

  return { ...user };
};

const comparePassword = async (user, candidatePassword) => {
  if (!user || !user.password) return false;
  return bcrypt.compare(candidatePassword, user.password);
};

const updateUser = async (userId, updater) => {
  const user = usersById.get(String(userId));
  if (!user) return null;

  const updatedUser = { ...user, ...updater(user) };
  usersById.set(String(userId), updatedUser);
  if (updatedUser.email) {
    usersByEmail.set(normalizeEmail(updatedUser.email), String(userId));
  }
  if (updatedUser.username) {
    usersByUsername.set(normalizeUsername(updatedUser.username), String(userId));
  }
  return { ...updatedUser };
};

const setLastLogin = async (userId) => {
  return updateUser(userId, (user) => ({
    ...user,
    lastLogin: new Date(),
  }));
};

const updatePreferences = async (userId, preferences) => {
  return updateUser(userId, (user) => ({
    ...user,
    preferences: {
      ...user.preferences,
      ...preferences,
    },
  }));
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  createUser,
  comparePassword,
  setLastLogin,
  updatePreferences,
  toSafeUser,
};
