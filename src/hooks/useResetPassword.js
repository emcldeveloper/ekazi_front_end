import { useState } from "react";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL; 
  const resetPassword = async ({ token, email, password, password_confirmation }) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
     const response = await fetch(`${API_BASE_URL}auth/password-new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password, password_confirmation }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Failed to reset password.");
        setLoading(false);
        return false;
      } else {
        setSuccessMsg("Password successfully reset!");
        setLoading(false);
        return true;
      }
    } catch (err) {
      setErrorMsg("Network error. Try again.");
      setLoading(false);
      return false;
    }
  };

  return { resetPassword, loading, errorMsg, successMsg };
};
