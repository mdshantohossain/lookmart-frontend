import type React from "react";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/lib/api/product-detail";
import ProductDetail from "./ProductDetail";
import { generateMetadata } from "./metadata";

// exported dynamically metadata
export { generateMetadata };

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // if slug not found
  if (!slug) return notFound();

  const data = await getProductDetail(slug as string);

  const product = data?.product;
  const relatedProducts = data?.relatedProducts ?? [];

  if (!product) return notFound();

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
