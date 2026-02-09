import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;
const UNIVERSAL_APPLICANT_API = `${API_BASE_URL}applicant`;

const cache = {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour
const MAX_RETRIES = 5; // maximum number of retries for 429
const BASE_DELAY = 1000; // base delay in ms for exponential backoff

/**
 * Fetch data with caching and automatic retry on 429
 * @param {string} key - cache key
 * @param {string} url - API endpoint
 * @param {function} transform - optional function to transform response
 * @param {number} retryCount - internal retry counter
 */
const fetchWithCache = async (key, url, transform, retryCount = 0) => {
  const now = Date.now();

  // Return cached data if valid
  if (cache[key] && now - cache[key].timestamp < CACHE_EXPIRATION_TIME) {
    return Promise.resolve(cache[key].data);
  }

  try {
    const res = await axios.get(url);
    const data = transform ? transform(res) : res.data;

    cache[key] = {
      data,
      timestamp: Date.now(),
    };

    return data;
  } catch (error) {
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      // Exponential backoff before retrying
      const delay = Math.pow(2, retryCount) * BASE_DELAY;
      console.warn(
        `429 rate limit for ${url}. Retrying in ${delay / 1000}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithCache(key, url, transform, retryCount + 1);
    }

    // No retry or other error
    throw error;
  }
};

export default fetchWithCache;

export const getGenders = () =>
  fetchWithCache("gender", `${UNIVERSAL_API}/gender`, (res) => ({
    data: res.data.gender,
  }));
export const getMaritalStatuses = () =>
  fetchWithCache("marital", `${UNIVERSAL_API}/marital`, (res) => ({
    data: res.data.marital,
  }));

export const getCountries = () =>
  fetchWithCache("country", `${UNIVERSAL_API}/country`, (res) => ({
    data: res.data.country,
  }));
export const getCitizenship = () =>
  fetchWithCache("citizenship", `${UNIVERSAL_API}/citizenship`, (res) => ({
    data: res.data.citizenship,
  }));

export const getRegions = () =>
  fetchWithCache("regions", `${UNIVERSAL_API}/regions`, (res) => ({
    data: res.data.region,
  }));
export const getExperienceType = () =>
  fetchWithCache(
    "experincy_type",
    `${UNIVERSAL_APPLICANT_API}/experiencetype`,
    (res) => ({
      data: res.data.experincy_type,
    })
  );

export const getIndustry = () =>
  fetchWithCache("industry", `${UNIVERSAL_API}/industry`, (res) => ({
    data: res.data.industry,
  }));

export const getMajor = () =>
  fetchWithCache("major", `${UNIVERSAL_API}/major`, (res) => ({
    data: res.data.major,
  }));

export const getCourse = () =>
  fetchWithCache("course", `${UNIVERSAL_API}/course`, (res) => ({
    data: res.data.course,
  }));
export const getOrganization = () =>
  fetchWithCache(
    "organization",
    `${UNIVERSAL_APPLICANT_API}/organization`,
    (res) => ({
      data: res.data.organization,
    })
  );
export const getCollege = () =>
  fetchWithCache("college", `${UNIVERSAL_APPLICANT_API}/college`, (res) => ({
    data: res.data.college,
  }));

export const getEducationLevel = () =>
  fetchWithCache(
    "education_level",
    `${UNIVERSAL_API}/education_level`,
    (res) => ({
      data: res.data.education_category,
    })
  );

export const getPosition = () =>
  fetchWithCache("position", `${UNIVERSAL_API}/position`);

export const getPositionLevel = () =>
  fetchWithCache(
    "position_level",
    `${UNIVERSAL_API}/position_level`,
    (res) => ({
      data: res.data.position_level,
    })
  );

export const getSiteStatistics = () =>
  fetchWithCache(
    "site_statistics",
    `${API_BASE_URL}site-statistics`,
    (res) => ({
      data: res.data,
    })
  );

export const getJobTypes = () =>
  fetchWithCache("jobType", `${UNIVERSAL_API}/job-type`, (res) => ({
    data: res.data.type,
  }));

export const getPackagePrice = () =>
  fetchWithCache("packages", `${UNIVERSAL_API}/employer/packages`, (res) => ({
    data: res.data.data,
  }));
export const getLanguage = () =>
  fetchWithCache("language", `${UNIVERSAL_APPLICANT_API}/language`, (res) => ({
    data: res.data.language,
  }));
export const getReadLanguage = () =>
  fetchWithCache(
    "language_read",
    `${UNIVERSAL_APPLICANT_API}/language_read`,
    (res) => ({
      data: res.data.language_read,
    })
  );
export const getWriteLanguage = () =>
  fetchWithCache(
    "language_write",
    `${UNIVERSAL_APPLICANT_API}/language_write`,
    (res) => ({
      data: res.data.language_write,
    })
  );
export const getSpeakLanguage = () =>
  fetchWithCache(
    "language_speak",
    `${UNIVERSAL_APPLICANT_API}/language_speak`,
    (res) => ({
      data: res.data.language_speak,
    })
  );
export const getUnderstandLanguage = () =>
  fetchWithCache(
    "language_understand",
    `${UNIVERSAL_APPLICANT_API}/language_understand`,
    (res) => ({
      data: res.data.understand_ability,
    })
  );
export const getknowlege = () =>
  fetchWithCache("knowlege", `${UNIVERSAL_APPLICANT_API}/knowlege`, (res) => ({
    data: res.data.knowledge,
  }));
export const getSoftware = () =>
  fetchWithCache("software", `${UNIVERSAL_APPLICANT_API}/software`, (res) => ({
    data: res.data.software,
  }));
export const getTool = () =>
  fetchWithCache("tool", `${UNIVERSAL_APPLICANT_API}/tool`, (res) => ({
    data: res.data.tool,
  }));
export const getPersonality = () =>
  fetchWithCache(
    "personality",
    `${UNIVERSAL_APPLICANT_API}/personality`,
    (res) => ({
      data: res.data.personality,
    })
  );
export const getEmployer = () =>
  fetchWithCache(
    "applicant_employer",
    `${UNIVERSAL_APPLICANT_API}/applicant_employer`,
    (res) => ({
      data: res.data.data,
    })
  );
export const getTraining = () =>
  fetchWithCache(
    "gettraining",
    `${UNIVERSAL_APPLICANT_API}/gettraining`,
    (res) => ({
      data: res.data.training,
    })
  );
export const getProficiency = () =>
  fetchWithCache(
    "getproficiency",
    `${UNIVERSAL_API}/getproficiency`,
    (res) => ({
      data: res.data.proficiency,
    })
  );
export const getCulture = () =>
  fetchWithCache("culture", `${UNIVERSAL_APPLICANT_API}/culture`, (res) => ({
    data: res.data.culture,
  }));

export const getSalaryRange = () =>
  fetchWithCache(
    "salary_range",
    `${UNIVERSAL_APPLICANT_API}/salary_range`,
    (res) => ({
      data: res.data.salary_range,
    })
  );
