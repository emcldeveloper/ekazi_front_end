import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isLoading, isAuthenticated, isVerified } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/not-verified" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
