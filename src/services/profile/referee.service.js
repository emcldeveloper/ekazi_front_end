import api from "../../lib/axios";

export const saveRefereeApi = async (payload) => {
  // EDIT
  if (payload.id) {
    const res = await api.put("/applicant/updatereferee", payload);
    return res.data;
  }

  // ADD
  const res = await api.post("/applicant/refereestore", payload);
  return res.data;
};

export const deleteRefereeApi = async (refereeId) => {
  const response = await api.delete(`/applicant/refereedelete/${refereeId}`);
  return response.data;
};
