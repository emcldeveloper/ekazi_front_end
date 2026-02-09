// hooks/useLoginForm.js
import { useState } from "react";
import { loginUser } from "../../Api/Auth/Auth";

const useLoginForm = (onHide) => {
  const [userType, setUserType] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL; 
  
  const handleUserChoice = (type) => {
    if (type === "employer") {
      window.location.href = API_BASE_URL;
      onHide();
    } else {
      setShowCandidateForm(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userType === "candidate") {
      setIsLoading(true);

      try {
        const data = await loginUser(email, password);

        if (data.access_token) {

          // ✅ Save everything needed for verify + resend
          localStorage.setItem("auth_token", data.access_token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("role_id", data.role_id);
          localStorage.setItem("verified", data.verified);
          localStorage.setItem("applicantId", data.applicant_id);

          // ✅ NEW (needed for resend verification)
          localStorage.setItem("email", data.email);
          localStorage.setItem("verify_key", data.verify_key);

          setShowCandidateForm(false);
          onHide();

          // If NOT verified → send to not-verified page
          if (data.verified !== 1) {
            window.location.href = "/not-verified";
            return;
          }

          // Role-based redirects
          if (data.role_id === 12) {
            window.location.href = "/jobseeker/dashboard";
          } else if (data.role_id === 9) {
            window.location.href = "/employer/dashboard";
          } else {
            alert("Unknown role. Please contact support.");
          }

        } else {
          alert("Invalid login credentials");
        }

      } catch (error) {
        alert(`Login failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} clicked`);
  };

  return {
    email,
    password,
    isLoading,
    showCandidateForm,
    setEmail,
    setPassword,
    setShowCandidateForm,
    handleUserChoice,
    handleLogin,
    handleSocialLogin,
  };
};

export default useLoginForm;
