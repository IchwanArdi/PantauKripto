const BASE_URL = 'https://api.coingecko.com/api/v3';

export const cryptoService = {
  // Mengambil data cryptocurrency teratas berdasarkan market cap
  async fetchTopCoins(currencyCode, limit = 6) {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currencyCode}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);

    if (!response.ok) {
      // Jika terjadi error pada saat fetch data
      throw new Error(`Terjadi kesalahan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mencari cryptocurrency berdasarkan query
  async searchCoins(query) {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      // Jika terjadi error pada saat pencarian data
      throw new Error(`Terjadi kesalahan! status: ${response.status}`);
    }

    return await response.json();
  },

  // Mengambil data market untuk coin tertentu berdasarkan ID
  async fetchCoinsByIds(coinIds, currencyCode, limit = 6) {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currencyCode}&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);

    if (!response.ok) {
      // Jika terjadi error pada saat fetch data berdasarkan ID
      throw new Error(`Terjadi kesalahan! status: ${response.status}`);
    }

    return await response.json();
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
