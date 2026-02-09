import { useQuery } from "@tanstack/react-query";
import { fetchApplicantCV } from "../services/template.service.js";

export const useApplicantCV = () => {
  const applicantId = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["applicant-cv", applicantId],
    queryFn: () => fetchApplicantCV(applicantId),
    enabled: !!applicantId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });
};
