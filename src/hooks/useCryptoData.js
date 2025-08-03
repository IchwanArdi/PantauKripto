// src/hooks/useCryptoData.js
import { useState } from 'react';
import { cryptoService } from '../services/cryptoService';
import { useSettings } from '../contexts/SettingsContext';

// Custom hook untuk mengambil data kripto dan melakukan pencarian
export const useCryptoData = () => {
  const { getCurrentCurrency } = useSettings();
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data koin kripto awal (top 6)
  const fetchInitialCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const currencyCode = getCurrentCurrency().apiCode;
      const data = await cryptoService.fetchTopCoins(currencyCode, 6);
      setCryptoCoins(data);
    } catch (err) {
      // Menangani jika terjadi kesalahan saat fetch data
      console.error('Terjadi kesalahan saat mengambil data kripto:', err);
      setError('Gagal mengambil data kripto');
      setCryptoCoins([]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mencari koin kripto berdasarkan query
  const searchCoins = async (query) => {
    if (!query.trim()) {
      await fetchInitialCoins();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const currencyCode = getCurrentCurrency().apiCode;
      const data = await cryptoService.searchCoinsWithMarketData(query, currencyCode, 6);
      setCryptoCoins(data);
    } catch (err) {
      // Menangani jika terjadi kesalahan saat pencarian data
      console.error('Terjadi kesalahan saat mencari data kripto:', err);
      setError('Gagal mencari data kripto');
      setCryptoCoins([]);
    } finally {
      setLoading(false);
    }
  };

  // Mengembalikan state dan fungsi yang bisa digunakan komponen lain
  return {
    cryptoCoins,
    loading,
    error,
    fetchInitialCoins,
    searchCoins,
  };
};
