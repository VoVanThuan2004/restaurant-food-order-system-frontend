import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const CustomerRoute = () => {
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];

  if (!isAuthentication) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes("CUSTOMER")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
