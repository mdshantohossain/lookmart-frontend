import { API_URL } from "@/config/env";
import api from "@/config/axios-config";
import { AddressType } from "@/types";
import { useMutation } from "@tanstack/react-query";

// add address
export const useSaveAddressMutaion = () => {
  return useMutation({
    mutationKey: ["save-address"],
    mutationFn: async (values: AddressType & { user_id: number }) => {
      const res = await api.post(`${API_URL}/save-address`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },
  });
};

// update address
export const useUpdateAddressMutaion = () => {
  return useMutation({
    mutationKey: ["update-address"],
    mutationFn: async (values: AddressType) => {
      const res = await api.post(`${API_URL}/update-address`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },
  });
};

// delete address
export const useDeleteAddress = () => {
  return useMutation({
    mutationKey: ["delete-address"],
    mutationFn: async (id: number) => {
      const res = await api.get(`${API_URL}/delete-address/${id}`);
      return res.data;
    },
  });
};
