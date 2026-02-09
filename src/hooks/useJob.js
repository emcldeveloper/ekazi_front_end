import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchJobsApi } from "../services/job.service.js";

const JOBS_PER_PAGE = 12;

const useJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["jobs"],

    queryFn: ({ pageParam = 1 }) =>
      fetchJobsApi({ limit: JOBS_PER_PAGE, page: pageParam }),

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === JOBS_PER_PAGE ? allPages.length + 1 : undefined,

    staleTime: 1000 * 60 * 3,
  });

  // Flatten pages
  const allJobs = useMemo(() => data?.pages?.flat() ?? [], [data]);

  // Filtering
  const filteredJobs = useMemo(() => {
    const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

    return allJobs.filter((job) => {
      const title = job.job_position?.position_name?.toLowerCase() || "";

      const matchTitle =
        searchWords.length === 0 || searchWords.some((w) => title.includes(w));

      const matchIndustry = selectedIndustry
        ? job.industry_id === Number(selectedIndustry)
        : true;

      return matchTitle && matchIndustry;
    });
  }, [allJobs, searchTerm, selectedIndustry]);

  return {
    jobs: filteredJobs,
    loading: isLoading,
    error,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    loadingMore: isFetchingNextPage,

    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
  };
};

export default useJob;
