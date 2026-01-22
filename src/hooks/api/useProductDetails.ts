import { API_URL } from "@/config/env";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type ProductDetailsResponse = {
  product: ProductType;
  relatedProducts: ProductType[];
};

export const useProductDetails = (slug: string) => {
  return useQuery<ProductDetailsResponse>({
    queryKey: ["product-details", slug],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/product-details/" + slug);
      return data.data;
    },
  });
};
