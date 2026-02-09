import api from "../lib/axios.js";

export const fetchEmployers = async ({ page = 1, perPage = 10 }) => {
  const res = await api.get(
    `/list-of-employer?page=${page}&per_page=${perPage}`
  );
  return res.data?.data || [];
};
