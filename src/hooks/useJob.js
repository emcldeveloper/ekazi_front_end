import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchJobsApi } from "../services/job.service.js";

const JOBS_PER_PAGE = 12;

const useJob = (filters) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["jobs", filters], // ✅ IMPORTANT

    queryFn: ({ pageParam = 1 }) =>
      fetchJobsApi({
        limit: JOBS_PER_PAGE,
        page: pageParam,
        search: filters?.search || "",
        industry: filters?.industry || "",
      }),

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === JOBS_PER_PAGE ? allPages.length + 1 : undefined,

    staleTime: 1000 * 60 * 3,
  });

  const jobs = data?.pages?.flat() ?? [];

  return {
    jobs,
    loading: isLoading,
    error,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    loadingMore: isFetchingNextPage,
  };
};

export default useJob;
