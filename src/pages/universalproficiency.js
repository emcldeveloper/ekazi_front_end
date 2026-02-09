import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import from react-select
import AsyncSelect from 'react-select/async'; // Use AsyncSelect for async loading

const UniversalProfiency = ({ label, onSelect, onOptionsLoad, initialValue }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null); // null for react-select
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/applicant/proficiency');
      const data = await response.json();

      // Convert data to the format needed for react-select
      const formattedOptions = Array.isArray(data.proficiency)
        ? data.proficiency.map(option => ({
          value: option.proficiency_name, // use as value
          label: option.proficiency_name, // use as label for display
        }))
        : [];

      setOptions(formattedOptions);
      // Call the onOptionsLoad callback to pass options back to parent
      if (onOptionsLoad) {
        onOptionsLoad(formattedOptions);
      }

      // If there's an initial value, find and set it as the selected option
      if (initialValue) {
        const selectedOption = formattedOptions.find(option => option.value === initialValue);
        setSelected(selectedOption || null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load options');
    }

  };

  // Function to load options asynchronously based on user input

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  // Handle select option change
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ''); // Pass selected value to parent
  };

  // Fetch options once when the component mounts
  useEffect(() => {
    fetchOptions();
  }, []);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AsyncSelect
        value={selected} // Should be an array if isMulti is true
        onChange={handleSelect} // Handle selection change
        loadOptions={loadOptions} // Function to load options asynchronously
        defaultOptions={options} // Options to preload for faster initial load

        // options={[...options, { value: 'other', label: 'Other' }]} // Add "Other" option
        placeholder="Select an prociency"
        isClearable // Optional: allows clearing the selection

      />
      {/* {selected && selected.value === 'other' && (
        <input
          type="text"
          placeholder="Enter custom organization"
          value={customOrganization}
          onChange={(e) => setCustomOrganization(e.target.value)}
        />
      )} */}
    </div>
  );
};

export default UniversalProfiency;
