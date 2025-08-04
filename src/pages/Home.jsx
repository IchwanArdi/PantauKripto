import { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useCryptoData } from '../hooks/useCryptoData';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import MarketSummary from '../components/MarketSummary';

const Home = () => {
  const { currency, getCurrentCurrency, darkMode } = useSettings();
  const { cryptoCoins, loading, error, fetchInitialCoins, searchCoins } = useCryptoData();
  const [searchQuery, setSearchQuery] = useState('');

  // Ambil data koin kripto awal saat komponen pertama kali dimount atau saat currency berubah
  useEffect(() => {
    fetchInitialCoins();
  }, [currency]);

  // Handle pencarian dengan debounce (menunda eksekusi searchCoins selama 500ms setelah user berhenti mengetik)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCoins(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      {/* Judul halaman */}
      <h1 className={`text-3xl md:text-5xl font-bold mb-5 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pantau Harga Kripto Secara Real-Time</h1>
      <p className={`text-center text-sm md:text-base mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pantau aset kripto favorit kamu secara real-time, lengkap dengan grafik dan data historis.</p>

      {/* Komponen pencarian */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Menampilkan mata uang yang sedang digunakan */}
      <div className="text-center mb-6">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Menampilkan harga dalam <span className="text-emerald-400 font-semibold">{getCurrentCurrency().name}</span> ({getCurrentCurrency().symbol})
        </p>
      </div>

      {/* State loading */}
      {loading && (
        <div className={`text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {/* State error */}
      {error && (
        <div className={`text-center text-red-400 mb-8 p-4 rounded-xl border border-red-500/20 ${darkMode ? 'bg-red-900/20' : 'bg-red-50/80'}`}>
          <p>{error}</p>
        </div>
      )}

      {/* State jika hasil pencarian kosong */}
      {!loading && !error && cryptoCoins.length === 0 && searchQuery && (
        <div className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>Tidak ditemukan kripto untuk "{searchQuery}"</p>
        </div>
      )}

      {/* Daftar koin kripto */}
      {!loading && !error && cryptoCoins.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cryptoCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Ringkasan pasar, hanya muncul jika tidak sedang mencari */}
      {!loading && !error && cryptoCoins.length > 0 && !searchQuery && <MarketSummary cryptoCoins={cryptoCoins} />}
    </div>
  );
};

export default Home;
