import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async"; // Use AsyncSelect for async loading
import AsyncCreatableSelect from "react-select/async-creatable";

const College = ({
  label,
  onSelect,
  onOptionsLoad,
  initialValue,
  setInitialSelection,
}) => {
  const [options, setOptions] = useState(null); // Store fetched options
  const [selected, setSelected] = useState(null); // To store the selected option
  const [error, setError] = useState(null); // For error handling

  // Fetch options from API once when component mounts
  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "https://api.ekazi.co.tz/api/applicant/college"
      );
      const data = await response.json();

      // Format options for react-select
      const formattedOptions = Array.isArray(data.college)
        ? data.college.map((option) => ({
            value: option.college_name,
            label: option.college_name,
          }))
        : [];

      setOptions(formattedOptions);

      if (onOptionsLoad) {
        onOptionsLoad(formattedOptions);
      }

      // Set initial selection based on initialValue
      if (initialValue) {
        const initialOption = formattedOptions.find(
          (option) => option.value === initialValue
        );
        setSelected(initialOption || null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load options");
    }
  };

  // Function to load options asynchronously based on user input
  const loadOptions = (inputValue, callback) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  // Handle selection change
  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ""); // Pass selected value to parent
  };

  // Update the selected option based on external update
  const updateSelectedOption = (value) => {
    if (options) {
      const selectedOption =
        options.find((option) => option.value === value) || null;
      setSelected(selectedOption);
    }
  };

  // Allow the parent to set the initial selection update function
  useEffect(() => {
    if (setInitialSelection) {
      setInitialSelection(updateSelectedOption);
    }
  }, [setInitialSelection, options]);

  // Fetch options when the component mounts
  useEffect(() => {
    fetchOptions();
  }, []);

  // Update the selected option if initialValue changes
  useEffect(() => {
    if (initialValue && options) {
      const initialOption = options.find(
        (option) => option.value === initialValue
      );
      setSelected(initialOption || null);
    }
  }, [initialValue, options]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AsyncCreatableSelect
        value={selected} // Should be an array if isMulti is true
        onChange={handleSelect} // Handle selection change
        loadOptions={loadOptions}
        defaultOptions={options}
        placeholder="Select a college" // Placeholder text
        // isMulti // Enable multi-select
        isClearable // Allow clearing the selected options
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "30px", // Adjust the minimum height
            height: "32px", // Set a fixed height if desired
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0px 8px", // Adjust padding for a smaller container
          }),
          input: (provided) => ({
            ...provided,
            margin: "0px", // Remove margins for a tighter input field
          }),
        }}
      />
    </div>
  );
};

export default College;
