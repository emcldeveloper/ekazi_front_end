import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  resendVerificationRequest,
  verifyAccountRequest,
  resetPasswordRequest,
} from "../services/auth.service.js";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
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
}
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email) => resetPasswordRequest(email),
  });
};
