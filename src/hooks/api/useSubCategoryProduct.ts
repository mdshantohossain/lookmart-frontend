import { API_URL } from "@/config/env";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSubCategoryProduct({
  slug,
  enabled,
}: {
  slug: string | null;
  enabled: boolean;
}) {
  return useQuery<ProductType[], Error>({
    queryKey: ["sub-category-products", slug],
    queryFn: async () => {
      const { data } = await axios.get(
        API_URL + "/sub-category-products?query=" + slug,
      );
      return data.data;
    },
    enabled: !!slug && enabled,
  });
}
