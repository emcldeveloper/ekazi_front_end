import api from "../lib/axios";

export const contactUsApi = async (payload) => {
  const res = await api.post("/contact", payload);

  return res.data;
};
