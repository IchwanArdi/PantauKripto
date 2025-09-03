import { useState, useEffect, useCallback } from 'react';
import { cryptoService } from '../services/cryptoService';
import { useSettings } from '../contexts/SettingsContext';
import { useDebounce } from '../hooks/useDebounce';

export const useCryptoData = () => {
  const { getCurrentCurrency } = useSettings();
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 600); // tunggu 600ms

  // Ambil data awal
  const fetchInitialCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currencyCode = getCurrentCurrency().apiCode;
      const data = await cryptoService.fetchTopCoins(currencyCode, 6);
      setCryptoCoins(data);
    } catch (err) {
      console.error('Terjadi kesalahan saat mengambil data kripto:', err);
      setError('Gagal mengambil data kripto');
      setCryptoCoins([]);
    } finally {
      setLoading(false);
    }
  }, [getCurrentCurrency]);

  // Pencarian dengan debounce
  const searchCoins = async (query) => {
    setSearchQuery(query); // simpan input user
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      fetchInitialCoins();
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const currencyCode = getCurrentCurrency().apiCode;
        const data = await cryptoService.searchCoinsWithMarketData(debouncedQuery, currencyCode, 6);
        setCryptoCoins(data);
      } catch (err) {
        console.error('Terjadi kesalahan saat mencari data kripto:', err);
        setError('Gagal mencari data kripto');
        setCryptoCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [debouncedQuery, getCurrentCurrency, fetchInitialCoins]);

  return {
    cryptoCoins,
    loading,
    error,
    fetchInitialCoins,
    searchCoins,
  };
};
