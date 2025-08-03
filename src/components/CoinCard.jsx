import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

const CoinCard = ({ coin }) => {
  const navigate = useNavigate();
  // Mengambil fungsi dan state dari context Settings
  const { formatPrice, formatNumber, getCurrentCurrency, darkMode } = useSettings();

  // Fungsi untuk navigasi ke halaman detail coin saat card diklik
  const handleCoinClick = () => {
    navigate(`/crypto/${coin.id}`);
  };

  return (
    <div
      onClick={handleCoinClick}
      // Styling card dengan efek hover dan dark mode
      className={`backdrop-blur-sm border rounded-xl p-4 transition-all duration-200 cursor-pointer group transform hover:-translate-y-1 ${
        darkMode
          ? 'border-white/20 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/10 hover:bg-white/5'
          : 'border-gray-200 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/10 hover:bg-white/50 bg-white/30'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {/* Menampilkan gambar coin */}
          {coin.image && <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3 rounded-full" />}
          <div>
            {/* Nama dan simbol coin */}
            <h2 className={`text-lg font-semibold group-hover:text-emerald-400 transition-colors duration-200 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{coin.name}</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{coin.symbol?.toUpperCase()}</p>
          </div>
        </div>

        {/* Badge untuk menampilkan ranking coin */}
        <div className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>#{coin.market_cap_rank || 'N/A'}</div>
      </div>

      {/* Informasi harga, market cap, dan volume */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Harga Saat Ini:</span>
          {/* Menampilkan harga coin saat ini */}
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(coin.current_price)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Kapitalisasi Pasar:</span>
          {/* Menampilkan market cap coin */}
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {getCurrentCurrency().symbol}
            {formatNumber(coin.market_cap)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Volume 24 Jam:</span>
          {/* Menampilkan volume transaksi 24 jam terakhir */}
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {getCurrentCurrency().symbol}
            {formatNumber(coin.total_volume)}
          </span>
        </div>
      </div>

      {/* Menampilkan perubahan harga 24 jam terakhir */}
      {coin.price_change_percentage_24h !== null && (
        <div className="flex justify-between items-center mb-3">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perubahan 24 Jam:</span>
          <span className={`font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {coin.price_change_percentage_24h > 0 ? '+' : ''}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      )}

      {/* Tombol aksi untuk melihat detail coin */}
      <div className={`pt-3 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`group-hover:text-emerald-400 transition-colors duration-200 text-sm font-medium text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Klik untuk lihat detail →</div>
      </div>
    </div>
  );
};

export default CoinCard;
