import React, { useState, useEffect, memo } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

const Positions = ({ label = "Select a position", onSelect, initialValue }) => {
  const [options, setOptions] = useState([]); // Store fetched options
  const [selected, setSelected] = useState(initialValue || null); // To store the selected option
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  // Fetch positions for the current page
  const fetchPositions = async (inputValue = "", page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.ekazi.co.tz/api/applicant/applicant_employer?search=${inputValue}&page=${page}&perPage=10`
      );
      const data = await response.json();

      // Process the data by trimming position names and appending to options
      const formattedData = data.data.map((applicant_employer) => ({
        value: applicant_employer.employer_name,
        label: applicant_employer.employer_name.trim(), // Remove leading/trailing spaces
      }));

      setOptions((prevOptions) => [...prevOptions, ...formattedData]); // Append new data to options
      setPage(data.current_page); // Update current page
      setTotalPages(data.last_page); // Update total pages
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load options");
    } finally {
      setLoading(false);
    }
  };

  // Load options for search filtering
  const loadOptions = (inputValue, callback) => {
    setOptions([]); // Clear options before new search
    fetchPositions(inputValue, 1); // Start with the first page when searching
    callback(options); // Return options to AsyncSelect
  };

  // Load more options when scrolling (pagination)
  const loadMoreOptions = () => {
    if (loading || page >= totalPages) return; // Prevent multiple requests while loading or at last page
    fetchPositions("", page + 1); // Fetch the next page
  };

  // Fetch initial options when component mounts
  useEffect(() => {
    fetchPositions(); // Initially fetch all options
  }, []);

  // Handle selection change
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption); // Update local state
    if (onSelect) {
      onSelect(selectedOption); // Pass selected option to parent component
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="select-container">
        <AsyncCreatableSelect
          value={selected}
          onChange={handleSelect} // Pass the handleSelect function to onChange
          loadOptions={loadOptions}
          onMenuScrollToBottom={loadMoreOptions} // Load more when scrolling to the bottom
          placeholder={label}
          isClearable
          cacheOptions
          defaultOptions={options}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "30px",
              height: "35px",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "0px 8px",
            }),
            input: (provided) => ({
              ...provided,
              margin: "0px",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default memo(Positions);
