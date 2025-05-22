const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app'); // Import the app (middleware and routes)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to the database
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

// Start the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle uncaught exceptions and promise rejections globally
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.stack, err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log('Error name:', error.name);
  console.log('Error message:', error.message);
  process.exit(1);
});