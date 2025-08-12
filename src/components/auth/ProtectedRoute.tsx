import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // Optionally add a loader
  if (!session) return <Navigate to="/signin" replace state={{ from: location }} />;
  return <Outlet />;
};

export default ProtectedRoute;
