/**
 * This file sets up the Express application, including middleware and routes.
 * It also includes error handling middleware to catch any unhandled errors.
 */

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authenticate');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('hey buddy');
});

// error middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    errorMessage: 'internal server error'
  });
});

module.exports = app;
