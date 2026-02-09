import React, { useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

const Course = ({ label, onSelect, onOptionsLoad, initialValue }) => {
  const [options, setOptions] = useState([]); // Store fetched options
  const [selected, setSelected] = useState(null); // To store the selected option
  const [error, setError] = useState(null); // For error handling
  const [page, setPage] = useState(1); // Keep track of current page for pagination
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Track if there's more data to load

  // Fetch options from API with pagination
  const fetchOptions = async (pageNum = 1) => {
    if (loading || !hasMore) return; // Avoid fetching when already loading or no more data

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/applicant/course?page=${pageNum}`);
      const data = await response.json();

      if (data.course && Array.isArray(data.course)) {
        const formattedOptions = data.course.map(option => ({
          value: option.course_name,
          label: option.course_name,
        }));

        setOptions(prevOptions => [...prevOptions, ...formattedOptions]); // Append new data to the existing options
        setHasMore(data.course.length > 0); // Set hasMore based on the response length
      }

      if (onOptionsLoad) {
        onOptionsLoad(options);
      }

      if (initialValue) {
        const initialOption = options.find(option => option.value === initialValue);
        setSelected(initialOption || null);
      }
    } catch (error) {
     
      setError('Failed to load options');
    } finally {
      setLoading(false);
    }
  };

  // Function to load options asynchronously based on user input
  const loadOptions = (inputValue, callback) => {
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  // Handle selection change
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ''); // Pass selected value to parent
  };

  // Update the selected option based on external update
  const updateSelectedOption = (value) => {
    if (options) {
      const selectedOption = options.find(option => option.value === value) || null;
      setSelected(selectedOption);
    }
  };

  // Fetch initial options on component mount
  useEffect(() => {
    fetchOptions(page);
  }, [page]);

  // Update the selected option if initialValue changes
  useEffect(() => {
    if (initialValue && options) {
      const initialOption = options.find(option => option.value === initialValue);
      setSelected(initialOption || null);
    }
  }, [initialValue, options]);

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  // Load more options when scrolled to the bottom or as needed
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1); // Increment page to load more data
    }
  };

  return (
    <div>
      <AsyncCreatableSelect
        value={selected}
        onChange={handleSelect}
        loadOptions={loadOptions}
        defaultOptions={options}
        placeholder="Select a course"
        isClearable
        onMenuScrollToBottom={handleLoadMore} // Trigger more data load on scroll
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '30px',
            height: '32px',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0px 8px',
          }),
          input: (provided) => ({
            ...provided,
            margin: '0px',
          }),
        }}
      />
      {loading && <div>Loading more...</div>} {/* Show loading indicator */}
    </div>
  );
};

export default Course;
