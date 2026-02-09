import { useState, useEffect, useCallback } from "react";
import { getJobs } from "../../Api/Job/FeactureJob"; // Make sure the path is correct

const JOBS_PER_PAGE = 12;

const useJobs = () => {
  const [allJobs, setAllJobs] = useState([]); // All jobs (including cached and fetched)
  const [filteredJobs, setFilteredJobs] = useState([]); // Filtered jobs based on search/industry
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Cache helper function
  const getCache = (pageNumber) => {
    const cachedData = localStorage.getItem(`jobs_page_${pageNumber}`);
    return cachedData ? JSON.parse(cachedData) : null;
  };

  const setCache = (pageNumber, jobs) => {
    localStorage.setItem(`jobs_page_${pageNumber}`, JSON.stringify(jobs));
  };

  const fetchJobs = async (pageNumber = 1, append = false) => {
    try {
      const cachedJobs = getCache(pageNumber);

      // Use cached jobs if available
      if (cachedJobs) {
        if (append) {
          setAllJobs((prev) => [...prev, ...cachedJobs]);
        } else {
          setAllJobs(cachedJobs);
        }
        setHasMore(cachedJobs.length === JOBS_PER_PAGE);
        setPage(pageNumber); // Update the page number after using cached data
        return; // Skip the API call since we have cached data
      }

      // If no cache, fetch from the API
      const response = await getJobs(JOBS_PER_PAGE, pageNumber);
      const newJobs = response || [];

      // Store the fetched data in cache
      setCache(pageNumber, newJobs);

      if (append) {
        setAllJobs((prev) => [...prev, ...newJobs]);
      } else {
        setAllJobs(newJobs);
      }

      setHasMore(newJobs.length === JOBS_PER_PAGE);
      setPage(pageNumber); // Update the page number after fetching new data
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchJobs(1, false).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    const filtered = allJobs.filter((job) => {
      const title = job.job_position?.position_name?.toLowerCase() || "";
      const matchTitle =
        searchWords.length === 0 ||
        searchWords.some((word) => title.includes(word));

      const matchIndustry = selectedIndustry
        ? job.industry_id === parseInt(selectedIndustry)
        : true;

      return matchTitle && matchIndustry;
    });

    setFilteredJobs(filtered);
  }, [allJobs, searchTerm, selectedIndustry]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    await fetchJobs(nextPage, true); // Pass true to append data
    setLoadingMore(false);
  }, [hasMore, loadingMore, page]);

  return {
    jobs: filteredJobs,
    loading,
    error,
    hasMore,
    loadMore,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    loadingMore,
  };
};

// Make sure this is the default export
export default useJobs;
