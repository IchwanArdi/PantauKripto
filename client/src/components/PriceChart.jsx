import { BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSettings } from '../contexts/SettingsContext';
import { memo } from 'react';

const PriceChart = memo(({ chartData, chartLoading, timeframe, onTimeframeChange }) => {
  const { getCurrentCurrency, darkMode, formatNumberLocal } = useSettings();

  // Opsi rentang waktu chart
  const timeframeOptions = [
    { label: '24J', value: '1' },
    { label: '7H', value: '7' },
    { label: '30H', value: '30' },
    { label: '90H', value: '90' },
    { label: '1T', value: '365' },
  ];

  // Use centralized formatNumberLocal from SettingsContext

  // Tooltip kustom untuk chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`backdrop-blur-sm border rounded-lg p-3 shadow-lg ${darkMode ? 'bg-gray-800/90 border-white/20' : 'bg-white/90 border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{`Tanggal: ${label}`}</p>
          <p className="text-emerald-400 font-semibold">{`Harga: ${getCurrentCurrency().symbol}${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // Menghitung statistik chart: high, low, perubahan harga, volatilitas
  const getChartStats = () => {
    if (chartData.length === 0) return null;

    const prices = chartData.map((d) => d.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const priceChange = chartData[chartData.length - 1]?.price - chartData[0]?.price;
    const volatility = ((high - low) / low) * 100;

    return { high, low, priceChange, volatility };
  };

  const stats = getChartStats();

  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-6 mb-8 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/30 border-gray-200'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <BarChart3 className="w-6 h-6 text-emerald-400 mr-2" />
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Grafik Harga</h3>
        </div>

        {/* Tombol pemilih rentang waktu */}
        <div className="flex space-x-2">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimeframeChange(option.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeframe === option.value ? 'bg-emerald-500 text-white' : darkMode ? 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Container chart utama */}
      <div className="h-80 w-full">
        {chartLoading ? (
          // Loading spinner saat data chart sedang dimuat
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
          </div>
        ) : chartData.length > 0 ? (
          // Chart harga
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} opacity={0.3} />
              <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${getCurrentCurrency().symbol}${formatNumberLocal(value)}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} fill="url(#colorPrice)" dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          // Pesan jika data chart tidak tersedia
          <div className={`flex items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Data grafik tidak tersedia</p>
          </div>
        )}
      </div>

      {/* Statistik chart */}
      {stats && (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="text-center">
            <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tertinggi Periode</div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getCurrentCurrency().symbol}
              {stats.high.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Terendah Periode</div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getCurrentCurrency().symbol}
              {stats.low.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perubahan Harga</div>
            <div className={`font-semibold ${stats.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {getCurrentCurrency().symbol}
              {stats.priceChange.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Volatilitas</div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.volatility.toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
});

PriceChart.displayName = 'PriceChart';

export default PriceChart;
