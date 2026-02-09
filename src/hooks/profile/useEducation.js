import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEducationApi,
  getCollegeApi,
  getCoursesApi,
  getEducationLevelsApi,
  getMajorsApi,
  saveEducationApi,
} from "../../services/profile/education.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60 * 2,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: getCoursesApi,
    ...defaultOptions,
  });

export const useMajors = () =>
  useQuery({
    queryKey: ["majors"],
    queryFn: getMajorsApi,
    ...defaultOptions,
  });

export const useCollege = () =>
  useQuery({
    queryKey: ["college"],
    queryFn: getCollegeApi,
    ...defaultOptions,
  });

export const useEducationLevels = () =>
  useQuery({
    queryKey: ["educationLevels"],
    queryFn: getEducationLevelsApi,
    ...defaultOptions,
  });

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (educationId) => deleteEducationApi(educationId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Education deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.message || "Failed to delete education",
        "error"
      );
    },
  });
};

export const useSaveEducation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => saveEducationApi(formData),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables.get("id")
          ? "Education updated successfully"
          : "Education added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant-profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to save education", "error");
    },
  });
};
