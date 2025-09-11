const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import routes
const coinRoutes = require('./api/coins');
const searchRoutes = require('./api/search');
const healthRoutes = require('./api/health'); // Tambahkan health check

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
// 🏥 Health check routes (tidak perlu rate limiting)
// =====================
app.use('/api', healthRoutes);

// Trust first proxy (Railway)
app.set('trust proxy', 1);

// =====================
// ⚡ Rate limiting
// =====================

// Global limiter (untuk semua /api kecuali health)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 60, // naikkan limit jadi 60 request / menit / IP
  skip: (req) => {
    // Skip rate limiting untuk health check endpoints
    return req.path.includes('/health') || req.path.includes('/ping');
  },
  handler: (req, res) => {
    console.log(`⚠️ Rate limit global tercapai dari IP: ${req.ip} untuk ${req.path}`);
    res.status(429).json({
      error: 'Terlalu banyak request, coba lagi dalam 1 menit',
      retryAfter: 60,
    });
  },
});

// Search limiter (lebih ketat)
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 20, // naikkan jadi 20 search / menit / IP
  handler: (req, res) => {
    console.log(`⚠️ Rate limit SEARCH tercapai dari IP: ${req.ip}`);
    res.status(429).json({
      error: 'Terlalu banyak pencarian, coba lagi nanti',
      retryAfter: 60,
    });
  },
});

// Apply limiter setelah health check routes
app.use('/api/coins', globalLimiter);
app.use('/api/search', searchLimiter);

// =====================
// 📌 Main Routes
// =====================
app.use('/api/coins', coinRoutes);
app.use('/api/search', searchRoutes);

// Root endpoint untuk testing
app.get('/', (req, res) => {
  res.json({
    name: 'PantauKripto API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      ping: '/api/ping',
      coins: '/api/coins/markets',
      search: '/api/search',
    },
  });
});

// =====================
// ⚠ Error handling middleware
// =====================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', {
    url: req.url,
    method: req.method,
    error: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Endpoint not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: ['GET /api/health', 'GET /api/ping', 'GET /api/coins/markets', 'GET /api/coins/:coinId', 'GET /api/coins/:coinId/market_chart', 'GET /api/search?query=...'],
  });
});

// Export untuk Vercel serverless
module.exports.default = app;
