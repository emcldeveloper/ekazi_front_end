import api from "../../lib/axios";

export const getPersonalInfoApi = async (payload) => {
  const res = await api.put("/applicant/personinformation", payload);
  return res.data;
};
