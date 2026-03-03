import api from "../lib/axios";

export const createInsightApi = async (payload) => {
  const res = await api.post("/applicant/viewincrement", payload);

  return res.data;
};

export const getSalaryApi = async () => {
  const res = await api.get("/applicant/salar-calculator");

  return res.data;
};
