"use client";
import Product from "@/components/Product";
import { ProductType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function RelatedProducts({products}: {products: ProductType[]}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="relative">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Products</h2>

      <div className="relative group">
        <div
          id="related-products-scroll"
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
        >
          {products.map((relatedProduct: ProductType) => (
            <div key={relatedProduct.id} className="flex-shrink-0 w-52 sm:w-65">
              <Product product={relatedProduct} />
            </div>
          ))}
        </div>

        {/* Scroll buttons - hidden on mobile */}
        {products.length > 2 && (
          <>
            <button
              onClick={() => {
                document
                  .getElementById("related-products-scroll")
                  ?.scrollBy({ left: -250, behavior: "smooth" });
              }}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow-md border p-2 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("related-products-scroll")
                  ?.scrollBy({ left: 250, behavior: "smooth" });
              }}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow-md border p-2 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
