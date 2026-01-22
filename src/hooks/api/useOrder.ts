import { API_URL } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useOrderSubmit = () => {
  return useMutation({
    mutationKey: ["order-submit"],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${API_URL}/place-order`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};
