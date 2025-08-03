# 🚀 Pantau Kripto

Aplikasi web untuk memantau harga cryptocurrency secara real-time. Dibuat dengan React dan menggunakan API dari CoinGecko.

## ✨ Fitur

- 🔄 **Pantau Harga Real-time** – Lihat harga cryptocurrency terbaru yang diperbarui secara berkala  
- 🔍 **Pencarian** – Cari cryptocurrency dengan mudah menggunakan search bar  
- 💱 **Mata Uang** – Dukung tampilan harga dalam USD dan IDR  
- 📈 **Grafik Harga** – Chart interaktif dengan berbagai pilihan timeframe  
- 🌗 **Dark/Light Mode** – Ubah tema sesuai preferensi pengguna  
- 📱 **Responsive Design** – Tampil optimal di desktop maupun mobile

## 🧰 Tech Stack

- React 18 + Vite  
- Tailwind CSS  
- React Router DOM  
- Recharts  
- CoinGecko API

## 🗂️ Struktur Project

src/
├── components/ # Komponen UI terpisah
├── contexts/ # React Context (misalnya untuk tema dan pengaturan)
├── hooks/ # Custom React hooks
├── pages/ # Halaman utama seperti Home dan Detail
├── services/ # API Service (pengambilan data dari CoinGecko)
└── App.jsx # Root component

bash
Salin
Edit

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/IchwanArdi/PantauKripto.git
cd PantauKripto
2. Install Dependencies
bash
Salin
Edit
npm install
3. Jalankan Development Server
bash
Salin
Edit
npm run dev
Akses di browser: http://localhost:5173

4. Build untuk Production
bash
Salin
Edit
npm run build
🧩 Komponen Utama
🏠 Home Page
Menampilkan daftar top 6 cryptocurrency

Search bar dengan fitur debouncing

Ringkasan market (global data)

📊 Detail Page
Informasi lengkap cryptocurrency (harga, rank, volume, market cap, dll)

Grafik harga interaktif

Statistik lengkap pasar

🤝 Kontribusi
Fork repository ini

Buat branch baru

bash
Salin
Edit
git checkout -b feature/fitur-baru
Commit perubahan

bash
Salin
Edit
git commit -m "Tambah fitur baru"
Push ke branch tersebut

bash
Salin
Edit
git push origin feature/fitur-baru
Buat Pull Request ke repo utama

🪪 License
Distributed under the MIT License.
