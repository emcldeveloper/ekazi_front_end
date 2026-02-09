import api from "../lib/axios";

export const fetchApplicantCV = async (applicantId) => {
  if (!applicantId) {
    throw new Error("Applicant ID is missing");
  }

  const res = await api.get(`/cv/cv_builder/${applicantId}`);

  // backend returns { data: {...} }
  return res.data?.data || {};
};
