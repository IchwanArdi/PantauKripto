Pantau Kripto
Aplikasi web untuk memantau harga cryptocurrency secara real-time. Dibuat dengan React dan menggunakan API CoinGecko.
Fitur

Pantau Crypto Real-time - Lihat harga cryptocurrency terbaru
Pencarian - Cari cryptocurrency dengan mudah
Mata Uang - Dukungan USD, IDR
Grafik Harga - Chart interaktif dengan berbagai timeframe
Dark/Light Mode - Pilih tema sesuai preferensi
Responsive - Tampil optimal di desktop dan mobile

Tech Stack

React 18 + Vite
Tailwind CSS
React Router DOM
Recharts
CoinGecko API

Struktur Project
src/
├── components/ # Komponen UI
├── contexts/ # React Context
├── hooks/ # Custom hooks
├── pages/ # Halaman utama
├── services/ # API services
└── App.jsx
Instalasi

Clone repository

bashgit clone [https://github.com/username/crypto-tracker.git](https://github.com/IchwanArdi/PantauKripto.git)
cd PantauKripto

Install dependencies

bashnpm install

Jalankan development server

bashnpm run dev

Buka browser di http://localhost:5173

Build Production
bashnpm run build
Komponen Utama
Home Page

Daftar top 6 cryptocurrency
Search bar dengan debouncing
Market summary

Detail Page

Info lengkap cryptocurrency
Chart harga interaktif
Statistik market

Kontribusi

Fork repository
Buat branch baru (git checkout -b feature/fitur-baru)
Commit perubahan (git commit -m 'Tambah fitur baru')
Push ke branch (git push origin feature/fitur-baru)
Buat Pull Request

License
MIT License
