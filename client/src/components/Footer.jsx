import { Heart } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useSettings();

  return (
    <footer className={`backdrop-blur-sm mt-20 border-t ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10'}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className={`text-sm flex items-center ${darkMode ? 'text-gray-400' : 'text-black'}`}>
            <span>© {currentYear} PantauKripto. Dibuat dengan</span>
            <Heart className="w-4 h-4 text-red-400 mx-1" />
            <span>oleh Ichwan</span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Powered by <span className="text-emerald-400">CoinGecko API</span>
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Live Data</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <strong>Disclaimer:</strong> Informasi yang disediakan bukan merupakan saran investasi. Cryptocurrency adalah investasi berisiko tinggi. Selalu lakukan riset Anda sendiri sebelum berinvestasi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
