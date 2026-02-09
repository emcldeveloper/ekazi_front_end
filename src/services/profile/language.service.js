import api from "../../lib/axios";

export const getLanguage = async () => {
  const res = await api.get("/applicant/language");
  return res.data.language;
};

export const getReadLanguage = async () => {
  const res = await api.get("/applicant/language_read");
  return res.data.language_read;
};

export const getWriteLanguage = async () => {
  const res = await api.get("/applicant/language_write");
  return res.data.language_write;
};

export const getSpeakLanguage = async () => {
  const res = await api.get("/applicant/language_speak");
  return res.data.language_speak;
};

export const getUnderstandLanguage = async () => {
  const res = await api.get("/applicant/language_understand");
  return res.data.understand_ability;
};

// export const saveApplicantLanguage = async (payload) => {
//   const response = await api.post("/applicant/storeLanguage", payload);
//   return response.data;
// };

// export const updateLanguage = async (payload) => {
//   const res = await api.put("/applicant/languageupdate", payload);
//   return res.data;
// };

export const saveLanguageApi = async (payload) => {
  if (payload.get("id")) {
    const params = Object.fromEntries(payload.entries());
    const res = await api.put("/applicant/languageupdate", null, { params });
    return res.data;
  }

  const res = await api.post("/applicant/storeLanguage", payload);
  return res.data;
};

export const deleteLanguageApi = async (languageId) => {
  const response = await api.delete(`/applicant/languagedelete/${languageId}`);
  return response.data;
};
