import { API_URL } from "@/config/env";
import { ProductType } from "@/types";

export type ProductDetailsResponse = {
  product: ProductType;
  relatedProducts: ProductType[];
};

export const getProductDetail = async (slug: string) => {
  const res = await fetch(`${API_URL}/product-details/${slug}`, {
    next: {
      revalidate: 600,
    },
  });
  const { data } = await res.json();

  return data;
};

export const getRelatedProduct = async (slug: string) => {
  const res = await fetch(`${API_URL}/related-products/${slug}`, {
    next: {
      revalidate: 1800,
    },
  });
  const { data } = await res.json();
  
  return data;
};
