import { useEffect, useState } from "react";
import { subscriptionstatus } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useSubscriptionStatus = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const applicant_id = localStorage.getItem("applicantId");

  useEffect(() => {
    if (!applicant_id) {
      setError("Applicant ID not found.");
      setLoading(false);
      return;
    }

    let mounted = true;

    subscriptionstatus(applicant_id)
      .then((res) => {
        if (mounted) setSubscriptionData(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [applicant_id]);

  return { subscriptionData, loading, error };
};

export default useSubscriptionStatus;
