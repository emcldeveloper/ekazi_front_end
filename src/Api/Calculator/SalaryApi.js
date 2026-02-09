import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

// const api = axios.create({
//   baseURL: 'https://api.ekazi.co.tz/api/applicant',
//    headers: {
//       'Content-Type': 'multipart/form-data',
//     },
// });
const api = axios.create({
  baseURL: `${API_BASE_URL}applicant`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const CalculatorApi = {
  createinsight: async (countnoData) => {
    try {
      const response = await api.post("/viewincrement", countnoData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message
      );
    }
  },

  getsalaryrate: async () => {
    try {
      const response = await api.get("/salar-calculator");
      return response.data.salarydata;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};
