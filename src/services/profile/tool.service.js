import api from "../../lib/axios";

export const getToolsApi = async () => {
  const res = await api.get("/applicant/tool");
  return res.data;
};

export const saveToolsApi = async (payload) => {
  const { data } = await api.post("/applicant/toolstore", payload);
  return data;
};
