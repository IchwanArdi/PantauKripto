// src/components/LoadingErrorStates.jsx
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

// Komponen untuk menampilkan tampilan saat data sedang dimuat
export const LoadingState = () => {
  const { darkMode } = useSettings();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Animasi loading */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
        <p className="text-lg">Memuat detail kripto...</p>
      </div>
    </div>
  );
};

// Komponen untuk menampilkan pesan error jika terjadi kesalahan
export const ErrorState = ({ error }) => {
  const navigate = useNavigate();
  const { darkMode } = useSettings();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-red-400 text-lg mb-4">{error || 'Kripto tidak ditemukan'}</p>
        {/* Tombol kembali ke halaman utama */}
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors duration-200 text-white">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
