import api from "../../lib/axios";

// CREATE candidate view (POST body)
export const createCandidateViewApi = async (applicant_id) => {
  const res = await api.post("/applicant/feature-view", {
    applicant_id,
  });
  return res.data;
};
