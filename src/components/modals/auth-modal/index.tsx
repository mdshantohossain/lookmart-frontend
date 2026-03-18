"use client";

import LoginContent from "@/app/(auth)/login/LoginContent";
import RegisterContent from "@/app/(auth)/register/RegisterContent";
import { useAuthModalContext } from "@/hooks/useAuthModalContext";
import { X } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setIsFromModal, whichModal } =
    useAuthModalContext();

  if (!isAuthModalOpen) return null;

  const renderContent =
    whichModal === "login" ? <LoginContent /> : <RegisterContent />;

  const onClose = () => {
    setIsAuthModalOpen(false);
    setIsFromModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-card rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer hover:text-red-500">
          <X />
        </button>
        {renderContent}
      </div>
    </div>
  );
}
