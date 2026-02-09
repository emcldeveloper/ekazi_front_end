import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

// ----- Request Interceptor -----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ----- Response Interceptor for Retry on 429 -----
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { config, response } = error;

    // If no response, reject normally
    if (!response) {
      return Promise.reject(error);
    }

    const isIdempotent = ["get", "head", "options"].includes(
      config.method?.toLowerCase()
    );

    // Only retry for 429
    if (response.status === 429 && isIdempotent) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= 3) {
        return Promise.reject(error);
      }

      config.__retryCount++;

      const retryAfter = response.headers["retry-after"];

      let delay = 2000;

      if (retryAfter) {
        delay = parseInt(retryAfter) * 1000;
      } else {
        delay = delay * config.__retryCount;
      }

      console.warn(`Hit 429 rate limit. Retrying in ${delay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, delay));

      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
