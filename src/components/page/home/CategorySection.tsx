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
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Shop by <span className="text-primary">Category</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Explore our wide range of premium products across various categories, 
          handpicked just for your needs.
        </p>
      </div>

      {/* Centered Grid Container */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="w-[140px] md:w-[170px]">
                <TopCategorySkeleton />
              </div>
            ))
          : categories.map((category, i) => (
              <Link
                href={{
                  pathname: "/products",
                  query: { category: category.slug },
                }}
                key={category.slug || i}
                className="group relative flex flex-col items-center w-[150px] md:w-[170px]"
              >
                {/* Image Bubble */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                  {/* Decorative Background Circle */}
                  <div className="absolute inset-0 bg-slate-100 rounded-full transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-110 group-hover:rotate-6" />
                  
                  {/* Actual Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="object-contain rounded-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Count Badge (Unique Element) */}
                  <div className="absolute -top-1 -right-1 shadow-md border border-slate-100 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full text-primary translate-y-2 transition-all duration-300 group-hover:translate-y-0">
                    {/* Placeholder for count - adjust field name as per your API */}
                    {Math.floor(Math.random() * 200) + 50}+ 
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm md:text-base font-bold text-slate-800 group-hover:text-primary transition-colors truncate w-full px-2">
                    {category.name}
                  </h3>
                   
                </div>

                {/* Bottom Indicator Line */}
                <div className="mt-2 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-12" />
              </Link>
            ))}
      </div>
    </section>
  );
}