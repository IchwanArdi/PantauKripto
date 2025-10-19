import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import { lazy, Suspense } from 'react';
import Footer from './components/Footer.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Lazy load CryptoDetail for better performance
const CryptoDetail = lazy(() => import('./pages/CryptoDetail'));

// Komponen wrapper untuk mengakses darkMode dari context
function AppContent() {
  const { darkMode } = useSettings();

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/crypto/:id"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                  </div>
                }
              >
                <CryptoDetail />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
