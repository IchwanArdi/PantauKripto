// src/components/CryptoInfoCard.jsx
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

// Komponen kartu informasi kripto utama
const CryptoInfoCard = ({ cryptoData, currentPrice, priceChange24h, priceChange7d, priceChange30d }) => {
  const { formatPrice, darkMode } = useSettings();

  // Fungsi untuk memformat persentase perubahan harga
  const formatPercentage = (percentage) => {
    if (!percentage) return 'N/A';
    const formatted = percentage.toFixed(2);
    return `${percentage > 0 ? '+' : ''}${formatted}%`;
  };

  return (
    // Kartu utama dengan efek blur dan border
    <div className={`backdrop-blur-sm border rounded-2xl p-6 mb-8 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/30 border-gray-200'}`}>
      {/* Bagian atas: logo, nama, simbol, dan peringkat */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Logo kripto */}
          <img src={cryptoData.image?.large} alt={cryptoData.name} className="w-16 h-16 mr-4 rounded-full" />
          <div>
            {/* Nama kripto */}
            <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cryptoData.name}</h1>
            <div className="flex items-center space-x-2">
              {/* Simbol kripto */}
              <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cryptoData.symbol?.toUpperCase()}</span>
              {/* Peringkat pasar */}
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Peringkat #{cryptoData.market_cap_rank}</span>
            </div>
          </div>
        </div>

        {/* Harga saat ini dan perubahan 24 jam */}
        <div className="text-right">
          <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(currentPrice) || 'N/A'}</div>
          <div className={`flex items-center text-lg ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {/* Ikon naik/turun */}
            {priceChange24h >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
            {formatPercentage(priceChange24h)} (24 jam)
          </div>
        </div>
      </div>

      {/* Perubahan harga dalam 24 jam, 7 hari, dan 30 hari */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perubahan 24 jam</div>
          <div className={`font-semibold ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(priceChange24h)}</div>
        </div>
        <div className="text-center">
          <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perubahan 7 hari</div>
          <div className={`font-semibold ${priceChange7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(priceChange7d)}</div>
        </div>
        <div className="text-center">
          <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perubahan 30 hari</div>
          <div className={`font-semibold ${priceChange30d >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(priceChange30d)}</div>
        </div>
      </div>

      {/* Deskripsi kripto */}
      {cryptoData.description?.en && (
        <div className={`border-t pt-6 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tentang {cryptoData.name}</h3>
          <p className={`text-sm leading-relaxed line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cryptoData.description.en.replace(/<[^>]*>/g, '').substring(0, 300)}...</p>
        </div>
      )}
    </div>
  );
};

export default CryptoInfoCard;
