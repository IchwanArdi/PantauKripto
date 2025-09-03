// Konfigurasi API yang bisa digunakan di seluruh aplikasi
export const API_CONFIG = {
  // Base URL untuk server lokal
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',

  // Endpoints
  ENDPOINTS: {
    COINS_MARKETS: '/coins/markets',
    SEARCH: '/search',
    COIN_DETAIL: '/coins',
    MARKET_CHART: '/market_chart',
    HEALTH: '/health',
  },

  // Default parameters
  DEFAULTS: {
    CURRENCY: 'idr',
    PER_PAGE: 6,
    DAYS: '7',
  },
};

// Helper function untuk membuat URL lengkap
export const createApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  // Menambahkan query parameters
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
};

// Helper function untuk handle API errors
export const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `API Error: ${response.status}`);
  }
  return response.json();
};
