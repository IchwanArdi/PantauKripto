const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');

// Import routes
const coinRoutes = require('./api/coins');
const searchRoutes = require('./api/search');
const healthRoutes = require('./api/health');

const app = express();

// =====================
// 🛡️ Security & Performance Middleware
// =====================
// Add security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

// Add compression middleware
app.use(compression());

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
// 🏥 Health check routes
// =====================
app.use('/api', healthRoutes);

// Trust first proxy (Vercel)
app.set('trust proxy', 1);

// =====================
// ⚡ Rate limiting
// =====================
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  skip: (req) => req.path.includes('/health') || req.path.includes('/ping'),
  handler: (req, res) => {
    res.status(429).json({ error: 'Terlalu banyak request, coba lagi dalam 1 menit' });
  },
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  handler: (req, res) => {
    res.status(429).json({ error: 'Terlalu banyak pencarian, coba lagi nanti' });
  },
});

app.use('/api/coins', globalLimiter);
app.use('/api/search', searchLimiter);

// =====================
// 📌 Main Routes
// =====================
app.use('/api/coins', coinRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'PantauKripto API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// =====================
// ⚠ Error handling
// =====================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ✅ Export untuk Vercel (jangan pakai app.listen)
module.exports = app;
