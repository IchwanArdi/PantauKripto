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
  const [showNotice, setShowNotice] = useState(false);

  // Ambil data koin kripto awal saat komponen pertama kali dimount atau saat currency berubah
  useEffect(() => {
    fetchInitialCoins();
  }, [currency]);

  // Handle pencarian dengan debounce - removed duplicate debouncing
  // searchCoins already handles debouncing in useCryptoData hook

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Trigger search immediately
    searchCoins(query);
  };

  // ✅ Check berdasarkan waktu - popup muncul setiap hari
  useEffect(() => {
    const lastShown = localStorage.getItem('lastNoticeShown');
    const today = new Date().toDateString();

    if (!lastShown || lastShown !== today) {
      setShowNotice(true);
    }
  }, []);

  const handleCloseNotice = () => {
    setShowNotice(false);
    // ✅ Simpan tanggal hari ini
    const today = new Date().toDateString();
    localStorage.setItem('lastNoticeShown', today);
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto relative">
      {/* 🔔 Popup Notice */}
      {showNotice && (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 `}>
          <div className={` mx-5 max-w-md w-full rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
            <h2 className="text-lg font-bold mb-2">ℹ️ Informasi</h2>
            <p className="text-sm mb-4">
              Data harga kripto pada website ini diambil secara real-time dari layanan pihak ketiga (CoinGecko). Dalam kondisi tertentu, data mungkin tidak dapat dimuat sepenuhnya akibat <span className="font-semibold">batasan API</span>{' '}
              atau kendala <span className="font-semibold">koneksi jaringan</span>.
            </p>

            <button onClick={handleCloseNotice} className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition">
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

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
