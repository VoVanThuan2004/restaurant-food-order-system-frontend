import { create } from "zustand";

interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

export const useCountStore = create<CountState>((set) => ({
  count: 0,

  // update state
  increase: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  decrease: () => {
    set((state) =>
      state.count === 0 ? { count: 0 } : { count: state.count - 1 },
    );
  },
  reset: () => {
    set({ count: 0 });
  },
}));
