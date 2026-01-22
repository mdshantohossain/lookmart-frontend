import { API_URL } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosHeaders } from "axios";

export const useCreateWishlist = () => {
  return useMutation({
    mutationKey: ["create-wishlist"],
    mutationFn: async ({
      user_id,
      product_id,
      token,
    }: {
      user_id: number;
      product_id: number;
      token: AxiosHeaders;
    }) => {
      const { data } = await axios.post(
        API_URL + "/wishlist-add",
        {
          user_id,
          product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(data);

      return data.data;
    },
  });
};

export const useRemoveWishlist = () => {
  return useMutation({
    mutationKey: ["remove-wishlist"],
    mutationFn: async ({ token, id }: { token: string; id: number }) => {
      const { data } = await axios.post(API_URL + "/wishlist-remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
  });
};
