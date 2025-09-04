// Menggunakan server lokal sebagai proxy ke CoinGecko API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const cryptoDetailService = {
  // Helper function untuk handle response dengan better error handling
  async handleResponse(response) {
    // Cek content-type untuk memastikan response adalah JSON
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;

      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData?.error || errorMessage;
        } else {
          // Jika response bukan JSON, ambil sebagai text
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }

      throw new Error(errorMessage);
    }

    // Pastikan response adalah JSON sebelum parsing
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server tidak mengembalikan response JSON yang valid');
    }

    try {
      return await response.json();
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      throw new Error('Response dari server tidak valid (bukan JSON)');
    }
  },

  // Mengambil data detail cryptocurrency dari server lokal
  async fetchCryptoDetail(coinId) {
    try {
      const response = await fetch(`${API_URL}/coins/${coinId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // Tambahkan timeout
        signal: AbortSignal.timeout(30000), // 30 detik timeout
      });

      return await this.handleResponse(response);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server terlalu lambat merespons');
      }
      throw error;
    }
  },

  // Mengambil data riwayat harga/chart cryptocurrency
  async fetchPriceHistory(coinId, currencyCode, days = '7') {
    try {
      const response = await fetch(`${API_URL}/coins/${coinId}/market_chart?vs_currency=${currencyCode}&days=${days}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000),
      });

      return await this.handleResponse(response);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server terlalu lambat merespons');
      }
      throw error;
    }
  },

  // Memformat data chart agar mudah ditampilkan di UI
  formatChartData(priceData, days) {
    if (!priceData || !priceData.prices || !Array.isArray(priceData.prices)) {
      console.warn('Invalid price data received:', priceData);
      return [];
    }

    // Mapping data harga menjadi format { date, price, timestamp }
    return priceData.prices.map(([timestamp, price]) => ({
      date: days === '1' ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(timestamp).toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
      timestamp: timestamp,
    }));
  },

  // Mengambil data awal (detail + chart) secara bersamaan dengan fallback
  async fetchInitialData(coinId, currencyCode, days = '7') {
    try {
      // Coba ambil keduanya secara paralel
      const [detailResult, chartResult] = await Promise.allSettled([this.fetchCryptoDetail(coinId), this.fetchPriceHistory(coinId, currencyCode, days)]);

      let cryptoData = null;
      let chartData = [];
      let priceHistory = [];

      // Handle detail data
      if (detailResult.status === 'fulfilled') {
        cryptoData = detailResult.value;
      } else {
        console.error('Failed to fetch crypto detail:', detailResult.reason);
        // Jangan throw error di sini, biarkan chart tetap dimuat jika memungkinkan
      }

      // Handle chart data
      if (chartResult.status === 'fulfilled') {
        const formattedChartData = this.formatChartData(chartResult.value, days);
        chartData = formattedChartData;
        priceHistory = chartResult.value.prices || [];
      } else {
        console.error('Failed to fetch chart data:', chartResult.reason);
      }

      // Jika kedua gagal, throw error
      if (!cryptoData && chartData.length === 0) {
        throw new Error('Gagal mengambil semua data. Periksa koneksi server.');
      }

      return {
        cryptoData,
        chartData,
        priceHistory,
        // Tambahkan info status untuk UI
        hasDetailError: detailResult.status === 'rejected',
        hasChartError: chartResult.status === 'rejected',
      };
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data awal crypto:', error);
      throw new Error(`Gagal mengambil data: ${error.message}`);
    }
  },
};
