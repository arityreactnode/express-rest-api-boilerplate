const mongoose = require('mongoose');
const config = require('../config/config');

const connectToDatabase = async () => {
  try {
    // Use the MongoDB connection string from your configuration
    const connectionString = config.mongoURI;
    // Connect to the MongoDB database
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToDatabase;
