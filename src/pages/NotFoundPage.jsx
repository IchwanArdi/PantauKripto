import { useSettings } from '../contexts/SettingsContext';

export default function NotFoundPage() {
  const { darkMode } = useSettings();

  return (
    <div className={`not-found text-center flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}>
      <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>404 - Halaman Tidak Ditemukan</h1>
      <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Maaf, halaman yang kamu cari tidak tersedia.</p>
    </div>
  );
}
