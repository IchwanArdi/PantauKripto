# 📊 PantauKripto

<div align="center">

![PantauKripto Logo](client/public/logo.png)

**Aplikasi web untuk memantau harga cryptocurrency secara real-time dengan tampilan modern dan responsif**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🚀 Live Demo](https://pantaukripto.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/IchwanArdi/PantauKripto/issues) • [💡 Request Feature](https://github.com/IchwanArdi/PantauKripto/issues)

</div>

---

## ✨ Fitur Utama

### 🔍 **Pencarian & Filter**
- Pencarian cryptocurrency dengan debouncing untuk performa optimal
- Filter berdasarkan nama atau simbol koin
- Hasil pencarian real-time dengan loading state

### 📈 **Grafik Harga Interaktif**
- Chart interaktif dengan berbagai timeframe (24J, 7H, 30H, 90H, 1T)
- Statistik volatilitas dan perubahan harga
- Tooltip informatif dengan data detail

### 💰 **Dukungan Multi-Mata Uang**
- Tampilan harga dalam USD dan IDR
- Format angka yang user-friendly (K, M, B, T)
- Konversi mata uang real-time

### 📊 **Ringkasan Pasar**
- Market cap dan volume 24 jam
- Statistik pasar secara keseluruhan
- Ranking cryptocurrency berdasarkan market cap

### 🌙 **Dark Mode**
- Toggle dark/light mode dengan persistensi
- UI yang konsisten di semua komponen
- Smooth transition animations

### ⚡ **Performance Optimized**
- Code splitting dengan React.lazy
- React.memo untuk mencegah re-render
- Lazy loading untuk gambar
- Compression middleware di server
- Caching yang efisien

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI Library
- **Vite 7.0.4** - Build tool & dev server
- **TailwindCSS 4.1.11** - Styling framework
- **React Router DOM 7.7.1** - Client-side routing
- **Recharts 3.1.0** - Chart library
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.21.2** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Compression** - Response compression
- **Express Rate Limit** - API rate limiting
- **Node Cache** - In-memory caching

### Data Provider
- **CoinGecko API** - Cryptocurrency data source
- **Proxy Server** - Caching & rate limit handling

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/IchwanArdi/PantauKripto.git
cd PantauKripto
```

### 2. Setup Backend
```bash
cd server
npm install
```

Buat file `.env` berdasarkan `.env.example`:
```env
PORT=3001
COINGECKO_BASE=https://api.coingecko.com/api/v3
DEBUG=false
CACHE_TTL=300
```

Jalankan server:
```bash
npm start
# atau untuk development
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Buat file `.env` berdasarkan `.env.example`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_DEBUG=false
```

Jalankan development server:
```bash
npm run dev
```

Buka di browser: [http://localhost:5173](http://localhost:5173)

### 4. Build untuk Production
```bash
# Frontend
npm run build

# Server sudah siap untuk production
```

---

## 📁 Project Structure

```
PantauKripto/
├── client/                 # Frontend React App
│   ├── public/            # Static assets
│   │   ├── logo.png
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── CoinCard.jsx
│   │   │   ├── CryptoInfoCard.jsx
│   │   │   ├── MarketStats.jsx
│   │   │   ├── PriceChart.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ...
│   │   ├── contexts/      # React Context providers
│   │   │   └── SettingsContext.jsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useCryptoData.js
│   │   │   ├── useCryptoDetail.js
│   │   │   └── useDebounce.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── CryptoDetail.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/      # API services
│   │   │   ├── cryptoService.js
│   │   │   └── cryptoDetailService.js
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── .env.example       # Environment variables template
│   ├── vite.config.js     # Vite configuration
│   └── package.json
├── server/                # Backend Express API
│   ├── api/              # API routes
│   │   ├── coins.js      # Coin data endpoints
│   │   ├── search.js     # Search endpoints
│   │   └── health.js     # Health check endpoints
│   ├── utils/            # Utility functions
│   │   ├── cache.js      # Caching utilities
│   │   └── coingecko.js  # CoinGecko API integration
│   ├── .env.example      # Environment variables template
│   ├── app.js            # Express app configuration
│   ├── server.js         # Server entry point
│   └── package.json
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

#### Client (.env)
```env
# API Base URL (Backend server URL)
VITE_API_URL=http://localhost:3001/api

# Optional: Enable debug mode
VITE_DEBUG=false
```

#### Server (.env)
```env
# Server Port
PORT=3001

# CoinGecko API Base URL
COINGECKO_BASE=https://api.coingecko.com/api/v3

# Optional: Enable debug mode
DEBUG=false

# Optional: Cache TTL in seconds (default: 300)
CACHE_TTL=300
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 🪙 Coins
- `GET /coins/markets` - Get top cryptocurrencies
- `GET /coins/:id` - Get specific coin details
- `GET /coins/:id/market_chart` - Get price chart data

#### 🔍 Search
- `GET /search?query=bitcoin` - Search cryptocurrencies

#### 🏥 Health
- `GET /health` - Health check endpoint
- `GET /ping` - Simple ping endpoint

### Example Response
```json
{
  "id": "bitcoin",
  "name": "Bitcoin",
  "symbol": "btc",
  "current_price": 45000,
  "market_cap": 850000000000,
  "price_change_percentage_24h": 2.5
}
```

---

## 🎨 Features in Detail

### 🔍 Smart Search
- **Debounced Input**: 600ms delay untuk performa optimal
- **Real-time Results**: Hasil pencarian langsung muncul
- **Error Handling**: Graceful error handling dengan retry mechanism

### 📊 Interactive Charts
- **Multiple Timeframes**: 24J, 7H, 30H, 90H, 1T
- **Responsive Design**: Chart menyesuaikan ukuran layar
- **Custom Tooltips**: Informasi detail saat hover
- **Statistics**: High, Low, Volatility, Price Change

### 💱 Multi-Currency Support
- **USD & IDR**: Dukungan dua mata uang utama
- **Smart Formatting**: Format angka yang user-friendly
- **Real-time Conversion**: Konversi harga real-time

### 🌙 Dark Mode
- **Persistent**: Setting tersimpan di localStorage
- **Smooth Transitions**: Animasi transisi yang halus
- **Consistent UI**: Semua komponen mendukung dark mode

---

## 🚀 Performance Optimizations

### Frontend
- ✅ **Code Splitting**: Lazy loading untuk CryptoDetail route
- ✅ **React.memo**: Mencegah re-render yang tidak perlu
- ✅ **Image Lazy Loading**: Loading gambar saat dibutuhkan
- ✅ **Bundle Optimization**: Manual chunk splitting
- ✅ **DNS Prefetch**: Prefetch untuk CoinGecko API

### Backend
- ✅ **Response Compression**: Gzip compression untuk semua response
- ✅ **Caching**: In-memory cache untuk API responses
- ✅ **Rate Limiting**: Perlindungan dari abuse
- ✅ **Security Headers**: Helmet.js untuk keamanan
- ✅ **Error Handling**: Comprehensive error handling

---

## 🛡️ Security Features

- **CORS Protection**: Konfigurasi CORS yang aman
- **Rate Limiting**: 60 requests/minute untuk API
- **Security Headers**: CSP, XSS protection, dll
- **Input Validation**: Validasi input yang ketat
- **Error Sanitization**: Error messages yang aman

---

## 📱 Responsive Design

- **Mobile First**: Design yang mobile-friendly
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Optimized untuk touch devices

---

## 🧪 Testing

### Manual Testing
```bash
# Test frontend
cd client
npm run dev

# Test backend
cd server
npm start

# Test API endpoints
curl http://localhost:3001/api/health
```

### Production Testing
- [Live Demo](https://pantaukripto.vercel.app)
- Health Check: [API Health](https://your-api-url.com/api/health)

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository ke Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy otomatis dari branch `master`

### Backend (Railway)
1. Connect GitHub repository ke Railway
2. Set start command: `npm start`
3. Set environment variables
4. Deploy otomatis dari branch `master`

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan ikuti langkah-langkah berikut:

1. **Fork** repository ini
2. **Clone** fork Anda:
   ```bash
   git clone https://github.com/your-username/PantauKripto.git
   ```
3. **Create** branch baru:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit** perubahan:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push** ke branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open** Pull Request

### Development Guidelines
- Gunakan ESLint untuk code quality
- Tulis commit message yang jelas
- Test perubahan sebelum commit
- Update dokumentasi jika perlu

---

## 📄 License

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

---

## 👨‍💻 Author

**Ichwan Ardi**
- GitHub: [@IchwanArdi](https://github.com/IchwanArdi)
- Project: [PantauKripto](https://github.com/IchwanArdi/PantauKripto)

---

## 🙏 Acknowledgments

- **CoinGecko** - Untuk API cryptocurrency yang luar biasa
- **React Team** - Untuk framework yang powerful
- **TailwindCSS** - Untuk utility-first CSS framework
- **Vercel** - Untuk hosting platform yang excellent
- **Railway** - Untuk backend hosting yang reliable

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/IchwanArdi/PantauKripto?style=social)
![GitHub forks](https://img.shields.io/github/forks/IchwanArdi/PantauKripto?style=social)
![GitHub issues](https://img.shields.io/github/issues/IchwanArdi/PantauKripto)
![GitHub pull requests](https://img.shields.io/github/issues-pr/IchwanArdi/PantauKripto)

---

<div align="center">

**⭐ Jika project ini membantu Anda, jangan lupa berikan star! ⭐**

Made with ❤️ by [Ichwan Ardi](https://github.com/IchwanArdi)

</div>