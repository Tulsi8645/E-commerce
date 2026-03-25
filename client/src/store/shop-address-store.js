import { create } from "zustand";
import { shopAddressAPI } from "@/api/api";

export const useShopAddressStore = create((set) => ({
  isLoading: false,
  addressList: [],

  addNewAddress: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await shopAddressAPI.add(formData);
      set({ isLoading: false });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false });
      return { payload: error.response?.data };
    }
  },

  fetchAllAddresses: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await shopAddressAPI.getAll(userId);
      set({ isLoading: false, addressList: response.data?.data || [] });
      return { payload: response.data };
    } catch (error) {
      set({ isLoading: false, addressList: [] });
      return { payload: error.response?.data };
    }
  },

  editaAddress: async ({ userId, addressId, formData }) => {
    try {
      const response = await shopAddressAPI.edit(userId, addressId, formData);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },

  deleteAddress: async ({ userId, addressId }) => {
    try {
      const response = await shopAddressAPI.delete(userId, addressId);
      return { payload: response.data };
    } catch (error) {
      return { payload: error.response?.data };
    }
  },
}));
