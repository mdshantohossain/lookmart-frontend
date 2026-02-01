import { API_URL } from "@/config/env";
import { CategoryType, ProductType, SubCategoryType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CategoryWithRelations = CategoryType & {
  sub_categories: SubCategoryType[];
  products: ProductType[];
};

export const getCategories = () => {
  return useQuery<CategoryWithRelations[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/categories");
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
