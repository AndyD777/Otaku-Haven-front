import { createContext, useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { user } = useAuth();

  const request = async (resource, options = {}) => {
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (user?.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
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

  const [tags, setTags] = useState({});

  const provideTag = (tag, query) => {
    setTags((current) => ({ ...current, [tag]: query }));
  };

  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
