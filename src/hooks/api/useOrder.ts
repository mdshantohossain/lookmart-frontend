import { API_URL } from "@/config/env";
import { CheckoutPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type OrderPayloadType = CheckoutPayload & {
  order_total: number;
  products: {
    product_id: number;
    variant_id: number;
    quantity: number;
  }[];
};

export const useOrderPlace = () => {
  return useMutation({
    mutationKey: ["order-submit"],
    mutationFn: async (payload: OrderPayloadType) => {
      const res = await axios.post(`${API_URL}/place-order`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
  });
};
