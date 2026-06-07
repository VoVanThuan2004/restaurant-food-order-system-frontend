import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const PublicRoute = () => {
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];

  if (isAuthentication && roles.includes("ADMIN")) {
    return <Navigate to={"/admin"} replace />;
  }

  if (isAuthentication && roles.includes("STAFF")) {
    return <Navigate to={"/staff"} replace />;
  }

  if (isAuthentication && roles.includes("CHEF")) {
    return <Navigate to={"/chef"} replace />;
  }
  return <Outlet />;
};
