import { Search } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

// Komponen SearchBar untuk menampilkan input pencarian
const SearchBar = ({ searchQuery, onSearchChange }) => {
  const { darkMode } = useSettings(); // Mengambil status dark mode dari context

  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="relative">
        {/* Icon search di sebelah kiri input */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className={`z-50 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
        {/* Input untuk pencarian */}
        <input
          type="text"
          id="searchInput"
          // Ubah placeholder ke bahasa Indonesia
          placeholder="Cari kripto (misal: Bitcoin, ETH, BTC)"
          className={`w-full pl-10 pr-4 py-3 border rounded-xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
            darkMode ? 'bg-white/10 border-white/20 placeholder-gray-400 text-white' : 'bg-white/80 border-gray-300 placeholder-gray-500 text-gray-900'
          }`}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
