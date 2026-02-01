"use client";

import { useCallback, useRef, useState } from "react";
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
import FilterSidebar from "@/components/page/product/FilterSidebar";
import { FilterType, ProductType } from "@/types";
import EmptyContent from "@/components/EmptyContent";
import EmptyProduct from "@/assets/images/search.png";
import { getFilterProduct } from "@/lib/api/get-filter-product";
import ProductsSkeleton from "./skeleton/ProductsSkeleton";
import Pagination from "./page/product/Pagination";

interface Props {
  products: ProductType[];
}

export default function ProductsContent({ products }: Props) {
  const [sortBy, setSortBy] = useState<string>("default");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterType>({
    categories: [],
    brands: [],
    sizes: [],
    price: [0, 200],
  });

  const {
    data,
    refetch,
    isLoading,
  } = getFilterProduct(filters, page);

  const { productss = [], current_page, last_page } = data || {};

  console.log({ productss, current_page, last_page });

  const onFilterChange = useCallback(
    (newFilters: FilterType) => {
      setFilters(newFilters);
      refetch(); // ✅ manual fetch
    },
    [refetch],
  );

  //
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  // product shorting
  const productShorting = (value: string) => {
    setSortBy(value);
    switch (value) {
      case "default":
        return products.sort((a: ProductType, b: ProductType) => b.id - a.id);
      case "price-low":
        return products.sort(
          (a: ProductType, b: ProductType) => a.selling_price - b.selling_price,
        );
      case "price-high":
        return products.sort(
          (a: ProductType, b: ProductType) => b.selling_price - a.selling_price,
        );
      // case "rating":
      //   return products.sort((a, b) => b.reviews.rating - a.reviews.rating);
      case "newest":
        return products.sort(
          (a: ProductType, b: ProductType) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      default:
        return products;
    }
  };

  const displayProducts = data && data.length > 0 ? data : products;

  if (isLoading) {
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
                  className="lg:hidden bg-transparent">
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
                    onFilterChange={onFilterChange}
                    sizes={["hello", "world"]}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <p className="text-sm text-muted-foreground">
              Showing
              {/* {startIndex + perPageItems} of {products.length} products */}
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
          className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`}>
          {displayProducts?.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
          ))}
        </div>

        {/* Pagination */}

        <Pagination
          currentPage={current_page}
          totalPages={last_page   }
          onPageChange={handlePageChange}
        />
      </>
    );

  return (
    <main className="min-h-screen bg-background">
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
              onFilterChange={onFilterChange}
              sizes={["hello", "world"]}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">{renderContent}</div>
        </div>
      </div>
    </main>
  );
}
