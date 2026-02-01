"use client";
import Product from "@/components/Product";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import getTrendingProducts from "@/hooks/api/getTrendingProducts";
import { ProductType } from "@/types";

export default function TrendingProducts() {
  const { data: products = [] as ProductType[], isLoading } =
    getTrendingProducts();

  if (!isLoading && products?.length === 0) return null;

  return (
    <section className="py-12 bg-background">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
          Trending Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover what’s hot right now. These trending products are customer
          favorites, updated based on popularity and demand — grab yours before
          they sell out!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6">
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
