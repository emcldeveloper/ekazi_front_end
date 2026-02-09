import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Create axios instances
const api = axios.create({
  baseURL: `${API_BASE_URL}applicant`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const api2 = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Cache object to store API responses
const apiCache = {
  subscriptionPlan: null,
  cvCount: null,
  cvProfile: {},
};

export const CvApi = {
  createsubscription: async (countnoData) => {
    try {
      const response = await api.post("/savesubsription", countnoData);
      return response;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message
      );
    }
  },

  getsubscriptionPlan: async () => {
    // Return cached data if available
    if (apiCache.subscriptionPlan) {
      return apiCache.subscriptionPlan;
    }

    try {
      const response = await api.get("/CvSubscription");
      // Cache the response
      apiCache.subscriptionPlan = response.data.cv_plan_subscription;
      return apiCache.subscriptionPlan;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  getCvcount: async () => {
    // Return cached data if available
    if (apiCache.cvCount) {
      return apiCache.cvCount;
    }

    try {
      const response = await api.get("/getcvno");
      // Cache the response
      apiCache.cvCount = response.data.view_count;
      return apiCache.cvCount;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  createcvincrement: async (cvdata) => {
    try {
      const response = await api.post("/countcv", cvdata);
      // Invalidate cache since count has changed
      apiCache.cvCount = null;
      return response;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message
      );
    }
  },

  getCvprofile: async (uuid) => {
    // Return cached data if available for this UUID
    if (apiCache.cvProfile[uuid]) {
      return apiCache.cvProfile[uuid];
    }

    try {
      const response = await api2.get(`/cv/cv_builder/${uuid}`);
      // Cache the response with UUID as key
      apiCache.cvProfile[uuid] = response;
      return apiCache.cvProfile[uuid];
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Method to clear specific cache entries
  clearCache: (key = null) => {
    if (key) {
      if (key === "subscriptionPlan") {
        apiCache.subscriptionPlan = null;
      } else if (key === "cvCount") {
        apiCache.cvCount = null;
      } else if (key.startsWith("cvProfile:")) {
        const uuid = key.split(":")[1];
        delete apiCache.cvProfile[uuid];
      }
    } else {
      // Clear all cache
      apiCache.subscriptionPlan = null;
      apiCache.cvCount = null;
      apiCache.cvProfile = {};
    }
  },
};
