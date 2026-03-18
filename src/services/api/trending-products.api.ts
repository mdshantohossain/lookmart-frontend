import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function getTrendingProducts() {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await fetch(API_URL + "/trending-products", {
        next: {
          revalidate: 7200,
        }
      });

      const { data } = await res.json();
      
      return data;
    },
  });
}
