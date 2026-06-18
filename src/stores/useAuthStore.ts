import { create } from "zustand";
import { tokenStorage } from "../utils/token-storage";
import type { LoginSuccessData } from "../types/auth.type";
import { getUserProfileApi } from "../services/user.api";
import type { UserStore } from "../types/user.type";

interface AuthState {
  user: {
    userId: string;
    fullName: string;
    roles: string[];
    avatarUrl: string;
  } | null;
  isAuthentication: boolean;
  isInitialized: boolean;
  setSession: (data: LoginSuccessData) => void;
  clearSession: () => void;
  boostrap: () => Promise<void>;
  setUserUpdate: (user: UserStore) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthentication: !!tokenStorage.getAccessToken(),
  isInitialized: false,

  // update state
  setSession: (data: LoginSuccessData) => {
    tokenStorage.setAccessToken(data.accessToken);

    set({
      user: {
        userId: data.userId,
        fullName: data.fullName,
        roles: data.roles,
        avatarUrl: data.avatarUrl,
      },
      isAuthentication: true,
    });
  },

  setUserUpdate: (user: UserStore) => {
    set({
      user: {
        userId: user.userId,
        fullName: user.fullName,
        roles: user.roles,
        avatarUrl: user.avatar,
      },
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
      const res = await getUserProfileApi();
      set({
        user: {
          userId: res.data?.userId as string,
          fullName: res.data?.fullName as string,
          roles: res.data?.roles as string[],
          avatarUrl: res.data?.avatarUrl as string,
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
