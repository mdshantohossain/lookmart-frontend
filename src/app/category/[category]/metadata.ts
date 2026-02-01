import getCategoryProduct from "@/lib/api/get-category-products";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const { category: cat } = await (getCategoryProduct(category)) || {
    category: { name: "", slug: "" },
  };

  return {
    title: `${cat.name} Products`,
    description: `Shop ${cat.name} Products`,

    alternates: {
      canonical: `/category/${cat.slug}`,
    },

    openGraph: {
      title: `${cat.name} `,
      description: `Browse ${cat.name} Products`,
      url: `/category/${cat.slug}`,
      type: "website",
    },
  };
}
