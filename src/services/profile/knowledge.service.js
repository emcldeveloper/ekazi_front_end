import api from "../../lib/axios";

export const getKnowledgeApi = async () => {
  const res = await api.get("/applicant/knowlege");
  return res.data.knowledge;
};

export const saveKnowledgeApi = async (payload) => {
  const { data } = await api.post("/applicant/knowledgestore", payload);
  return data;
};
