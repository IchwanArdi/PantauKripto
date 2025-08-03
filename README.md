# 🚀 Pantau Kripto

Aplikasi web untuk memantau harga cryptocurrency secara real-time. Dibuat dengan React dan menggunakan API dari CoinGecko.

---

## ✨ Fitur

- 🔄 **Pantau Harga Real-time** – Lihat harga cryptocurrency terbaru yang diperbarui secara berkala
- 🔍 **Pencarian** – Cari cryptocurrency dengan mudah menggunakan search bar
- 💱 **Mata Uang** – Dukung tampilan harga dalam USD dan IDR
- 📈 **Grafik Harga** – Chart interaktif dengan berbagai pilihan timeframe
- 🌗 **Dark/Light Mode** – Ubah tema sesuai preferensi pengguna
- 📱 **Responsive Design** – Tampil optimal di desktop maupun mobile

---

## 🧰 Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Recharts
- CoinGecko API

---

## 🗂️ Struktur Project

```
src/
├── components/     # Komponen UI terpisah
├── contexts/       # React Context (misalnya untuk tema dan pengaturan)
├── hooks/          # Custom React hooks
├── pages/          # Halaman utama seperti Home dan Detail
├── services/       # API Service (pengambilan data dari CoinGecko)
└── App.jsx         # Root component
```

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/IchwanArdi/PantauKripto.git
cd PantauKripto
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka di browser: [http://localhost:5173](http://localhost:5173)

### 4. Build untuk Production

```bash
npm run build
```

---

## 🧩 Komponen Utama

### 🏠 Home Page

- Menampilkan daftar top 6 cryptocurrency
- Search bar dengan fitur debouncing
- Ringkasan market (global market data)

### 📊 Detail Page

- Informasi lengkap cryptocurrency (harga, rank, volume, market cap, dll)
- Grafik harga interaktif
- Statistik pasar lengkap

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru
   ```bash
   git checkout -b feature/fitur-baru
   ```
3. Commit perubahan
   ```bash
   git commit -m "Tambah fitur baru"
   ```
4. Push ke branch tersebut
   ```bash
   git push origin feature/fitur-baru
   ```
5. Buat Pull Request ke branch `main`

---

## 🪪 License

Proyek ini dilisensikan di bawah **MIT License**.  
Lihat file `LICENSE` untuk detail lebih lanjut.
