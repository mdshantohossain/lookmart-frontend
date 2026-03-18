"use client";

import React, {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface AuthContextType {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<SetStateAction<boolean>>;
  isFromModal: boolean;
  setIsFromModal: React.Dispatch<SetStateAction<boolean>>;
  whichModal: "login" | "register";
  setWhichModal: React.Dispatch<SetStateAction<"login" | "register">>;
  resetContextState: () => void
}

export const AuthModalContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isFromModal, setIsFromModal] = useState(false);
  const [whichModal, setWhichModal] = useState<"login" | "register">("login");

  const resetContextState = () => {
    setIsAuthModalOpen(false);
    setIsFromModal(false);
    setWhichModal("login");
  }

  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalOpen,
        setIsAuthModalOpen,
        isFromModal,
        setIsFromModal,
        whichModal,
        setWhichModal,
        resetContextState
      }}>
      {children}
    </AuthModalContext.Provider>
  );
};
