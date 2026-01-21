import { API_URL } from "@/config/api";
import api from "@/config/axios-config";
import {
  LoginValuesType,
  RegisterValuesType,
  ResetPasswordType,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// login
export function loginUserMutation() {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (data: LoginValuesType) => {
      const response = await axios.post(`${API_URL}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
}

// auth logout
export const logoutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async (token: string) => {
      const response = await api.post(`${API_URL}/auth/logout`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};

// register
export function registerUserMutation() {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (data: RegisterValuesType) => {
      const response = await axios.post(`${API_URL}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
}

// verify email
export function useVerifyEmail(token: string) {
  return useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/auth/verify-email?token=${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
    refetchOnWindowFocus: false, // disable refetch on tab focus
    refetchOnReconnect: false,
    enabled: !!token,
  });
}

// resend verification email
export function useResendVerificationEmail() {
  return useMutation({
    mutationKey: ["resendVerificationEmail"],
    mutationFn: async (token: string) => {
      const response = await axios.get(
        `${API_URL}/auth/resend-verification-email?token=${token}`,
      );
      return response.data;
    },
  });
}

// reset password
export function forgotPasswordMutation() {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (data: ResetPasswordType) => {
      const response = await axios.get(
        `${API_URL}/auth/forgot-password?email=${data.email}`,
      );
      return response.data;
    },
  });
}

// reset password
export function resetPasswordMutation() {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (data: {
      password: string;
      confirm_password: string;
      token: string;
    }) => {
      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
  });
}
