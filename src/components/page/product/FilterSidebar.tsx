import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { getCategories } from "@/hooks/api/get-categories";
import { CategoryType } from "@/types";
import React, { useEffect, useState } from "react";

const brands = [
  { name: "Nike", count: 45 },
  { name: "Adidas", count: 38 },
  { name: "Zara", count: 29 },
  { name: "H&M", count: 52 },
  { name: "Uniqlo", count: 31 },
];

interface Props {
  onCategoryChange: (category: string[] | string) => void;
  onBrandChange: (brand: string[] | string) => void;
  onSizeChange: (size: string[] | string) => void;
  sizes?: string[];
}
export default function FilterSidebar({
  onCategoryChange,
  onBrandChange,
  onSizeChange,
  sizes,
}: Props) {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const { data: categories, isLoading: categoriesLoading } = getCategories();

  useEffect(() => {
    if (onCategoryChange) onCategoryChange(selectedCategories);
    if (onBrandChange) onBrandChange(selectedBrands);
    if (onSizeChange) onSizeChange(selectedSizes);
  }, [selectedCategories, selectedBrands, selectedSizes]);

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
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category.name,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category.name)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={category.name}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {/* ({category.}) */}
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
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardContent>
          <h3 className="font-semibold text-lg mb-4 text-balance">Brands</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand.name]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand.name)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={brand.name}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {brand.name}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({brand.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4 text-balance">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter((s) => s !== size));
                    } else {
                      setSelectedSizes([...selectedSizes, size]);
                    }
                  }}
                  className="h-8 w-12"
                >
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
