import { createContext, useContext, useState, useCallback } from "react";
import Loader from "../components/ui/Loader";

const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  // ⭐ Senior Pattern
  const withLoader = useCallback(async (asyncFn) => {
    try {
      showLoader();
      return await asyncFn();
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, withLoader }}>
      {children}
      {loading && <Loader fullScreen />}
    </LoaderContext.Provider>
  );
};

export const useGlobalLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useGlobalLoader must be used within LoaderProvider");
  }

  return context;
};
