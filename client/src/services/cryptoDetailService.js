// Menggunakan server lokal sebagai proxy ke CoinGecko API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const cryptoDetailService = {
  // Mengambil data detail cryptocurrency dari server lokal
  async fetchCryptoDetail(coinId) {
    const response = await fetch(`${API_URL}/coins/${coinId}`);

    // Cek jika respons tidak berhasil
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Terjadi kesalahan jaringan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mengambil data riwayat harga/chart cryptocurrency
  async fetchPriceHistory(coinId, currencyCode, days = '7') {
    const response = await fetch(`${API_URL}/coins/${coinId}/market_chart?vs_currency=${currencyCode}&days=${days}`);

    // Cek jika respons tidak berhasil
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Terjadi kesalahan jaringan! status: ${response.status}`);
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
