import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  return useMutation(async (email) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}auth/password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset failed.");
    }

    return data;
  });
};