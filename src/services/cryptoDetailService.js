// src/services/cryptoDetailService.js

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const cryptoDetailService = {
  // Mengambil data detail cryptocurrency dari CoinGecko
  async fetchCryptoDetail(coinId) {
    const response = await fetch(`${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`);

    // Cek jika respons tidak berhasil
    if (!response.ok) {
      throw new Error(`Terjadi kesalahan jaringan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mengambil data riwayat harga/chart cryptocurrency
  async fetchPriceHistory(coinId, currencyCode, days = '7') {
    const response = await fetch(`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currencyCode}&days=${days}`);

    // Cek jika respons tidak berhasil
    if (!response.ok) {
      throw new Error(`Terjadi kesalahan jaringan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Memformat data chart agar mudah ditampilkan di UI
  formatChartData(priceData, days) {
    if (!priceData || !priceData.prices) return [];

    // Mapping data harga menjadi format { date, price, timestamp }
    return priceData.prices.map(([timestamp, price]) => ({
      date: days === '1' ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(timestamp).toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
      timestamp: timestamp,
    }));
  },

  // Mengambil data awal (detail + chart) secara bersamaan
  async fetchInitialData(coinId, currencyCode, days = '7') {
    try {
      // Mengambil data detail dan chart secara paralel
      const [detailData, chartData] = await Promise.all([this.fetchCryptoDetail(coinId), this.fetchPriceHistory(coinId, currencyCode, days)]);

      const formattedChartData = this.formatChartData(chartData, days);

      return {
        cryptoData: detailData,
        chartData: formattedChartData,
        priceHistory: chartData.prices || [],
      };
    } catch (error) {
      // Menampilkan error jika terjadi masalah saat fetch data
      console.error('Terjadi kesalahan saat mengambil data awal crypto:', error);
      throw error;
    }
  },
};
