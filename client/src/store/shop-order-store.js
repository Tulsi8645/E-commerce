import { create } from "zustand";
import { shopOrderAPI } from "@/api/api";

export const useShopOrderStore = create((set) => ({
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,

  resetOrderDetails: () => set({ orderDetails: null }),

  createNewOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      const response = await shopOrderAPI.create(orderData);
      const data = response.data;
      set({
        isLoading: false,
        approvalURL: data.approvalURL,
        orderId: data.orderId,
      });
      if (data.orderId) {
        sessionStorage.setItem("currentOrderId", JSON.stringify(data.orderId));
      }
      return { payload: data };
    } catch (error) {
      set({ isLoading: false, approvalURL: null, orderId: null });
      return { payload: error.response?.data };
    }
  },

  createCodOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      const response = await shopOrderAPI.createCod(orderData);
      const data = response.data;
      set({
        isLoading: false,
        orderId: data.orderId,
      });
      return { payload: data };
    } catch (error) {
      set({ isLoading: false, orderId: null });
      return { payload: error.response?.data };
    }
  },

  capturePayment: async ({ paymentId, payerId, orderId }) => {
    try {
      const response = await shopOrderAPI.capture(paymentId, payerId, orderId);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },

  getAllOrdersByUserId: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await shopOrderAPI.getAllByUser(userId);
      set({ isLoading: false, orderList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, orderList: [] });
      return { payload: error.response?.data };
    }
  },

  getOrderDetails: async (id) => {
    set({ isLoading: true });
    try {
      const response = await shopOrderAPI.getDetails(id);
      set({ isLoading: false, orderDetails: response.data?.data || null });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, orderDetails: null });
      return { payload: error.response?.data };
    }
  },
}));
