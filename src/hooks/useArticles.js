import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  articleBySlugApi,
  articlesApi,
  createComment,
} from "../services/articles.service";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: articlesApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // renamed from cacheTime
    retry: 1,
  });
};

export const useArticleBySlug = (slug) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => articleBySlugApi(slug),
    enabled: !!slug,
  });
};

export const useCreateComment = (articleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createComment(articleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["article-comments", articleId],
      });
    },
  });
};
