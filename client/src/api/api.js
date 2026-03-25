import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// --- Auth APIs ---
export const authAPI = {
  register: (formData) => API.post("/auth/register", formData),
  login: (formData) => API.post("/auth/login", formData),
  logout: () => API.post("/auth/logout", {}),
  checkAuth: () =>
    API.get("/auth/check-auth", {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }),
};

// --- Admin Product APIs ---
export const adminProductAPI = {
  add: (formData) =>
    API.post("/admin/products/add", formData, {
      headers: { "Content-Type": "application/json" },
    }),
  getAll: () => API.get("/admin/products/get"),
  edit: (id, formData) =>
    API.put(`/admin/products/edit/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
    }),
  delete: (id) => API.delete(`/admin/products/delete/${id}`),
};

// --- Admin Order APIs ---
export const adminOrderAPI = {
  getAll: () => API.get("/admin/orders/get"),
  getDetails: (id) => API.get(`/admin/orders/details/${id}`),
  updateStatus: (id, orderStatus) =>
    API.put(`/admin/orders/update/${id}`, { orderStatus }),
};

// --- Shop Product APIs ---
export const shopProductAPI = {
  getAllFiltered: (filterParams, sortParams) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    return API.get(`/shop/products/get?${query}`);
  },
  getDetails: (id) => API.get(`/shop/products/get/${id}`),
};

// --- Shop Cart APIs ---
export const shopCartAPI = {
  add: (userId, productId, quantity) =>
    API.post("/shop/cart/add", { userId, productId, quantity }),
  get: (userId) => API.get(`/shop/cart/get/${userId}`),
  delete: (userId, productId) =>
    API.delete(`/shop/cart/${userId}/${productId}`),
  update: (userId, productId, quantity) =>
    API.put("/shop/cart/update-cart", { userId, productId, quantity }),
};

// --- Shop Address APIs ---
export const shopAddressAPI = {
  add: (formData) => API.post("/shop/address/add", formData),
  getAll: (userId) => API.get(`/shop/address/get/${userId}`),
  edit: (userId, addressId, formData) =>
    API.put(`/shop/address/update/${userId}/${addressId}`, formData),
  delete: (userId, addressId) =>
    API.delete(`/shop/address/delete/${userId}/${addressId}`),
};

// --- Shop Order APIs ---
export const shopOrderAPI = {
  create: (orderData) => API.post("/shop/order/create", orderData),
  createCod: (orderData) => API.post("/shop/order/create-cod", orderData),
  capture: (paymentId, payerId, orderId) =>
    API.post("/shop/order/capture", { paymentId, payerId, orderId }),
  getAllByUser: (userId) => API.get(`/shop/order/list/${userId}`),
  getDetails: (id) => API.get(`/shop/order/details/${id}`),
};

// --- Shop Search APIs ---
export const shopSearchAPI = {
  search: (keyword) => API.get(`/shop/search/${keyword}`),
};

// --- Shop Review APIs ---
export const shopReviewAPI = {
  add: (formData) => API.post("/shop/review/add", formData),
  get: (id) => API.get(`/shop/review/${id}`),
};

// --- Common Feature APIs ---
export const commonAPI = {
  getFeatureImages: () => API.get("/shop/feature/get"),
  addFeatureImage: (image) => API.post("/shop/feature/add", { image }),
};
