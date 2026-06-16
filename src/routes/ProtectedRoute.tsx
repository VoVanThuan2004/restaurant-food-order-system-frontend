import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const ProtectedRoute = () => {
  // Kiểm tra trạng thái login hiện tại
  const isAuthentication = useAuthStore((state) => state.isAuthentication);

  if (!isAuthentication) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};
