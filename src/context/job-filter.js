import { createContext, useContext, useState } from "react";

const JobFilterContext = createContext();

export const JobFilterProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedPositionLevel, setSelectedPositionLevel] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const value = {
    selectedTime,
    setSelectedTime,
    selectedJobType,
    setSelectedJobType,
    selectedCountry,
    setSelectedCountry,
    selectedRegion,
    setSelectedRegion,
    selectedSubLocation,
    setSelectedSubLocation,
    selectedPositionLevel,
    setSelectedPositionLevel,
    selectedIndustry,
    setSelectedIndustry,
    searchKeyword,
    setSearchKeyword,
  };

  return (
    <JobFilterContext.Provider value={value}>
      {children}
    </JobFilterContext.Provider>
  );
};

export const useJobFilters = () => useContext(JobFilterContext);
