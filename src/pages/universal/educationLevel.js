import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

const EducationLevel = ({ label, onSelect, onOptionsLoad, initialValue }) => {
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  // Fetch options from API when the component mounts
  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "https://api.ekazi.co.tz/api/applicant/education_level"
      );
      const data = await response.json();

      const formattedOptions = Array.isArray(data.education_category)
        ? data.education_category.map((option) => ({
            value: option.id,
            label: option.education_level,
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
      <AsyncSelect
        value={selected}
        onChange={handleSelect}
        loadOptions={loadOptions} // Function to load options asynchronously
        defaultOptions={options} // Options to preload for faster initial load
        placeholder="Level"
        // isClearable
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "30px",
            height: "32px",
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
  );
};

export default EducationLevel;
