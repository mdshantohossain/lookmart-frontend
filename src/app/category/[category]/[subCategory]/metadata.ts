import getSubCategoryProduct from "@/lib/api/get-sub-category-products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subCategory: string }>;
}) {
  const { category, subCategory } = await params;

  // get category product
  const { subCat, category: cat } = (await getSubCategoryProduct(subCategory)) || {subCat: { name: "", slug: "" },
  };

  return {
    title: `${subCat.name} for ${cat.name}`,
    description: `Shop ${subCat.name} under ${cat.name} category.`,
    alternates: {
      canonical: `/category/${category}/${subCategory}`,
    },
    openGraph: {
      title: `${subCat.name} for ${category}`,
      description: `Browse ${subCat.name} products`,
      url: `/category/${category}/${subCategory}`,
      type: "website",
    },
  };
}
