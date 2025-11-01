const express = require('express');
const cors = require('cors');
const { sequelize } = require('../models'); // Import sequelize
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Mengizinkan request dari domain lain (frontend)
app.use(express.json()); // Mem-parsing body request JSON

// Routes
app.use('/api', taskRoutes); // Semua rute task akan diawali /api

// Health Check Endpoint (Opsional tapi bagus)
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Centralized Error Handler
app.use(errorHandler);

// Start server dan koneksi DB
// ...
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // <-- TAMBAHKAN BARIS INI (Artinya: "Crash!")
  }
});