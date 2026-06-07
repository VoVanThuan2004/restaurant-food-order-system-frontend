import { create } from "zustand";
import { getOrderTotalItemsApi } from "../services/order.api";

interface TotalItemsState {
  totalItems: number;
  addToOrder: () => void;
  decreaseItem: () => void;
  setTotalItems: (total: number) => void;
  fetchTotalItems: (orderId: string | null) => Promise<void>;
}

export const useTotalItemsStore = create<TotalItemsState>((set) => ({
  totalItems: 0,

  setTotalItems: (total) => {
    set({ totalItems: total });
  },

  addToOrder: () => {
    set((state) => ({ totalItems: state.totalItems + 1 }));
  },

  decreaseItem: () => {
    set((state) => ({ totalItems: state.totalItems - 1}))
  },

  fetchTotalItems: async (orderId: string | null) => {
    if (orderId === null) return;
    try {
      const res = await getOrderTotalItemsApi(orderId);

      set({
        totalItems: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));