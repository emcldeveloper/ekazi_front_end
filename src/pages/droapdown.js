import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import from react-select
import AsyncSelect from 'react-select/async'; // Use AsyncSelect for async loading
import AsyncCreatableSelect from 'react-select/async-creatable';

const Dropdown = ({ label, onSelect ,onOptionsLoad, initialValue }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null); // null for react-select
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customOrganization, setCustomOrganization] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

 
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/applicant/organization');
        const data = await response.json();

        // Convert data to the format needed for react-select
        const formattedOptions = Array.isArray(data.organization)
          ? data.organization.map(option => ({
              value: option.organization_name, // use as value
              label: option.organization_name, // use as label for display
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
       <AsyncCreatableSelect
        value={selected} // Should be an array if isMulti is true
        onChange={handleSelect} // Handle selection change
        loadOptions={loadOptions} // Function to load options asynchronously
        defaultOptions={options} // Options to preload for faster initial load
        placeholder=" organization" // Placeholder text
        // isMulti // Enable multi-select
       // isClearable // Allow clearing the selected options
        styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '30px', // Adjust the minimum height
              height: '32px',    // Set a fixed height if desired
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: '0px 8px', // Adjust padding for a smaller container
            }),
            input: (provided) => ({
              ...provided,
              margin: '0px', // Remove margins for a tighter input field
            }),
          }}
    />
     
    </div>
  );
};

export default Dropdown;
