import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const AdminRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  const roles = user?.roles || [];

  if (!isAuthentication) {
    return <Navigate to={"/login"} replace />;
  }

  if (!roles.includes("ADMIN")) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
