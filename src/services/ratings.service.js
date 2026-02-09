import api from "../lib/axios";

export const fetchRatingsApi = async (id) => {
  const res = await api.get("/ratings", {
    params: { id },
  });
  return res.data;
};

export const createRatingApi = async ({ id, rate }) => {
  const res = await api.post("/ratings", {
    id,
    rate,
  });
  return res.data;
};
