import api from "../../lib/axios";

export const getTrainingApi = async () => {
  const res = await api.get("/applicant/gettraining");
  return res.data.training;
};

export const saveTrainingApi = async (payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (payload.get("id")) {
    payload.append("_method", "PUT");

    const res = await api.post("/applicant/updatetraining", payload, config);
    return res.data;
  }

  const res = await api.post("/applicant/storetraining", payload, config);
  return res.data;
};

export const deleteTrainingApi = async (TrainingId) => {
  const res = await api.delete(`/applicant/trainingdelete/${TrainingId}`);
  return res.data;
};
