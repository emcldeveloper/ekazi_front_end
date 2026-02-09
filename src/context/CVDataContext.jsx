import { createContext, useContext } from "react";
import { useCVBuilder } from "../hooks/useCv";

const CVDataContext = createContext(null);

export function CVDataProvider({ children }) {
  const applicantId = localStorage.getItem("applicantId");

  const query = useCVBuilder(applicantId);

  return (
    <CVDataContext.Provider value={query}>{children}</CVDataContext.Provider>
  );
}

export function useCVData() {
  const ctx = useContext(CVDataContext);
  if (!ctx) {
    throw new Error("useCVData must be used inside CVDataProvider");
  }
  return ctx;
}
