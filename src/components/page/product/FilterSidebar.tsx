import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { getCategories } from "@/hooks/api/get-categories";
import getBrands from "@/lib/api/get-brands";
import { BrandType, CategoryType, FilterType } from "@/types";
import React, { memo, useCallback, useEffect, useState } from "react";

interface Props {
  onFilterChange: (filters: FilterType) => void;
  sizes?: string[];
}

export const FilterSidebar = ({
  onFilterChange,
  sizes,
}: Props) => {
  const [filters, setFilters] = useState<FilterType>({
    categories: [],
    brands: [],
    sizes: [],
    price: [0, 200],
  });

useEffect(() => {
  onFilterChange(filters);
}, [filters, onFilterChange]);

  // fetch categories
  const { data: categories, isLoading: categoriesLoading } = getCategories();
  const { data: brands, isLoading: brandsLoading } = getBrands();

  // handle category toggle
  const toggleCategory = useCallback((id: number) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  }, []);

  // handle price toggle
  const togglePrice = useCallback((price: number[]) => {
    setFilters((prevState) => ({
      ...prevState,
      price: [price[0], price[1]],
    }));
  }, []);

  // handle brand toggle
  const toggleBrand = useCallback((id: number) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(id)
        ? prev.brands.filter((b) => b !== id)
        : [...prev.brands, id],
    }));
  }, []);

  return (
    <div className="w-full space-y-3">
      {/* Categories */}
      <Card>
        <CardContent>
          <h3 className="font-semibold text-lg mb-4 text-balance">
            Categories
          </h3>
          <div className="space-y-3">
            {categories?.map((category: CategoryType) => (
              <div
                key={category.name}
                className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.name}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={category.name}
                    className="text-sm font-medium cursor-pointer">
                    {category.name}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({category.products_count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardContent>
          <h3 className="font-semibold text-lg mb-4 text-balance">
            Price Range
          </h3>
          <div className="space-y-4">
            <Slider
              value={filters.price}
              onValueChange={(price) => togglePrice(price)}
              max={200}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.price[0]}</span>
              <span>${filters.price[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      {brands?.length > 0 && (
        <Card>
        <CardContent>
          <h3 className="font-semibold text-lg mb-4 text-balance">Brands</h3>
          <div className="space-y-3">
            {brands?.map((brand: BrandType) => (
              <div
                key={brand.name}
                className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.name}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={(checked: boolean) =>
                      toggleBrand(brand.id)
                    }
                  />
                  <label
                    htmlFor={brand.name}
                    className="text-sm font-medium cursor-pointer">
                    {brand.name}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({brand.products_count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}
      

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4 text-balance">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (filters.sizes.includes(size)) {
                      setFilters((prevState) => ({
                        ...filters,
                        sizes: filters.sizes.filter((s) => s !== size),
                      }));
                    } else {
                      setFilters((prevState) => ({
                        ...prevState,
                        sizes: filters.sizes,
                        size,
                      }));
                    }
                  }}
                  className="h-8 w-12">
                  {size}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


export default FilterSidebar
