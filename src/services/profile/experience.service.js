import api from "../../lib/axios";

export const getExperienceTypeApi = async () => {
  const res = await api.get("/applicant/experiencetype");
  return res.data.experincy_type;
};

export const saveExperienceApi = async (payload) => {
  // EDIT
  if (payload.id) {
    const res = await api.post("/applicant/updateexperience", payload);
    return res.data;
  }

  const { data } = await api.post("/applicant/experiencestore", payload);
  return data;
};

export const deleteExperienceApi = async (experienceId) => {
  const res = await api.delete(`/applicant/deleteexperience/${experienceId}`);
  return res.data;
};
