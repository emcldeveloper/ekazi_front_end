import api from "../../lib/axios";

export const saveJobFitApi = async (payload) => {
  // payload can be FormData or a plain object
  const applicantId =
    payload instanceof FormData
      ? payload.get("applicant_id")
      : payload?.applicant_id;

  if (applicantId) {
    // UPDATE
    const res = await api.put(`/applicant/JobFit`, payload);
    return res.data;
  }

  // CREATE
  const res = await api.post("/applicant/JobFit", payload);
  return res.data;
};

export const deleteJobFitApi = async (applicant_id, industry_id) => {
  const res = await api.delete("/applicant/JobFit", null, {
    params: {
      applicant_id,
      industry_id,
    },
  });

  return res.data;
};
