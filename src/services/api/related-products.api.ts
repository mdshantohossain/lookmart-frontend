
import { API_URL } from "@/config/env";

export const getRelatedProduct = async (slug: string) => {
  const res = await fetch(`${API_URL}/related-products/${slug}`, {
    next: {
      revalidate: 1800,
    },
  });
  const { data } = await res.json();
  
  return data;
};