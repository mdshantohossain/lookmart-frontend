"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import images from "@/utils/images";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_CLIENT_ID } from "@/config/env";
import { useSocialLoginMutation } from "@/services/api/social-login.api";
import { useRouter } from "next/navigation";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginResponse, UserType } from "@/types";
import { AxiosError } from "axios";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function SocialAuthentication() {
  const { mutateAsync } = useSocialLoginMutation();
  const { authLogin } = useAuth();
  const router = useRouter();
  const { isFromModal, setIsAuthModalOpen, resetContextState } =
    useAuthContext();

  const successJob = (user: UserType, token: string) => {
    // set auth state
    authLogin(user, token);

    // reset auth context state
    resetContextState();

    if (isFromModal) {
      setIsAuthModalOpen(false);
    } else {
      router.back();
    }
  };

  // Google login handler
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      mutateAsync(
        { provider: "google", token: tokenResponse.access_token },
        {
          onSuccess: (res: SocialLoginResponse) => {
            if (res.success) {
              successJob(res.data.user, res.data.token);
            }
          },
          onError: (err: AxiosError) =>
            console.error("Facebook login failed:", err),
        },
      );
    },
  });

  // Facebook login handler
  const handleFacebookResponse = async (
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ): Promise<void> => {
    if ("accessToken" in userInfo) {
      const accessToken = userInfo.accessToken;
      mutateAsync(
        { provider: "facebook", token: accessToken },
        {
          onSuccess: (res: SocialLoginResponse) => {
            if (res.success) {
              successJob(res.data.user, res.data.token);
            }
          },
          onError: (err: AxiosError) =>
            console.error("Facebook login failed:", err),
        },
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Facebook Button */}
      <FacebookLogin
        appId={FACEBOOK_CLIENT_ID!}
        callback={handleFacebookResponse}
        render={(renderProps: { onClick: () => void }) => (
          <Button
            variant="outline"
            className="border-blue-600 hover:bg-blue-200 flex items-center gap-2 hover:cursor-pointer"
            onClick={renderProps.onClick}>
            <Image
              src={images.facebook}
              alt="Facebook"
              width={20}
              height={20}
            />
            <span className="text-[16px] font-semibold text-blue-500">
              Facebook
            </span>
          </Button>
        )}
      />

      {/* Google Button */}
      <Button
        variant="outline"
        className="border-gray-400 hover:bg-gray-100 flex items-center gap-2 hover:cursor-pointer"
        onClick={() => loginWithGoogle()}>
        <Image src={images.google} alt="Google" width={20} height={20} />
        <span className="text-[16px] font-semibold text-orange">Google</span>
      </Button>
    </div>
  );
}
