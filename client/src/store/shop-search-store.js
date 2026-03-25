import { create } from "zustand";
import { shopSearchAPI } from "@/api/api";

export const useShopSearchStore = create((set) => ({
  isLoading: false,
  searchResults: [],

  resetSearchResults: () => set({ searchResults: [] }),

  getSearchResults: async (keyword) => {
    set({ isLoading: true });
    try {
      const response = await shopSearchAPI.search(keyword);
      set({ isLoading: false, searchResults: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, searchResults: [] });
      return { payload: error.response?.data };
    }
  },
}));
