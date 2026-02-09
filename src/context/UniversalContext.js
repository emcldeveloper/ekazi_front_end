import React, { createContext, useEffect, useState } from "react";
import {
  getMaritalStatuses,
  getGenders,
  getCountries,
  getRegions,
  getIndustry,
  getMajor,
  getCourse,
  getEducationLevel,
  getPosition,
  getPositionLevel,
  getSiteStatistics,
  getJobTypes,
} from "../Api/Universal/UniversalApi";
import {
  getJobCountByRegion,
  getJobCategorySummary,
  getClientsJobCountByIndustry,
} from "../Api/Job/JobCategoriesApi";

// Create the context
export const UniversalContext = createContext();

export const UniversalProvider = ({ children }) => {
  const [universalData, setUniversalData] = useState({
    maritalStatuses: [],
    genders: [],
    countries: [],
    regions: [],
    industries: [],
    majors: [],
    courses: [],
    educationLevels: [],
    positions: [],
    positionLevels: [],
    siteStatistics: {},
    types: [],
    jobCountByRegion: [], // Store job count by region
    jobCategorySummary: [], // Store job category summary
    clientsJobCountByIndustry: [], // Store job count by industry
  });

  const [loading, setLoading] = useState(true);

  // Function to add delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchUniversalData = async () => {
      setLoading(true);

      try {
        const [
          maritalRes,
          genderRes,
          countryRes,
          regionRes,
          industryRes,
          majorRes,
          courseRes,
          educationLevelRes,
          positionRes,
          positionLevelRes,
          siteStatsRes,
          jobTypesRes,
          jobCountByRegionRes,
          jobCategorySummaryRes,
          clientsJobCountByIndustryRes,
        ] = await Promise.all([
          getMaritalStatuses(),
          getGenders(),
          getCountries(),
          getRegions(),
          getIndustry(),
          getMajor(),
          getCourse(),
          getEducationLevel(),
          getPosition(),
          getPositionLevel(),
          getSiteStatistics(),
          getJobTypes(),
          getJobCountByRegion(),
          getJobCategorySummary(),
          getClientsJobCountByIndustry(),
        ]);

        setUniversalData({
          maritalStatuses: maritalRes?.data || [],
          genders: genderRes?.data || [],
          countries: countryRes?.data || [],
          regions: regionRes?.data || [],
          industries: industryRes?.data || [],
          majors: majorRes?.data || [],
          courses: courseRes?.data || [],
          educationLevels: educationLevelRes?.data || [],
          positions: positionRes?.data || [],
          positionLevels: positionLevelRes?.data || [],
          siteStatistics: siteStatsRes?.data || {},
          types: jobTypesRes?.data || [],
          jobCountByRegion: jobCountByRegionRes?.data || [],
          jobCategorySummary: jobCategorySummaryRes?.data || [],
          clientsJobCountByIndustry: clientsJobCountByIndustryRes?.data || [],
        });
      } catch (error) {
        console.error("Failed to load universal data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversalData();
  }, []);

  return (
    <UniversalContext.Provider value={{ ...universalData, loading }}>
      {children}
    </UniversalContext.Provider>
  );
};
