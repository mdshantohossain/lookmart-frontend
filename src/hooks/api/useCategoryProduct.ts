import { API_URL } from "@/config/env";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategoryProduct({
  slug,
  enabled,
}: {
  slug: string | null;
  enabled: boolean;
}) {
  return useQuery<ProductType[], Error>({
    queryKey: ["category-products", slug],
    queryFn: async () => {
      const { data } = await axios.get(
        API_URL + "/category-products?query=" + slug,
      );
      return data.data;
    },
    enabled: !!slug && enabled,
  });
}
