import { API_URL } from "@/config/api";
import { UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type SocialLoginResponse = {
  success: boolean;
  data: {
    user: UserType;
    token: string;
  };
};

export const useSocialLoginMutation = () => {
  return useMutation<SocialLoginResponse, AxiosError, { provider: string; token: string }>({
    mutationKey: ["social-login"],
    mutationFn: async (values) => {
      const { data } = await axios.post(API_URL + "/auth/social-login", values);
      return data;
    },
  });
};
