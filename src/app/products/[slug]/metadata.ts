import type { Metadata } from "next";
import { APP_URL } from "@/config/env";
import { getProductDetail } from "@/lib/api/product-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const { product } = await getProductDetail(slug);

  if (!product) return;

  return {
    title: `${product.name} | Buy Online`,
    description: product.short_description || `Buy ${product.name} online`,
    keywords: product.meta_keywords?.split(',') || [],
    alternates: {
      canonical: `${APP_URL}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Buy Online`,
      description: product.short_description,
      images: product.image_thumbnail ? [product.image_thumbnail] : [],
      url: `${APP_URL}/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.short_description,
      images: product.image_thumbnail ? [product.image_thumbnail] : [],
    },
  };
}
