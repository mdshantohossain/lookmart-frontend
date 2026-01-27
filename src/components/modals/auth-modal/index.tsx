"use client";

import LoginContent from "@/app/(auth)/login/LoginContent";
import RegisterContent from "@/app/(auth)/register/RegisterContent";
import { useState } from "react";

export default function AuthModal() {
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
