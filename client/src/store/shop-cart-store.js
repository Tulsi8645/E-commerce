import { create } from "zustand";
import { shopCartAPI } from "@/api/api";

export const useShopCartStore = create((set) => ({
  isLoading: false,
  cartItems: [],

  addToCart: async ({ userId, productId, quantity }) => {
    set({ isLoading: true });
    try {
      const response = await shopCartAPI.add(userId, productId, quantity);
      set({ isLoading: false, cartItems: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, cartItems: [] });
      return { payload: error.response?.data };
    }
  },

  fetchCartItems: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await shopCartAPI.get(userId);
      set({ isLoading: false, cartItems: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, cartItems: [] });
      return { payload: error.response?.data };
    }
  },

  deleteCartItem: async ({ userId, productId }) => {
    set({ isLoading: true });
    try {
      const response = await shopCartAPI.delete(userId, productId);
      set({ isLoading: false, cartItems: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, cartItems: [] });
      return { payload: error.response?.data };
    }
  },

  updateCartQuantity: async ({ userId, productId, quantity }) => {
    set({ isLoading: true });
    try {
      const response = await shopCartAPI.update(userId, productId, quantity);
      set({ isLoading: false, cartItems: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, cartItems: [] });
      return { payload: error.response?.data };
    }
  },
}));
