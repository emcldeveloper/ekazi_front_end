import api from "../../lib/axios";

export const saveEducationApi = async (payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  // EDIT
  if (payload.get("id")) {
    const res = await api.post("/applicant/updateeducation", payload, config);
    return res.data;
  }

  // ADD
  const res = await api.post("/applicant/educationstore", payload, config);
  return res.data;
};

export const deleteEducationApi = async (educationId) => {
  const res = await api.delete(`/applicant/deleteeducation/${educationId}`);
  return res.data;
};

export const getCoursesApi = async () => {
  const res = await api.get("/universal/course");
  return res.data.course;
};

export const getMajorsApi = async () => {
  const res = await api.get("/universal/major");
  return res.data.major;
};

export const getCollegeApi = async () => {
  const res = await api.get("/applicant/college");
  return res.data.college;
};

export const getEducationLevelsApi = async () => {
  const res = await api.get("/universal/education_level");
  return res.data.education_category;
};
