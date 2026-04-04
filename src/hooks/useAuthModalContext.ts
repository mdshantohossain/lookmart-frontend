import { useContext } from "react";

import { AuthModalContext } from "@/context/AuthModalContext";

export const useAuthModalContext = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
