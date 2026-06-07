import { create } from "zustand";
import type { User } from "../types/user.type";
import { getUserProfileApi } from "../app/api/authApi";
import { tokenStorage } from "../features/auth/utils/tokenStorage";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
};

export const useCurrentUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  fetchProfile: async () => {
    if (!tokenStorage.getAccessToken()) return;
    try {
      const data = await getUserProfileApi();
      set({
        user: data.data,
      });
    } catch (error) {
      console.log(error);
      set({
        user: null,
      });
    }
  },
}));
