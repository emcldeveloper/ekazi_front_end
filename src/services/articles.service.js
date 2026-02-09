import api from "../lib/axios";

export const articlesApi = async () => {
  const res = await api.get("/articles");
  return res.data;
};

export const articleBySlugApi = async (slug) => {
  const res = await api.get(`/articles/${slug}`);
  return res.data;
};

export const createComment = async (articleId, payload) => {
  const res = await api.post(`/articles/${articleId}/comments`, payload);
  return res.data;
};
