import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";

export default function getExclusiveProducts() {
  return useQuery({
    queryKey: ["exclusive-products"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/exclusive-products");
      return response.json();
    },
  });
}
