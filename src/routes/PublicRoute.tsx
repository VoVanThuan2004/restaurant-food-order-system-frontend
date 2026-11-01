import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const PublicRoute = () => {
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];
  const location = useLocation();
  const isVerifyEmailPage = location.pathname === "/verify-email";

  if (isAuthentication && roles.includes("ADMIN")) {
    return <Navigate to={"/admin"} replace />;
  }

  if (isAuthentication && roles.includes("STAFF")) {
    return <Navigate to={"/dining-tables"} replace />;
  }

  if (isAuthentication && roles.includes("CHEF")) {
    return <Navigate to={"/chef"} replace />;
  }

  if (
    isAuthentication &&
    roles.includes("CUSTOMER") &&
    !isVerifyEmailPage
  ) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
