import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { user } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    } else {
      // Gets token from localStorage if user is null (refresh case)
      const storedToken = localStorage.getItem('token');
      if (storedToken) setToken(storedToken);
    }
  }, [user]);

  const request = async (resource, options = {}) => {
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(API + resource, {
      ...options,
      headers,
    });

    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : undefined;
    if (!response.ok) throw Error(result?.message ?? "Something went wrong :(");
    return result;
  };


  return <ApiContext.Provider value={{ request, /*...*/ }}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
