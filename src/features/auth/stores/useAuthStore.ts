import { create } from "zustand";
import { tokenStorage } from "../utils/tokenStorage";
import type { LoginSuccessData } from "../types/auth.type";
import { getProfileApi } from "../api/get-profile";

interface AuthState {
  user: {
    userId: string;
    fullName: string;
    roleName: string;
  } | null;
  isAuthentication: boolean;
  isInitialized: boolean;
  setSession: (data: LoginSuccessData) => void;
  clearSession: () => void;
  boostrap: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthentication: !!tokenStorage.getAccessToken(),
  isInitialized: false,

  // update state
  setSession: (data: LoginSuccessData) => {
    tokenStorage.setAccessToken(data.accessToken);
    tokenStorage.setRefreshToken(data.refreshToken);

    set({
      user: {
        userId: data.userId,
        fullName: data.fullName,
        roleName: data.roleName,
      },
      isAuthentication: true,
    });
  },

  clearSession: () => {
    tokenStorage.clear();
    set({
      user: null,
      isAuthentication: false,
    });
  },

  boostrap: async () => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      set({
        isInitialized: true,
        isAuthentication: false,
        user: null,
      });
      return;
    }

    try {
      const res = await getProfileApi();
      set({
        user: {
          userId: res.data.userId,
          fullName: res.data.fullName,
          roleName: res.data.roleName,
        },
        isAuthentication: true,
        isInitialized: true,
      });
    } catch {
      tokenStorage.clear();
      set({ user: null, isAuthentication: false, isInitialized: true });
    }
  },
}));

export default useAuthStore;
