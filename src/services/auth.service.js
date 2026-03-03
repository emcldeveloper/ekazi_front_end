import api from "../lib/axios.js";

export const loginUser = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });

  return res.data;
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
    `/auth/verify?key=${encodeURIComponent(verifyKey)}`,
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

export const userProfile = async (applicant_id) => {
  const { data } = await api.get(`/applicant/primarydata/${applicant_id}`);
  return data;
};

// export const userProfile = async () => {
//   const { data } = await api.get("/auth/profile");
//   return data;
// };

// export const logoutUser = async () => {
//   await api.post("/auth/logout");
// };
