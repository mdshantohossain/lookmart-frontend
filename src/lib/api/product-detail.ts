import { API_URL } from "@/config/api";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type ProductDetailsResponse = {
  product: ProductType;
  relatedProducts: ProductType[];
};

export const getProductDetail = async (slug: string) => {
  const { data } = await axios.get(`${API_URL}/product-details/${slug}`);
  return data.data;
};
