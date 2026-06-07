import { logoutApi } from "../features/auth/api/auth.api";
import useAuthStore from "../stores/useAuthStore";
import { tokenStorage } from "../utils/token-storage";

export const useLogout = () => {
  const clearSession = useAuthStore((state) => state.clearSession);
  const refreshToken = tokenStorage.getRefreshToken();

  const logout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (error) {
      console.log(error);
    } finally {
        clearSession();
    }
  };

  return { logout };
};