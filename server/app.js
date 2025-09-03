const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import routes
const coinRoutes = require('./api/coins');
const searchRoutes = require('./api/search');
const healthRoutes = require('./api/health');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://pantaukripto.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Rate limiting untuk mencegah spam request
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 30, // maksimal 30 request per menit per IP
  message: { error: 'Terlalu banyak request, coba lagi dalam 1 menit' },
});

app.use('/api', limiter);

// Routes
app.use('/api/coins', coinRoutes);
app.use('/api/search', searchRoutes);
app.use('/', healthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
