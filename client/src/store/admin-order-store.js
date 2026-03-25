import { create } from "zustand";
import { adminOrderAPI } from "@/api/api";

export const useAdminOrderStore = create((set) => ({
  isLoading: false,
  orderList: [],
  orderDetails: null,

  resetOrderDetails: () => set({ orderDetails: null }),

  getAllOrdersForAdmin: async () => {
    set({ isLoading: true });
    try {
      const response = await adminOrderAPI.getAll();
      set({ isLoading: false, orderList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, orderList: [] });
      return { payload: error.response?.data };
    }
  },

  getOrderDetailsForAdmin: async (id) => {
    set({ isLoading: true });
    try {
      const response = await adminOrderAPI.getDetails(id);
      set({ isLoading: false, orderDetails: response.data?.data || null });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, orderDetails: null });
      return { payload: error.response?.data };
    }
  },

  updateOrderStatus: async ({ id, orderStatus }) => {
    try {
      const response = await adminOrderAPI.updateStatus(id, orderStatus);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },
}));
