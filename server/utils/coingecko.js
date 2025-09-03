const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

// Helper function untuk fetch dengan error handling
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        // Jika rate limit, tunggu sebelum retry
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        console.log(`Rate limit hit, waiting ${delay}ms before retry ${i + 1}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);

      if (i === retries - 1) {
        throw error;
      }

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

module.exports = {
  COINGECKO_BASE,
  fetchWithRetry,
};
