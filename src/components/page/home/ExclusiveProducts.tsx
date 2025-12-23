"use client";
import Product from "@/components/Product";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import useExclusiveProducts from "@/hooks/api/useExclusiveProducts";
import { ProductType } from "@/types";

export default function ExclusiveProducts() {
  const { data: products = [], isLoading } = useExclusiveProducts();

  if (!isLoading && products?.length === 0) return null;

  return (
    <section className="py-12 bg-background">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Exclusive Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our exclusive selection featuring premium, limited-edition
            items you won’t find anywhere else. Carefully curated for quality,
            uniqueness, and exceptional value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {isLoading ? (
            Array.from({ length: 12 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            <>
              {products?.map((product: ProductType) => (
                <Product key={product.id} product={product} />
              ))}
            </>
          )}
        </div>
    </section>
  );
}
