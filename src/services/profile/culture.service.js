import api from "../../lib/axios";

export const getCultureApi = async () => {
  const res = await api.get("/applicant/culture");
  return res.data.culture;
};

export const saveCultureApi = async (payload) => {
  const res = await api.post("/applicant/culturestore", payload);
  return res.data;
};
