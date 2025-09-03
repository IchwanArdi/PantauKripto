const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import routes
const coinRoutes = require('./api/coins');
const searchRoutes = require('./api/search');

const app = express();

// =====================
// 🛡️ CORS configuration
// =====================
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://pantaukripto.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// =====================
// ⚡ Rate limiting
// =====================

// Global limiter (untuk semua /api)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 30, // maksimal 30 request / menit / IP
  handler: (req, res) => {
    console.log(`⚠️ Rate limit global tercapai dari IP: ${req.ip}`);
    res.status(429).json({ error: 'Terlalu banyak request, coba lagi dalam 1 menit' });
  },
});

// Search limiter (lebih ketat)
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 10, // maksimal 10 search / menit / IP
  handler: (req, res) => {
    console.log(`⚠️ Rate limit SEARCH tercapai dari IP: ${req.ip}`);
    res.status(429).json({
      error: 'Terlalu banyak pencarian, coba lagi nanti',
    });
  },
});

// Apply limiter
app.use('/api', globalLimiter);
app.use('/api/search', searchLimiter);

// =====================
// 📌 Routes
// =====================
app.use('/api/coins', coinRoutes);
app.use('/api/search', searchRoutes);

// =====================
// ❌ Error handling middleware
// =====================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
