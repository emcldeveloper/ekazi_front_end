import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import from react-select

const EducationLevel = ({ label, onSelect }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null); // null for react-select
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/applicant/education_level');
        const data = await response.json();

        // Convert data to the format needed for react-select
        const formattedOptions = Array.isArray(data.education_level)
          ? data.education_level.map(option => ({
              value: option.education_level, // use as value
              label: option.education_level, // use as label for display
            }))
          : [];

        setOptions(formattedOptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load options');
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onSelect(selectedOption ? selectedOption.value : ''); // Pass the value to the parent
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Select
        value={selected}
        onChange={handleSelect}
        options={[...options,  ]} // Add "Other" option
        // options={[...options, { value: 'other', label: 'Other' }]} // Add "Other" option
        placeholder="Select an level"
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

export default EducationLevel
