import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  resendVerificationRequest,
  verifyAccountRequest,
  resetPasswordRequest,
  userProfile,
} from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => loginUser(payload),
    onSuccess: (res) => {
      localStorage.setItem("auth_token", res.access_token);
      localStorage.setItem("user_id", res.user_id);
      localStorage.setItem("role_id", res.role_id);
      localStorage.setItem("verified", res.verified);
      localStorage.setItem("applicantId", res.applicant_id);
      localStorage.setItem("email", res.email);
      localStorage.setItem("verify_key", res.verify_key);

      const role = res?.role_id;

      // Role-based navigation
      if (role === 12) {
        navigate("/jobseeker/dashboard", { replace: true });
      } else if (role === 9) {
        navigate("/employer/dashboard", { replace: true });
      } else {
        alert("Unknown role. Please contact support.");
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useVerifyAccount = (verifyKey) => {
  return useQuery({
    queryKey: ["verify-account", verifyKey],
    queryFn: () => verifyAccountRequest(verifyKey),
    enabled: !!verifyKey, // runs only if there is a key
    retry: false, // avoid doubling verification calls
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (email) => resendVerificationRequest(email),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email) => resetPasswordRequest(email),
  });
};

export const useUser = () => {
  const token = localStorage.getItem("auth_token");
  const verified = localStorage.getItem("verified") === "1";
  const applicant_id = localStorage.getItem("applicantId");

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", applicant_id],
    queryFn: () => userProfile(applicant_id),
    enabled: !!token && !!applicant_id,
    retry: false,
  });

  return {
    user: data,
    isAuthenticated: Boolean(data),
    isVerified: verified,
    isLoading: isPending,
    isError,
  };
};

// export const useLogout = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: logout, isPending: isLoggingOut } = useMutation({
//     mutationFn: logoutUser,
//     onSettled: () => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       queryClient.clear();

//       navigate("/login", { replace: true });
//     },
//   });

//   return { logout, isLoggingOut };
// };
