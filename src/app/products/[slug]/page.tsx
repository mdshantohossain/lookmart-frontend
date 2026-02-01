import type React from "react";
import { notFound } from "next/navigation";
import { getProductDetail, getRelatedProduct } from "@/lib/api/product-detail";
import ProductDetail from "./ProductDetail";
import { generateMetadata } from "./metadata";
import { ProductType } from "@/types";
import { API_URL } from "@/config/env";

// exported dynamically metadata
export { generateMetadata };

export const revalidate = 600;
export const dynamicParams = true;

// static params
export async function generateStaticParams() {
  const products = await fetch(`${API_URL}/products/slugs`, {
    next: {
      revalidate: 12000,
    },
  }).then((res) => res.json());

  return products?.map((p: ProductType) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  // if slug not found
  if (!slug) return notFound();

  const productPromise = getProductDetail(slug as string);
  const relatedProductPromise = getRelatedProduct(slug as string);

  const [product, relatedProducts] = await Promise.all([
    productPromise,
    relatedProductPromise,
  ]);

  if (!product) return notFound();

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
