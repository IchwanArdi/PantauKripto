import { createContext, useContext, useState, useEffect } from 'react';

// Membuat context untuk pengaturan aplikasi
const SettingsContext = createContext();

// Custom hook untuk menggunakan context pengaturan
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    // Ubah pesan error ke bahasa Indonesia
    throw new Error('useSettings hanya bisa digunakan di dalam SettingsProvider');
  }
  return context;
};

// Provider untuk membungkus aplikasi dengan context pengaturan
export const SettingsProvider = ({ children }) => {
  // State untuk mode gelap, ambil dari localStorage jika ada
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cryptoTracker_darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // State untuk mata uang, ambil dari localStorage jika ada
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('cryptoTracker_currency') || 'USD';
  });

  // Daftar mata uang yang didukung
  const currencies = [
    {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      apiCode: 'usd',
    },
    {
      code: 'IDR',
      symbol: 'Rp',
      name: 'Indonesian Rupiah',
      apiCode: 'idr',
    },
  ];

  // Efek untuk menerapkan mode gelap ke dokumen dan simpan ke localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cryptoTracker_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Efek untuk menyimpan mata uang ke localStorage
  useEffect(() => {
    localStorage.setItem('cryptoTracker_currency', currency);
  }, [currency]);

  // Fungsi untuk mendapatkan objek mata uang saat ini
  const getCurrentCurrency = () => {
    return currencies.find((curr) => curr.code === currency) || currencies[0];
  };

  // Fungsi untuk format harga sesuai mata uang
  const formatPrice = (price, showSymbol = true) => {
    if (!price && price !== 0) return 'N/A';

    const currencyObj = getCurrentCurrency();
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: showSymbol ? 'currency' : 'decimal',
      currency: currencyObj.code,
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);

    // Untuk IDR, hapus desimal agar tampilan lebih rapi
    if (currencyObj.code === 'IDR' && showSymbol) {
      return formattedPrice.replace(/\.\d+/, '');
    }

    return formattedPrice;
  };

  // Fungsi untuk format angka besar (misal: 1.2K, 3.4M)
  const formatNumber = (num) => {
    if (!num && num !== 0) return 'N/A';

    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';

    return num.toLocaleString();
  };

  // Nilai yang akan diberikan ke context
  const value = {
    // State
    darkMode,
    currency,
    currencies,

    // Aksi
    setDarkMode,
    setCurrency,

    // Fungsi bantu
    getCurrentCurrency,
    formatPrice,
    formatNumber,
  };

  // Membungkus children dengan provider context
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
