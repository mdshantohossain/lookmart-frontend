import { API_URL } from "@/config/env";

export default async function getCategoryProduct(slug: string) {
  const res = await fetch(`${API_URL}/category-products?query=${slug}`, {
    next: {
      revalidate: 144000,
    },
  });

  if (!res.ok) return null;

  const { data, category } = await res.json();

  return { products: data, category: category };
}
