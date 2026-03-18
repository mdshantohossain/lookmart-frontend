import { API_URL } from "@/config/env";

export default async function getSubCategoryProduct(slug: string) {
  const res = await fetch(`${API_URL}/sub-category-products?query=${slug}`, {
    next: {
      revalidate: 144000,
    },
  });

  if (!res.ok) return null;

  const { data, category, subCategory } = await res.json();

  return { products: data, category, subCat: subCategory };
}
