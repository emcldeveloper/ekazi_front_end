import api from "../lib/axios.js";
import cvApi from "../lib/cvApi.js";

export const createSubscriptionApi = async (data) => {
  const res = await api.post("/applicant/savesubsription", data);
  return res.data;
};

export const getSubscriptionPlanApi = async () => {
  const res = await api.get("/applicant/CvSubscription");
  return res.data;
};

export const getCvCountApi = async () => {
  const res = await api.get("/applicant/getcvno");
  return res.data;
};

export const incrementCvCountApi = async (data) => {
  const res = await api.post("/applicant/countcv", data);
  return res.data;
};

export const getCvProfileApi = async (applicantId) => {
  const res = await api.get(`/cv/cv_builder/${applicantId}`);
  return res.data;
};

// GENERATE CV PDF
export const cvBuilderApi = async (applicantId) => {
  const res = await api.get(`/cv/cv_builder/${applicantId}`);
  return res?.data;
};

export const generateCvPdf = async ({ template, name, applicantId }) => {
  const response = await cvApi.get("/generatePdf", {
    params: {
      template,
      name,
      applicantId,
    },
  });

  window.open(response.data.body.link, "_blank");

  return response.data;
};

/**
 * Save downloaded CVs
 */
export const saveCvApi = async ({ applicant_id, template, cv_name }) => {
  const res = await api.post("/applicant/savedCv", {
    applicant_id,
    template,
    cv_name,
  });
  return res.data;
};

/**
 * Fetch downloaded CVs
 */
export const getMyCvApi = async (applicantId) => {
  const res = await api.get(`/applicant/mycv/${applicantId}`);

  return res.data;
};

/**
 * Delete downloaded CVs
 */
export const deleteCvApi = async (id) => {
  const res = await api.delete(`/applicant/deletecv/${id}`);
  return res.data;
};
