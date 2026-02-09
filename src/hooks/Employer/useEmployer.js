import { useState, useEffect, useCallback } from 'react';
import { getListOfEmployers } from '../../Api/Employer/ListOfEmployerApi'; // Ensure the API path is correct

// Cache to store employer data in memory
const employerCache = {};

const useEmployer = (page = 1, pageSize = 20) => {
  const [jobCompanies, setJobCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch employer data, first checks cache
  const fetchEmployers = useCallback(async (pageNumber, size) => {
    setLoading(true);

    // Check if the data is already cached for the current page
    if (employerCache[pageNumber]) {
      console.log('Using cached data for page', pageNumber);
      setJobCompanies(employerCache[pageNumber]);
      setLoading(false);
      return;
    }

    // If not in cache, make the API call
    try {
      const response = await getListOfEmployers(pageNumber, size);
      const data = response.data || [];

      // Cache the fetched data
      employerCache[pageNumber] = data;

      // Update state
      setJobCompanies(data);
    } catch (err) {
      setError('Failed to fetch employer list');
      console.error('Failed to fetch employer list:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount or when page or pageSize changes
  useEffect(() => {
    fetchEmployers(page, pageSize);
  }, [fetchEmployers, page, pageSize]);

  return { jobCompanies, loading, error, fetchEmployers };
};

export default useEmployer;
