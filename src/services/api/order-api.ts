import api from "@/config/axios-config";
import { API_URL } from "@/config/env";
import { useAppSelector } from "@/features/hooks";
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
export const useGetOrders = () => {
  const { user } = useAppSelector((state) => state.auth);
  return useMutation({
    mutationKey: ["orders", "list"],
    mutationFn: async () => {
      const res = await api.get(`${API_URL}/orders/${user?.id}`);

     console.log('addresse res', res.data);
      return res.data;
    },
  });
}


