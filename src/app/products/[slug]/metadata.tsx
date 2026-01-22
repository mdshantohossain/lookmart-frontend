import { APP_URL } from "@/config/env";
import { getProductDetail } from "@/lib/api/product-detail";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { product } = await getProductDetail(slug as string);
  if (!product) return;

  return {
    title: `${product.name} | Buy Online`,
    description: product.short_description || `Buy ${product.name} online`,
    openGraph: {
      title: product.name,
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
