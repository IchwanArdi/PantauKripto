// src/components/MarketStats.jsx
import { useSettings } from '../contexts/SettingsContext';

const MarketStats = ({ marketData, cryptoData }) => {
  // Mengambil fungsi dan state dari context Settings
  const { getCurrentCurrency, darkMode } = useSettings();

  // Fungsi untuk memformat angka besar menjadi format lokal (K, M, B, T)
  const formatNumberLocal = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num?.toLocaleString() || 'N/A';
  };

  // Mendapatkan data mata uang yang sedang dipilih user
  const currentCurrency = getCurrentCurrency();
  // Mengambil nilai market cap dan volume berdasarkan currency yang dipilih
  const marketCap = marketData?.market_cap?.[currentCurrency.apiCode];
  const totalVolume = marketData?.total_volume?.[currentCurrency.apiCode];

  // Array untuk menampung data statistik yang akan ditampilkan
  const stats = [
    {
      label: 'Kapitalisasi Pasar',
      value: `${currentCurrency.symbol}${formatNumberLocal(marketCap)}`,
      subtitle: `Rank #${cryptoData.market_cap_rank}`,
    },
    {
      label: 'Volume 24 Jam',
      value: `${currentCurrency.symbol}${formatNumberLocal(totalVolume)}`,
      subtitle: null,
    },
    {
      label: 'Sirkulasi Supply',
      value: formatNumberLocal(marketData.circulating_supply),
      subtitle: cryptoData.symbol?.toUpperCase(),
    },
    {
      label: 'Maksimal Supply',
      value: marketData.max_supply ? formatNumberLocal(marketData.max_supply) : '∞',
      subtitle: cryptoData.symbol?.toUpperCase(),
    },
  ];

  // Render statistik dalam bentuk grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        // Setiap statistik ditampilkan dalam card dengan style berbeda tergantung darkMode
        <div key={index} className={`backdrop-blur-sm border rounded-xl p-4 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/30 border-gray-200'}`}>
          <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
          <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
          {stat.subtitle && <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{stat.subtitle}</div>}
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
