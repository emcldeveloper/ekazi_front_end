import api from "../lib/axios.js";

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    // Laravel validation or error message handling
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Login failed";
    throw new Error(message);
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await api.post("/auth/register", formData);
    return res.data;
  } catch (error) {
    const errors = error.response?.data?.errors;

    if (errors) {
      throw errors;
    }

    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const verifyAccountRequest = async (verifyKey) => {
  const response = await api.get(
    `/auth/verify?key=${encodeURIComponent(verifyKey)}`
  );
  return response.data;
};

export const resendVerificationRequest = async (email) => {
  const response = await api.post("/auth/resend-verification", {
    email,
  });
  return response.data;
};

export const resetPasswordRequest = async (email) => {
  const response = await api.post("/auth/reset-password", {
    email,
  });
  return response.data;
};
