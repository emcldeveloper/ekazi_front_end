import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchFeaturedJobs = async (page = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/applicant/featuredJobs?limit=10&page=${page}`
    );
    return {
      success: true,
      data: response.data.data,
      hasMore: response.data.data.length > 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getJobs = async (limit, page) => {
  const response = await axios.get(`${API_BASE_URL}jobs`, {
    params: {
      limit,
      page,
    },
  });
  return response.data.data;
};

export const appliedjob = async (applicant_id) => {
  const response = await axios.get(`${API_BASE_URL}applied_job`, {
    param: {
      applicant_id,
    },
  });
  return response.data;
};

export const getAppliedJobs = async (applicant_id) => {
  try {
    const response = await axios.get(
      `https://api.ekazi.co.tz/api/applicant/appliedjob`,
      {
        params: {
          applicant_id: applicant_id,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw error;
  }
};

export const JobsMatch = async (applicant_id) => {
  try {
    const response = await axios.get(
      `https://api.ekazi.co.tz/api/applicant/job_match`,
      {
        params: {
          applicant_id: applicant_id,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw error;
  }
};
