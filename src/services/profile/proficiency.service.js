import api from "../../lib/axios";

export const getProficiencyApi = async () => {
  const res = await api.get("/universal/getproficiency");
  return res.data.proficiency;
};

export const saveProficiencyApi = async (payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (payload.get("id")) {
    payload.append("_method", "PUT");

    const res = await api.post("/applicant/updateproficiency", payload, config);
    return res.data;
  }

  const res = await api.post("/applicant/proficiencystore", payload, config);
  return res.data;
};

export const deleteRefereeApi = async (proficiencyId) => {
  const response = await api.delete(
    `/applicant/deleteproficiency/${proficiencyId}`
  );
  return response.data;
};
