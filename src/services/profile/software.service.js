import api from "../../lib/axios";

export const getSoftwareApi = async () => {
  const res = await api.get("/applicant/software");
  return res.data.software;
};

export const saveSoftwareApi = async (payload) => {
  const { data } = await api.post("/applicant/softwarestore", payload);
  return data;
};
