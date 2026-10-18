const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_video_learning';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 15000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}. Continuing without database connection.`);
    return false;
  }
};

module.exports = connectDB;
