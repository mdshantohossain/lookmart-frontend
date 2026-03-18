import api from "@/config/axios-config";
import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";

export const useVerifyOrder = (token: string) => {
  return useQuery({
    queryKey: ["verify-order"],
    queryFn: async () => {
      const response = await api.get(`${API_URL}/verify-order/${token}`);

      return await response.data;
    },
    enabled: !!token,
  });
};
