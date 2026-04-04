import api from "@/config/axios-config";
import { API_URL } from "@/config/env";
import { useAppSelector } from "@/features/hooks";
import { CheckoutPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type OrderPayloadType = CheckoutPayload & {
  order_total: number;
  products: {
    product_id: number;
    variant_id: number;
    quantity: number;
  }[];
};

// place order
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

// get user orders
export const useOrders = () => {
  return useQuery({
    queryKey: ["total-orders"],
    queryFn: async () => {
      const { data } = await api.get(`${API_URL}/orders`);

      return data.data;
    },
  });
};
