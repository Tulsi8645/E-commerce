import { create } from "zustand";
import { shopProductAPI } from "@/api/api";

export const useShopProductsStore = create((set) => ({
  isLoading: false,
  productList: [],
  productDetails: null,

  setProductDetails: () => set({ productDetails: null }),

  fetchAllFilteredProducts: async ({ filterParams, sortParams }) => {
    set({ isLoading: true });
    try {
      const response = await shopProductAPI.getAllFiltered(filterParams, sortParams);
      set({ isLoading: false, productList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, productList: [] });
      return { payload: error.response?.data };
    }
  },

  fetchProductDetails: async (id) => {
    set({ isLoading: true });
    try {
      const response = await shopProductAPI.getDetails(id);
      set({ isLoading: false, productDetails: response.data?.data || null });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, productDetails: null });
      return { payload: error.response?.data };
    }
  },
}));
