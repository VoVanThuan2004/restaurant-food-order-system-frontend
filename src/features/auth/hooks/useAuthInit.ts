import { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import { tokenStorage } from "../utils/tokenStorage";
import { getProfileApi } from "../api/get-profile";

export const useAuthInit = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfileApi(); // gọi /me
        setUser({
          userId: res.data.userId,
          fullName: res.data.fullName,
          roleName: res.data.roleName,
        });
      } catch (error) {
        clearSession(); // token sai hoặc hết hạn
        console.log(error);
      }
    };

    fetchProfile();
  }, [setUser, clearSession]);
};

