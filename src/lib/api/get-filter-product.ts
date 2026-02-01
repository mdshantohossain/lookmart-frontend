import { API_URL } from "@/config/env";
import { FilterType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getFilterProduct = (filters: FilterType, page: number) => {
  return useQuery({
    queryKey: ["filter-product", filters],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/filter-products`, {
        params: {
          categories: filters.categories.join(","),
          brands: filters.brands.join(","),
          sizes: filters.sizes.join(","),
          min_price: filters.price[0],
          max_price: filters.price[1],
          page // for pagination
        },
      });

      console.log(data.data);

      return data.data;
    },
    // staleTime: 1000 * 60 * 2,
    enabled: false,
  });
};
