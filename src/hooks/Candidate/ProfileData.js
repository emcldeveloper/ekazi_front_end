import { useEffect, useState } from "react";

import { profile } from "../../Api/Jobseeker/JobSeekerProfileApi";

// Create a simple cache object outside the component
const profileCache = {};
const MyProfile = () => {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const applicant_id = localStorage.getItem("applicantId");

  useEffect(() => {
    const fetchProfile = async () => {
      // Check cache first
      if (profileCache[applicant_id]) {
        setApplicant(profileCache[applicant_id]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await profile(applicant_id);

        // Update cache
        profileCache[applicant_id] = response.data;

        console.log("Response data:", response.data);
        setApplicant(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [applicant_id]);

  return applicant;
};
export default MyProfile;
