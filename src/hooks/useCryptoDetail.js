import { useState, useEffect } from 'react';
import { cryptoDetailService } from '../services/cryptoDetailService';
import { useSettings } from '../contexts/SettingsContext';

export const useCryptoDetail = (coinId) => {
  const { getCurrentCurrency } = useSettings();
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('7');
  const [chartLoading, setChartLoading] = useState(false);

  // Fungsi untuk mengambil data awal (detail koin + data chart)
  const fetchInitialData = async () => {
    if (!coinId) return;

    setLoading(true);
    setError(null);
    try {
      const currencyCode = getCurrentCurrency().apiCode;
      const data = await cryptoDetailService.fetchInitialData(coinId, currencyCode, timeframe);

      setCryptoData(data.cryptoData);
      setChartData(data.chartData);
      setPriceHistory(data.priceHistory);
    } catch (error) {
      console.error('Error fetching crypto detail:', error);
      setError('Gagal memuat detail kripto');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil data chart berdasarkan timeframe tertentu
  const fetchChartData = async (days) => {
    setChartLoading(true);
    try {
      const currencyCode = getCurrentCurrency().apiCode;
      const data = await cryptoDetailService.fetchPriceHistory(coinId, currencyCode, days);
      const formattedData = cryptoDetailService.formatChartData(data, days);
      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setChartLoading(false);
    }
  };

  // Fungsi untuk mengubah timeframe chart
  const handleTimeframeChange = (days) => {
    setTimeframe(days);
    fetchChartData(days);
  };

  // useEffect untuk mengambil data awal saat komponen mount atau dependency berubah
  useEffect(() => {
    fetchInitialData();
  }, [coinId, getCurrentCurrency]);

  // Fungsi untuk mengambil data pasar (market data) dari cryptoData
  const getMarketData = () => {
    if (!cryptoData?.market_data) return {};

    const marketData = cryptoData.market_data;
    const currentCurrency = getCurrentCurrency();

    return {
      currentPrice: marketData.current_price?.[currentCurrency.apiCode],
      marketCap: marketData.market_cap?.[currentCurrency.apiCode],
      totalVolume: marketData.total_volume?.[currentCurrency.apiCode],
      priceChange24h: marketData.price_change_percentage_24h || 0,
      priceChange7d: marketData.price_change_percentage_7d || 0,
      priceChange30d: marketData.price_change_percentage_30d || 0,
    };
  };

  return {
    cryptoData,
    chartData,
    priceHistory,
    loading,
    error,
    timeframe,
    chartLoading,
    handleTimeframeChange,
    getMarketData,
  };
};
