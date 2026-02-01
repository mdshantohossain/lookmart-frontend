import { API_URL } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useOrderPlace = () => {
  return useMutation({
    mutationKey: ["order-submit"],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/place-order`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
  });
};
