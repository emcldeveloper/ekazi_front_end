import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Cache object to store API responses
const cache = {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// Function to add delay (to avoid rate limits)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithCache = async (key, url) => {
  const now = Date.now();

  // Check if cached data exists and hasn't expired
  if (cache[key] && now - cache[key].timestamp < CACHE_EXPIRATION_TIME) {
    return Promise.resolve(cache[key].data);
  }

  // If no cached data, make the API request
  try {
    const res = await axios.get(url);

    // Save the data and timestamp in the cache
    cache[key] = {
      data: res.data,
      timestamp: Date.now(),
    };

    return res.data;
  } catch (error) {
    if (error.response?.status === 429) {
      // If we hit a rate limit (status 429), log the error and retry after a delay

      await delay(1000); // Delay for 1 second (this can be adjusted)
      return fetchWithCache(key, url); // Retry after delay
    }

    throw error;
  }
};

// Function to get list of employers with caching and rate limit handling
export const getListOfEmployers = async (page, perPage) => {
  const url = `${API_BASE_URL}/list-of-employer?page=${page}&per_page=${perPage}`;
  const cacheKey = `employer_list_${page}_${perPage}`;

  return fetchWithCache(cacheKey, url);
};
