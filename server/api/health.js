// routes/health.js
const express = require('express');
const router = express.Router();
const { healthCheck } = require('../utils/coingecko');
const cache = require('../utils/cache');

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const startTime = Date.now();

    // Test database/cache
    cache.set('health_test', 'ok', 10);
    const cacheTest = cache.get('health_test');

    // Test CoinGecko connection
    const coinGeckoHealth = await healthCheck();

    const responseTime = Date.now() - startTime;

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      cache: cacheTest === 'ok' ? 'ok' : 'error',
      coingecko: coinGeckoHealth.status,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
      },
    };

    // Jika CoinGecko error, return 503
    if (coinGeckoHealth.status === 'error') {
      healthStatus.status = 'degraded';
      healthStatus.coingeckoError = coinGeckoHealth.error;
      return res.status(503).json(healthStatus);
    }

    res.json(healthStatus);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Simple ping endpoint
router.get('/ping', (req, res) => {
  res.json({
    status: 'pong',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
