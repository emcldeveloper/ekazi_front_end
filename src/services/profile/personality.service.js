import api from "../../lib/axios";

export const getPersonalityApi = async () => {
  const res = await api.get("/applicant/personality");
  return res.data.personality;
};

export const savePersonalityApi = async (payload) => {
  const res = await api.post("/applicant/personalitystore", payload);
  return res.data;
};
