import { create } from "zustand";
import { adminProductAPI } from "@/api/api";

export const useAdminProductsStore = create((set) => ({
  isLoading: false,
  productList: [],

  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await adminProductAPI.getAll();
      set({ isLoading: false, productList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, productList: [] });
      return { payload: error.response?.data };
    }
  },

  addNewProduct: async (formData) => {
    try {
      const response = await adminProductAPI.add(formData);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },

  editProduct: async ({ id, formData }) => {
    try {
      const response = await adminProductAPI.edit(id, formData);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await adminProductAPI.delete(id);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },
}));
