import { useState, useEffect, useCallback } from "react";
import { featuredJobSeeker } from "../../Api/Jobseeker/JobSeekerProfileApi"; // Make sure this path is correct

const useFeaturedJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Wrap the fetchFeaturedJobSeekers function in useCallback
  const fetchFeaturedJobSeekers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await featuredJobSeeker(); // Assumes it returns an array
      console.log("Fetched job seekers:", response); // Debugging line

      // Check if response is an array or an object that contains a data array
      if (Array.isArray(response)) {
        setJobSeekers(response);
      } else if (response && response.data) {
        setJobSeekers(response.data); // You may need to adjust this depending on the API response structure
      } else {
        throw new Error("Response is not in the expected format");
      }
    } catch (err) {
      console.error("Error fetching featured job seekers:", err);
      setError("Failed to load featured job seekers");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to keep it memoized

  useEffect(() => {
    fetchFeaturedJobSeekers();
  }, [fetchFeaturedJobSeekers]); // Dependency on fetchFeaturedJobSeekers

  // Debugging: Ensure the jobSeekers state is always an array before using .map
  console.log("jobSeekers state:", jobSeekers);

  return {
    jobSeekers,
    loading,
    error,
    refresh: fetchFeaturedJobSeekers, // Optional: expose refetch
  };
};

export default useFeaturedJobSeekers;
