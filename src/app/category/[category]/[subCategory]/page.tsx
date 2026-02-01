import { Suspense } from "react";
import ProductsContent from "@/components/ProductsContent";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";
import EmptyContent from "@/components/EmptyContent";
import images from "@/utils/images";
import { generateMetadata } from "./metadata";
import getSubCategoryProduct from "@/lib/api/get-sub-category-products";
import { API_URL } from "@/config/env";
import { CategoryType, SubCategoryType } from "@/types";

// metadata 
export { generateMetadata };

export const revalidate = 144000;
export const dynamicParams = true;

// static params
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/categories`, {
    next: {
      revalidate: 7200,
    },
  });
  
  const categories = await res.json();

  return categories.flatMap((category: CategoryType) =>
    category.sub_categories.map((sub: SubCategoryType) => ({
      category: category.slug,
      subCategory: sub.slug,
    }))
  );
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subCategory: string }>;
}) {
  const { subCategory } = await params;

  // get category product
  const { products } = await getSubCategoryProduct(subCategory) || { products: []};

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
