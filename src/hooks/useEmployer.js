import { useQuery } from "@tanstack/react-query";
import { fetchEmployers } from "../services/employer.service.js";

export const useEmployers = ({ page = 1, perPage = 20, filters = {} }) => {
  return useQuery({
    queryKey: ["employers", page, perPage, filters],
    queryFn: () => fetchEmployers({ page, perPage, filters }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
