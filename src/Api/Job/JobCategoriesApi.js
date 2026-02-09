import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// In-memory cache object
const cache = {};

// Cache expiration time (in milliseconds)
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour (you can adjust this)

// Function to check cache and return data if available and not expired
const getCache = (key) => {
  const cachedItem = cache[key];
  if (!cachedItem) return null;

  const currentTime = Date.now();
  if (currentTime > cachedItem.expiry) {
    // If the cached item has expired, remove it from cache
    delete cache[key];
    return null;
  }

  return cachedItem.data;
};

// Function to set cache data with expiration time
const setCache = (key, data) => {
  const expiry = Date.now() + CACHE_EXPIRATION_TIME; // Set the expiration time
  cache[key] = { data, expiry };
};

// Get job count grouped by region
export const getJobCountByRegion = async () => {
  const cacheKey = "job-count-by-region";

  // Check if data is already cached
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await axios.get(`${API_BASE_URL}job-count-by-region`);
    setCache(cacheKey, response.data); // Cache the response data with expiry
    return response.data;
  } catch (error) {
    console.error("Error fetching job count by region:", error);
    throw error;
  }
};

// Get job category summary
export const getJobCategorySummary = async () => {
  const cacheKey = "job-category-summary";

  // Check if data is already cached
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await axios.get(`${API_BASE_URL}job-category-summary`);
    setCache(cacheKey, response.data); // Cache the response data with expiry
    return response.data;
  } catch (error) {
    console.error("Error fetching job category summary:", error);
    throw error;
  }
};

// Get clients' job count grouped by industry
export const getClientsJobCountByIndustry = async () => {
  const cacheKey = "clients-job-count-by-industry";

  // Check if data is already cached
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}clients-job-count-by-industry`
    );
    setCache(cacheKey, response.data); // Cache the response data with expiry
    return response.data;
  } catch (error) {
    console.error("Error fetching clients job count by industry:", error);
    throw error;
  }
};
