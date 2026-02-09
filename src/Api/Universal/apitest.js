import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;
const UNIVERSAL_APPLICANT_API = `${API_BASE_URL}applicant`;

const cache = {};
const inProgress = {};
let queue = Promise.resolve();

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_BLOCK_TIME = 2 * 60 * 1000; // 2 minutes
const QUEUE_DELAY = 200; // 200ms between requests

const fetchQueued = (key, url, transform) => {
  queue = queue
    .then(() => new Promise((resolve) => setTimeout(resolve, QUEUE_DELAY)))
    .then(() => fetchWithCache(key, url, transform));
  return queue;
};

const fetchWithCache = async (key, url, transform) => {
  const now = Date.now();

  if (cache[key] && now - cache[key].timestamp < CACHE_EXPIRATION_TIME) {
    return Promise.resolve(cache[key].data);
  }

  if (inProgress[key]) return inProgress[key];

  inProgress[key] = axios
    .get(url)
    .then((res) => {
      const data = transform ? transform(res) : res.data;
      cache[key] = { data, timestamp: Date.now() };
      delete inProgress[key];
      return data;
    })
    .catch((error) => {
      delete inProgress[key];
      if (error.response?.status === 429) {
        console.error(`Rate limit exceeded for ${url}. No retry will occur.`);
        cache[key] = {
          data: cache[key]?.data || null,
          timestamp:
            Date.now() - (CACHE_EXPIRATION_TIME - RATE_LIMIT_BLOCK_TIME),
        };
      }
      throw error;
    });

  return inProgress[key];
};

// -------------------- UNIVERSAL ENDPOINTS -------------------- //
export const getGenders = () =>
  fetchQueued("gender", `${UNIVERSAL_API}/gender`, (res) => ({
    data: res.data.gender,
  }));

export const getMaritalStatuses = () =>
  fetchQueued("marital", `${UNIVERSAL_API}/marital`, (res) => ({
    data: res.data.marital,
  }));

export const getCountries = () =>
  fetchQueued("country", `${UNIVERSAL_API}/country`, (res) => ({
    data: res.data.country,
  }));

export const getCitizenship = () =>
  fetchQueued("citizenship", `${UNIVERSAL_API}/citizenship`, (res) => ({
    data: res.data.citizenship,
  }));

export const getRegions = () =>
  fetchQueued("regions", `${UNIVERSAL_API}/regions`, (res) => ({
    data: res.data.region,
  }));

export const getIndustry = () =>
  fetchQueued("industry", `${UNIVERSAL_API}/industry`, (res) => ({
    data: res.data.industry,
  }));

export const getMajor = () =>
  fetchQueued("major", `${UNIVERSAL_API}/major`, (res) => ({
    data: res.data.major,
  }));

export const getCourse = () =>
  fetchQueued("course", `${UNIVERSAL_API}/course`, (res) => ({
    data: res.data.course,
  }));

export const getOrganization = () =>
  fetchQueued(
    "organization",
    `${UNIVERSAL_APPLICANT_API}/organization`,
    (res) => ({ data: res.data.organization })
  );

export const getEducationLevel = () =>
  fetchQueued("education_level", `${UNIVERSAL_API}/education_level`, (res) => ({
    data: res.data.education_category,
  }));

export const getPosition = () =>
  fetchQueued("position", `${UNIVERSAL_API}/position`);

export const getPositionLevel = () =>
  fetchQueued("position_level", `${UNIVERSAL_API}/position_level`, (res) => ({
    data: res.data.position_level,
  }));

export const getSiteStatistics = () =>
  fetchQueued("site_statistics", `${API_BASE_URL}site-statistics`, (res) => ({
    data: res.data,
  }));

export const getJobTypes = () =>
  fetchQueued("jobType", `${UNIVERSAL_API}/job-type`, (res) => ({
    data: res.data.type,
  }));

export const getPackagePrice = () =>
  fetchQueued("packages", `${UNIVERSAL_API}/employer/packages`, (res) => ({
    data: res.data.data,
  }));

export const getLanguage = () =>
  fetchQueued("language", `${UNIVERSAL_APPLICANT_API}/language`, (res) => ({
    data: res.data.language,
  }));

export const getReadLanguage = () =>
  fetchQueued(
    "language_read",
    `${UNIVERSAL_APPLICANT_API}/language_read`,
    (res) => ({ data: res.data.language_read })
  );

export const getWriteLanguage = () =>
  fetchQueued(
    "language_write",
    `${UNIVERSAL_APPLICANT_API}/language_write`,
    (res) => ({ data: res.data.language_write })
  );

export const getSpeakLanguage = () =>
  fetchQueued(
    "language_speak",
    `${UNIVERSAL_APPLICANT_API}/language_speak`,
    (res) => ({ data: res.data.language_speak })
  );

export const getUnderstandLanguage = () =>
  fetchQueued(
    "language_understand",
    `${UNIVERSAL_APPLICANT_API}/language_understand`,
    (res) => ({ data: res.data.understand_ability })
  );

// Correct spelling
export const getKnowledge = () =>
  fetchQueued("knowledge", `${UNIVERSAL_APPLICANT_API}/knowlege`, (res) => ({
    data: res.data.knowledge,
  }));
// Old name for backward compatibility
export { getKnowledge as getknowlege };

export const getSoftware = () =>
  fetchQueued("software", `${UNIVERSAL_APPLICANT_API}/software`, (res) => ({
    data: res.data.software,
  }));

export const getTool = () =>
  fetchQueued("tool", `${UNIVERSAL_APPLICANT_API}/tool`, (res) => ({
    data: res.data.tool,
  }));

export const getPersonality = () =>
  fetchQueued(
    "personality",
    `${UNIVERSAL_APPLICANT_API}/personality`,
    (res) => ({ data: res.data.personality })
  );

export const getEmployer = () =>
  fetchQueued(
    "applicant_employer",
    `${UNIVERSAL_APPLICANT_API}/applicant_employer`,
    (res) => ({ data: res.data.data })
  );

export const getTraining = () =>
  fetchQueued(
    "gettraining",
    `${UNIVERSAL_APPLICANT_API}/gettraining`,
    (res) => ({ data: res.data.training })
  );

export const getProficiency = () =>
  fetchQueued("getproficiency", `${UNIVERSAL_API}/getproficiency`, (res) => ({
    data: res.data.proficiency,
  }));

export const getCulture = () =>
  fetchQueued("culture", `${UNIVERSAL_APPLICANT_API}/culture`, (res) => ({
    data: res.data.culture,
  }));
