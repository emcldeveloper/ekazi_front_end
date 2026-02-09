import axios from "axios";

// Set up default base URL for all axios requests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Simple in-memory cache with expiration
const cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper to check cache expiration
const isCacheValid = (key) => {
  const entry = cache[key];
  if (!entry) return false;

  const now = Date.now();
  return now - entry.timestamp < CACHE_TTL;
};

// Fetch CV Profile with caching + expiration
export const cvprofile = async ({ uuid }) => {
  const cacheKey = `cvprofile_${uuid}`;

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }

  try {
    const response = await api.get(`cv_builder/${uuid}`);
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now(),
    };
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createviewcount = async (sendData) => {
  try {
    const response = await api.post("applicant/feacture-view", sendData);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
