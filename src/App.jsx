import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import CryptoDetail from './pages/CryptoDetail';
import Footer from './components/Footer.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Komponen wrapper untuk mengakses darkMode dari context
function AppContent() {
  const { darkMode } = useSettings();

  return (
    <Router>
      <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto/:id" element={<CryptoDetail />} />
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
