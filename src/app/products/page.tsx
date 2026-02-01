import { Suspense } from "react";
import ProductsContent from "@/components/ProductsContent";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <h1>Hello Product Page</h1>?
      {/* <ProductsContent /> */}
    </Suspense>
  );
}