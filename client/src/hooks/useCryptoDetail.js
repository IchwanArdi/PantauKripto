import { useState, useEffect, useCallback } from 'react';
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Fungsi untuk mengambil data awal (detail koin + data chart)
  const fetchInitialData = useCallback(async () => {
    if (!coinId) return;

    setLoading(true);
    setError(null);

    try {
      const currencyCode = getCurrentCurrency().apiCode;
      console.log(`🚀 Fetching initial data for ${coinId} in ${currencyCode}`);

      const data = await cryptoDetailService.fetchInitialData(coinId, currencyCode, timeframe);

      // Set data bahkan jika ada yang gagal
      if (data.cryptoData) {
        setCryptoData(data.cryptoData);
        console.log('✅ Crypto detail loaded successfully');
      }

      if (data.chartData && data.chartData.length > 0) {
        setChartData(data.chartData);
        setPriceHistory(data.priceHistory);
        console.log('✅ Chart data loaded successfully');
      }

      // Reset retry count on success
      setRetryCount(0);

      // Show warnings for partial failures
      if (data.hasDetailError && data.hasChartError) {
        setError('Semua data gagal dimuat. Server mungkin sedang bermasalah.');
      } else if (data.hasDetailError) {
        setError('Detail crypto gagal dimuat, hanya chart yang tersedia.');
      } else if (data.hasChartError) {
        setError('Chart gagal dimuat, hanya detail crypto yang tersedia.');
      }
    } catch (error) {
      console.error('❌ Error fetching crypto detail:', error);

      const errorMessage = error.message || 'Gagal memuat detail kripto';
      setError(errorMessage);

      // Jika masih bisa retry dan bukan error client
      if (retryCount < maxRetries && !errorMessage.includes('400') && !errorMessage.includes('404')) {
        console.log(`🔄 Will retry in 3 seconds... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  }, [coinId, getCurrentCurrency, timeframe, retryCount, maxRetries]);

  // Auto retry effect
  useEffect(() => {
    if (retryCount > 0 && retryCount <= maxRetries) {
      console.log(`🔄 Retrying fetch... attempt ${retryCount}/${maxRetries}`);
      fetchInitialData();
    }
  }, [retryCount, fetchInitialData]);

  // Fungsi untuk mengambil data chart berdasarkan timeframe tertentu
  const fetchChartData = useCallback(
    async (days) => {
      if (!coinId) return;

      setChartLoading(true);

      try {
        const currencyCode = getCurrentCurrency().apiCode;
        console.log(`📊 Fetching chart data for ${days} days`);

        const data = await cryptoDetailService.fetchPriceHistory(coinId, currencyCode, days);
        const formattedData = cryptoDetailService.formatChartData(data, days);

        setChartData(formattedData);
        console.log('✅ Chart data updated successfully');
      } catch (error) {
        console.error('❌ Error fetching chart data:', error);
        // Untuk chart error, kita tidak set error state karena detail masih bisa ditampilkan

        // Set empty chart data dengan pesan
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    },
    [coinId, getCurrentCurrency]
  );

  // Fungsi untuk mengubah timeframe chart
  const handleTimeframeChange = (days) => {
    setTimeframe(days);
    fetchChartData(days);
  };

  // Manual retry function
  const retryFetch = useCallback(() => {
    setRetryCount(0);
    setError(null);
    fetchInitialData();
  }, [fetchInitialData]);

  // useEffect untuk mengambil data awal saat komponen mount atau dependency berubah
  useEffect(() => {
    fetchInitialData();
  }, [coinId, getCurrentCurrency]);

  // Fungsi untuk mengambil data pasar (market data) dari cryptoData
  const getMarketData = useCallback(() => {
    if (!cryptoData?.market_data) {
      return {
        currentPrice: null,
        marketCap: null,
        totalVolume: null,
        priceChange24h: 0,
        priceChange7d: 0,
        priceChange30d: 0,
      };
    }

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
  }, [cryptoData, getCurrentCurrency]);

  return {
    cryptoData,
    chartData,
    priceHistory,
    loading,
    error,
    timeframe,
    chartLoading,
    retryCount,
    maxRetries,
    handleTimeframeChange,
    getMarketData,
    retryFetch, // Export retry function untuk UI
  };
};
