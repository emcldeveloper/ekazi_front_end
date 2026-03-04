import api from "../lib/axios";

export const createSubscriptionApi = async (payload) => {
  const res = await api.post("/applicant/accountsubscription", payload);

  return res.data;
};

export const getSubscriptionApi = async (applicant_id) => {
  const res = await api.get(
    `/applicant/accountsubscriptionStatus/${applicant_id}`,
  );

  return res.data;
};
