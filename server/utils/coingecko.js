require('dotenv').config();

const COINGECKO_BASE = process.env.COINGECKO_BASE || 'https://api.coingecko.com/api/v3';

// Helper function untuk fetch dengan error handling yang lebih baik
async function fetchWithRetry(url, retries = 3) {
  const isDebug = process.env.DEBUG === 'true';
  if (isDebug) console.log(`🚀 Attempting to fetch: ${url}`);

  for (let i = 0; i < retries; i++) {
    try {
      if (isDebug) console.log(`📡 Attempt ${i + 1}/${retries} for: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 detik timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'PantauKripto/1.0 (https://pantaukripto.vercel.app)',
        },
      });

      clearTimeout(timeoutId);

      if (isDebug) console.log(`📊 Response status: ${response.status} for ${url}`);

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after') || Math.pow(2, i);
        const delay = parseInt(retryAfter) * 1000;

        if (isDebug) console.log(`⏳ Rate limit hit, waiting ${delay}ms before retry ${i + 1}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Handle server errors
      if (response.status >= 500) {
        const delay = Math.pow(2, i) * 1000; // exponential backoff
        if (isDebug) console.log(`🔄 Server error ${response.status}, retrying in ${delay}ms`);

        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      // Handle client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        console.error(`❌ Client error: ${response.status} - ${response.statusText}`);

        let errorBody = null;
        try {
          errorBody = await response.text();
        } catch (e) {
          console.error('Failed to read error response body:', e);
        }

        throw new Error(`Client error ${response.status}: ${response.statusText}${errorBody ? ' - ' + errorBody : ''}`);
      }

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`⚠️ Unexpected content type: ${contentType} for ${url}`);
        const textResponse = await response.text();
        console.log('Non-JSON response:', textResponse.substring(0, 200));
        throw new Error('API mengembalikan response yang bukan JSON');
      }

      // Parse JSON with error handling
      try {
        const data = await response.json();
        if (isDebug) console.log(`✅ Successfully fetched data from ${url}`);
        return data;
      } catch (jsonError) {
        console.error('❌ JSON parsing failed:', jsonError);
        throw new Error('Response dari CoinGecko tidak valid (JSON parsing gagal)');
      }
    } catch (error) {
      console.error(`❌ Attempt ${i + 1} failed for ${url}:`, error.message);

      // Handle AbortError (timeout)
      if (error.name === 'AbortError') {
        console.error('⏰ Request timeout');

        if (i < retries - 1) {
          const delay = (i + 1) * 2000; // 2s, 4s, 6s
          if (isDebug) console.log(`🔄 Retrying after ${delay}ms due to timeout`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        throw new Error('Request timeout - CoinGecko tidak merespons dalam waktu yang wajar');
      }

      // Handle network errors
      if (error.message.includes('fetch')) {
        console.error('🌐 Network error detected');

        if (i < retries - 1) {
          const delay = (i + 1) * 1000;
          if (isDebug) console.log(`🔄 Network retry in ${delay}ms`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        throw new Error('Koneksi ke CoinGecko gagal - periksa koneksi internet');
      }

      // Jika ini adalah retry terakhir, throw error
      if (i === retries - 1) {
        console.error('❌ All retries failed for:', url);
        throw new Error(`Gagal mengambil data dari CoinGecko setelah ${retries} percobaan: ${error.message}`);
      }

      // Wait before retrying
      const delay = (i + 1) * 1000;
      if (isDebug) console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Health check function untuk test koneksi ke CoinGecko
async function healthCheck() {
  try {
    const isDebug = process.env.DEBUG === 'true';
    if (isDebug) console.log('🏥 Performing CoinGecko health check...');
    const data = await fetchWithRetry(`${COINGECKO_BASE}/ping`);
    if (isDebug) console.log('✅ CoinGecko health check passed:', data);
    return { status: 'ok', data };
  } catch (error) {
    console.error('❌ CoinGecko health check failed:', error);
    return { status: 'error', error: error.message };
  }
}

module.exports = {
  COINGECKO_BASE,
  fetchWithRetry,
  healthCheck,
};
