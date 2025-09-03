// Menggunakan server lokal sebagai proxy ke CoinGecko API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const cryptoService = {
  // Mengambil data cryptocurrency teratas berdasarkan market cap
  async fetchTopCoins(currencyCode, limit = 6) {
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=${currencyCode}&per_page=${limit}&page=1`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Terjadi kesalahan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mencari cryptocurrency berdasarkan query
  async searchCoins(query) {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Terjadi kesalahan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mengambil data market untuk coin tertentu berdasarkan ID
  async fetchCoinsByIds(coinIds, currencyCode, limit = 6) {
    // Karena server kita tidak punya endpoint khusus untuk fetch by IDs,
    // kita akan mengambil semua data dan filter di client
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=${currencyCode}&per_page=250&page=1`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Terjadi kesalahan! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter berdasarkan coinIds yang diinginkan
    return data.filter((coin) => coinIds.includes(coin.id)).slice(0, limit);
  },

  // Fungsi gabungan untuk mencari coin dan mengambil data market-nya
  async searchCoinsWithMarketData(query, currencyCode, limit = 6) {
    try {
      // Pertama, cari coin berdasarkan query
      const searchData = await this.searchCoins(query);

      // Ambil ID coin dari hasil pencarian
      const coinIds = searchData.coins?.slice(0, limit).map((coin) => coin.id) || [];

      if (coinIds.length > 0) {
        // Jika ada hasil, ambil data market untuk coin-coin tersebut
        return await this.fetchCoinsByIds(coinIds, currencyCode, limit);
      }

      return [];
    } catch (error) {
      // Menangani error pada proses pencarian dan pengambilan data market
      console.error('Terjadi kesalahan pada searchCoinsWithMarketData:', error);
      throw error;
    }
  },
};
