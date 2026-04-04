import { AuthProvider } from "@/context/AuthModalContext";
import { PropsWithChildren } from "react";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};
