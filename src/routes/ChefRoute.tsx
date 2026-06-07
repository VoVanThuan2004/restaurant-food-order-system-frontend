import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const ChefRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // Kiểm tra role
  if (!roles.includes("CHEF")) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />
};
