import { create } from "zustand";
import { commonAPI } from "@/api/api";

export const useCommonStore = create((set) => ({
  isLoading: false,
  featureImageList: [],

  getFeatureImages: async () => {
    set({ isLoading: true });
    try {
      const response = await commonAPI.getFeatureImages();
      set({ isLoading: false, featureImageList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, featureImageList: [] });
      return { payload: error.response?.data };
    }
  },

  addFeatureImage: async (image) => {
    try {
      const response = await commonAPI.addFeatureImage(image);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },
}));
