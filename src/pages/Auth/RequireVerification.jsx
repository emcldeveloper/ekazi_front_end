import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RequireVerification = () => {
  const location = useLocation();
  const isVerified = localStorage.getItem("verified") === "1";

  if (!isVerified) {
    return <Navigate to="/not-verified" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireVerification;
