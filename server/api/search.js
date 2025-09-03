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

    // Search bisa di-cache 300 detik (5 menit)
    cache.set(cacheKey, data, 300);

    if (!data) {
      return res.status(502).json({
        error: 'Gagal mengambil data dari CoinGecko',
        details: 'Response kosong atau invalid',
      });
    }

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
