const express = require('express');
const router = express.Router();
const cache = require('../utils/cache');
const { COINGECKO_BASE, fetchWithRetry } = require('../utils/coingecko');

// Endpoint untuk search coins
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    const cacheKey = `search_${query}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const url = `${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`;
    const data = await fetchWithRetry(url);

    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Error searching coins:', error);
    res.status(500).json({
      error: 'Gagal mencari cryptocurrency',
      details: error.message,
    });
  }
});

module.exports = router;
