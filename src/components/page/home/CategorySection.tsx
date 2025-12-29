"use client";

import TopCategorySkeleton from "@/components/skeleton/TopCategorySkeleton";
import { useCategories } from "@/hooks/api/useCategories";
import { CategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CategorySection() {
  const { data: categories = [] as CategoryType[], isLoading } =
    useCategories();

  if (!isLoading && categories.length === 0) {
    return null;
  }

  return (
    <div className="py-12 px-4 bg-card rounded-lg">
      {/* Title */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get the best deals across our most popular categories. Quality
          products, trusted brands, and effortless shopping all in one place.
        </p>
      </div>

      {/* Grid Category Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {isLoading
          ? Array.from({ length: 12 }, (_, i) => (
              <TopCategorySkeleton key={i} />
            ))
          : categories.map((category, i) => (
              <Link
                href={{
                  pathname: "/products",
                  query: { category: category.slug },
                }}
                key={i}
                className="group"
              >
                <div className="rounded-xl border shadow-sm flex flex-col items-center justify-center p-4 hover:shadow-md transition-all text-center h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={50}
                    height={50}
                    className="object-contain mb-2"
                  />
                  <span className="text-foreground font-medium text-md truncate">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
