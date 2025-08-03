import { Settings, Moon, Sun, TrendingUp, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext.jsx';

function Navbar() {
  const navigate = useNavigate();

  // State untuk membuka/tutup dropdown settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mengambil state dan fungsi dari context Settings
  const { darkMode, setDarkMode, currency, setCurrency, currencies } = useSettings();

  // Menutup dropdown jika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fungsi untuk toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fungsi untuk mengganti currency dan menutup dropdown
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setSettingsOpen(false); // Tutup dropdown setelah memilih
  };

  // Fungsi untuk navigasi ke halaman utama saat logo diklik
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    // Navbar utama, sticky di atas
    <nav className={` ${darkMode ? 'bg-black/20' : 'bg-white/20 shadow-md'} backdrop-blur-lg border-b border-white/10 sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo dan Brand, klik untuk ke halaman utama */}
          <div onClick={handleLogoClick} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <TrendingUp className={`${darkMode ? 'text-emerald-400' : 'text-black'} w-8 h-8 mr-2`} />
            <div className="flex items-center">
              <span className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-lg`}>PantauKripto</span>
              <span className={`${darkMode ? 'text-emerald-400 border-white/20 ' : 'text-black border-black'} font-semibold border rounded px-2 py-1 ml-2 text-xs`}>DEMO</span>
            </div>
          </div>

          {/* Dropdown Settings */}
          <div className="relative" ref={dropdownRef}>
            {/* Tombol untuk membuka dropdown settings */}
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`{${darkMode ? 'bg-gray-800 text-white' : 'bg-white/10 text-black'} hover:bg-white/20} focus:outline-none focus:text-emerald-400 group transition-colors duration-200 p-2 rounded-lg`}
              aria-label="Toggle Settings"
            >
              <Settings className={`w-5 h-5 transition-transform duration-200  ${settingsOpen ? 'rotate-45' : 'group-hover:rotate-45'}`} />
            </button>

            {/* Menu Dropdown Settings */}
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                {/* Header Dropdown */}
                <div className="px-4 py-3 border-b border-white/10">
                  <h3 className="text-white font-semibold text-sm">Settings</h3>
                </div>

                {/* Pilihan Currency */}
                <div className="p-4 border-b border-white/10">
                  <label className="block text-gray-300 text-sm font-medium mb-3">Currency</label>
                  <div className="space-y-1">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => handleCurrencyChange(curr.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          currency === curr.code ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{curr.symbol}</span>
                          <span>{curr.code}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 mr-2">{curr.name}</span>
                          {currency === curr.code && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Tema (Dark/Light Mode) */}
                <div className="p-4">
                  <label className="block text-gray-300 text-sm font-medium mb-3">Theme</label>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      {darkMode ? (
                        <>
                          <Moon className="w-4 h-4 mr-2" />
                          <span>Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <Sun className="w-4 h-4 mr-2" />
                          <span>Light Mode</span>
                        </>
                      )}
                    </div>
                    {/* Switch visual untuk dark/light mode */}
                    <div className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${darkMode ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${darkMode ? 'transform translate-x-5' : 'translate-x-1'}`} />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
