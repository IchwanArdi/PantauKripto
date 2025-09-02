import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useCryptoDetail } from '../hooks/useCryptoDetail';
import { LoadingState, ErrorState } from '../components/LoadingErrorStates';
import CryptoInfoCard from '../components/CryptoInfoCard';
import PriceChart from '../components/PriceChart';
import MarketStats from '../components/MarketStats';

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useSettings();

  // Ambil data detail kripto, data chart, status loading, error, timeframe, dsb
  const { cryptoData, chartData, loading, error, timeframe, chartLoading, handleTimeframeChange, getMarketData } = useCryptoDetail(id);

  // Tampilkan loading state jika data masih dimuat
  if (loading) {
    return <LoadingState />;
  }

  // Tampilkan error state jika terjadi error atau data tidak ada
  if (error || !cryptoData) {
    return <ErrorState error={error} />;
  }

  // Ambil data harga pasar saat ini dan perubahan harga
  const { currentPrice, priceChange24h, priceChange7d, priceChange30d } = getMarketData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Tombol kembali ke halaman utama */}
        <button onClick={() => navigate('/')} className={`flex items-center transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Beranda
        </button>
      </div>

      {/* Kartu informasi utama kripto */}
      <CryptoInfoCard cryptoData={cryptoData} currentPrice={currentPrice} priceChange24h={priceChange24h} priceChange7d={priceChange7d} priceChange30d={priceChange30d} />

      {/* Grafik harga kripto */}
      <PriceChart chartData={chartData} chartLoading={chartLoading} timeframe={timeframe} onTimeframeChange={handleTimeframeChange} />

      {/* Statistik pasar kripto */}
      <MarketStats marketData={cryptoData.market_data} cryptoData={cryptoData} />
    </div>
  );
};

export default CryptoDetail;
