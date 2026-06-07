import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const StaffRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  // Kiểm tra nếu người dùng có vai trò "staff" hoặc admin
  if (!roles.includes("STAFF") && !roles.includes("ADMIN")) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
