import api from "../../lib/axios";

export const saveObjectiveApi = async ({ applicant_id, objective }) => {
  const response = await api.put(`/applicant/storeObjective/${applicant_id}`, {
    objective,
  });

  return response.data;
};
