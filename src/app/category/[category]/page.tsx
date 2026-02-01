import { Suspense } from "react";
import ProductsContent from "@/components/ProductsContent";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";
import getCategoryProduct from "@/lib/api/get-category-products";
import EmptyContent from "@/components/EmptyContent";
import images from "@/utils/images";
import { generateMetadata } from "./metadata";
import { API_URL } from "@/config/env";
import { CategoryType } from "@/types";

// metadata
export { generateMetadata };

export const revalidate = 14000;
export const dynamicParams = true;

// static params
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/categories`, {
    next: {
      revalidate: 7200,
    },
  });

  return (await res.json())?.map((c: CategoryType) => ({
    category: c.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // get category product
  const { products } = (await getCategoryProduct(category)) || { products: [] };

  if (products?.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <EmptyContent
          title="No Products Found"
          message="Try adjusting your search or filter settings."
          image={images.emptyImage}
          buttonText="Go Back"
          href="/"
        />
      </main>
    );
  }
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
