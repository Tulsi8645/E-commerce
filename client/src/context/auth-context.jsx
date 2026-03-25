import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "@/api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registerUser = async (formData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(formData);
      setIsLoading(false);
      return { payload: response.data };
    } catch (error) {
      setIsLoading(false);
      return { payload: error.response?.data || { success: false, message: "Error" } };
    }
  };

  const loginUser = async (formData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(formData);
      const data = response.data;
      
      setUser(data.success ? data.user : null);
      setIsAuthenticated(data.success);
      setIsLoading(false);
      
      return { payload: data };
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      return { payload: error.response?.data || { success: false, message: "Error" } };
    }
  };

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.logout();
      
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      return { payload: response.data };
    } catch (error) {
      setIsLoading(false);
      return { payload: error.response?.data || { success: false, message: "Error" } };
    }
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.checkAuth();
      const data = response.data;
      
      setUser(data.success ? data.user : null);
      setIsAuthenticated(data.success);
      setIsLoading(false);
      
      return { payload: data };
    } catch (error) {
      setIsLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      return { payload: error.response?.data || { success: false, message: "Error" } };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        registerUser,
        loginUser,
        logoutUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
