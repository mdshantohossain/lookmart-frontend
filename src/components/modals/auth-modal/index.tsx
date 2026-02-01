"use client";

import LoginContent from "@/app/(auth)/login/LoginContent";
import RegisterContent from "@/app/(auth)/register/RegisterContent";
import { useState } from "react";

interface Props {
  onCloseModal?: () => void;
}
export default function AuthModal({onCloseModal}: Props) {
  const [modalWhich, setModalWhich] = useState("login");

  const handlePressOnSignUpOrSignIn = () => {
    setModalWhich(modalWhich === "login" ? "register" : "login");
  };

  const handleLogin = () => {
    setModalWhich("login");
  };

  const renderContent =
    modalWhich === "login" ? (
      <LoginContent
        onPressSignUp={handlePressOnSignUpOrSignIn}
        fromModal={true}
        onCloseModal={onCloseModal}
      />
    ) : (
      <RegisterContent
        onPressSignUp={handlePressOnSignUpOrSignIn}
        fromModal={true}
        handleLogin={handleLogin}
      />
    );

  return renderContent;
}
