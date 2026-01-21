"use client";

import { useRef, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";
import useCategoryProduct from "@/hooks/api/useCategoryProduct";
import { useSearchProducts } from "@/hooks/api/useSearchProducts";
import FilterSidebar from "@/components/page/product/FilterSidebar";
import Pagination from "@/components/page/product/Pagination";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";
import { ProductType } from "@/types";
import EmptyContent from "@/components/EmptyContent";
import EmptyProduct from "@/assets/images/search.png";
import useSubCategoryProduct from "@/hooks/api/useSubCategoryProduct";


export default function ProductsContent() {
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPageItems: number = 4;
  const mainRef = useRef<HTMLDivElement>(null);

  // hooks
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("sub-category");
  const query = searchParams.get("query");

  // get category product
  const { data: categoryProducts, isLoading: categoryProductsLoading } =
    useCategoryProduct({ slug: category, enabled: !!category });

    // get sub-category product
  const { data: subCategoryProducts, isLoading: subCategoryProductsLoading } =
    useSubCategoryProduct({ slug: subCategory, enabled: !!subCategory });

    // get search product 
  const { data: searchProducts, isLoading: searchProductsLoading } =
    useSearchProducts({ query, category });

    // showable products
  const products =
    categoryProducts || searchProducts || subCategoryProducts || [];

  // pagination calculations
  const totalPages = Math.ceil(products.length / perPageItems);
  const startIndex = (currentPage - 1) * perPageItems;
  const currentProducts = products?.slice(
    startIndex,
    startIndex + perPageItems
  );

  // handle page change
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // handle category change
  const onCategoryChange = (category: string[] | string): void => {
    console.log(category);
  };

  // handle brand change
  const onBrandChange = (brand: string[] | string): void => {
    console.log(brand);
  };

  // handle size change
  const onSizeChange = (size: string[] | string): void => {
    console.log(size);
  };

  // product shorting
  const productShorting = (value: string) => {
    setSortBy(value);
    switch (value) {
      case "default":
        return products.sort((a: ProductType, b: ProductType) => b.id - a.id);
      case "price-low":
        return products.sort(
          (a: ProductType, b: ProductType) => a.selling_price - b.selling_price
        );
      case "price-high":
        return products.sort(
          (a: ProductType, b: ProductType) => b.selling_price - a.selling_price
        );
      // case "rating":
      //   return products.sort((a, b) => b.reviews.rating - a.reviews.rating);
      case "newest":
        return products.sort(
          (a: ProductType, b: ProductType) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return products;
    }
  };

  // show loading skeleton if loading
  if (
    categoryProductsLoading ||
    searchProductsLoading ||
    subCategoryProductsLoading
  ) {
    return <ProductsSkeleton />;
  }

  const renderContent =
    products.length === 0 ? (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyContent
          title="No Products Found"
          message="Try adjusting your search or filter settings."
          image={EmptyProduct}
          buttonText="Go Back"
          href="/"
        />
      </div>
    ) : (
      <>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-lg font-bold text-gray-900">
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div>
                  <FilterSidebar
                    onCategoryChange={onCategoryChange}
                    onBrandChange={onBrandChange}
                    onSizeChange={onSizeChange}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + perPageItems} of {products.length} products
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={productShorting}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default sorting</SelectItem>
                <SelectItem value="price-low"> Price: Low to High</SelectItem>
                <SelectItem value="price-high"> Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`}
        >
          {currentProducts.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
          ))}
        </div>

        {/* Pagination */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );

  return (
    <div className="min-h-screen bg-background" ref={mainRef}>
      {/* Header */}

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground">
          <span>Home</span> <span className="mx-2">›</span>{" "}
          <span>Products</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              onCategoryChange={onCategoryChange}
              onBrandChange={onBrandChange}
              onSizeChange={onSizeChange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">{renderContent}</main>
        </div>
      </div>
    </div>
  );
}
