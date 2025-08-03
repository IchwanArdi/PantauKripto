// src/components/MarketSummary.jsx
import { useSettings } from '../contexts/SettingsContext';

// Komponen untuk menampilkan ringkasan pasar kripto
const MarketSummary = ({ cryptoCoins }) => {
  // Mengambil fungsi dan state dari context pengaturan
  const { formatNumber, getCurrentCurrency, darkMode } = useSettings();

  // Menghitung total market cap dari semua koin
  const totalMarketCap = cryptoCoins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  // Menghitung total volume 24 jam dari semua koin
  const totalVolume = cryptoCoins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);

  return (
    <div className={`backdrop-blur-sm border rounded-xl p-6 mb-8 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-gray-200'}`}>
      {/* Judul ringkasan */}
      <h3 className={`text-lg font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>6 Kripto Teratas berdasarkan Market Cap</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div>
          {/* Jumlah koin yang terdaftar */}
          <div className="text-emerald-400 font-bold text-xl">{cryptoCoins.length}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Koin Terdaftar</div>
        </div>
        <div>
          {/* Total market cap semua koin */}
          <div className="text-emerald-400 font-bold text-xl">
            {getCurrentCurrency().symbol}
            {formatNumber(totalMarketCap)}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Market Cap</div>
        </div>
        <div className="col-span-2 md:col-span-1">
          {/* Total volume 24 jam semua koin */}
          <div className="text-emerald-400 font-bold text-xl">
            {getCurrentCurrency().symbol}
            {formatNumber(totalVolume)}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Volume 24 Jam</div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
