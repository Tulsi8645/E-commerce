import { create } from "zustand";
import { shopReviewAPI } from "@/api/api";

export const useShopReviewStore = create((set) => ({
  isLoading: false,
  reviews: [],

  addReview: async (formData) => {
    try {
      const response = await shopReviewAPI.add(formData);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },

  getReviews: async (id) => {
    set({ isLoading: true });
    try {
      const response = await shopReviewAPI.get(id);
      set({ isLoading: false, reviews: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, reviews: [] });
      return { payload: error.response?.data };
    }
  },
}));
