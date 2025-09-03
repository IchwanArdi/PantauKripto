const express = require('express');
const router = express.Router();
const cache = require('../utils/cache');
const { COINGECKO_BASE, fetchWithRetry } = require('../utils/coingecko');

// Endpoint untuk mendapatkan top coins
router.get('/markets', async (req, res) => {
  try {
    const { vs_currency = 'idr', per_page = 6, page = 1 } = req.query;
    const cacheKey = `markets_${vs_currency}_${per_page}_${page}`;

    // Cek cache terlebih dahulu
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const url = `${COINGECKO_BASE}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`;
    const data = await fetchWithRetry(url);

    // Simpan ke cache
    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching markets:', error);
    res.status(500).json({
      error: 'Gagal mengambil data pasar crypto',
      details: error.message,
    });
  }
});

// Endpoint untuk detail coin
router.get('/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;
    const cacheKey = `detail_${coinId}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const url = `${COINGECKO_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`;
    const data = await fetchWithRetry(url);

    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    res.status(500).json({
      error: 'Gagal mengambil detail cryptocurrency',
      details: error.message,
    });
  }
});

// Endpoint untuk market chart
router.get('/:coinId/market_chart', async (req, res) => {
  try {
    const { coinId } = req.params;
    const { vs_currency = 'idr', days = '7' } = req.query;
    const cacheKey = `chart_${coinId}_${vs_currency}_${days}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const url = `${COINGECKO_BASE}/coins/${coinId}/market_chart?vs_currency=${vs_currency}&days=${days}`;
    const data = await fetchWithRetry(url);

    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching market chart:', error);
    res.status(500).json({
      error: 'Gagal mengambil data chart',
      details: error.message,
    });
  }
});

module.exports = router;
