"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getCategories } from "@/hooks/api/get-categories";
import Link from "next/link";
import useCurrentUrl from "@/hooks/useCurrentUrl";
import Product from "./Product";

export function CategoryDropdown() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  // hooks
  const { data: categories, isLoading } = getCategories();
  const { isSubCategoryActive, isCategoryActive } = useCurrentUrl();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // If click is inside dropdown, do nothing
      if (desktopDropdownRef.current?.contains(target)) {
        return;
      }

      // If user clicks a Next.js <Link> (navigation will handle closing)
      if (target.closest("a")) {
        return;
      }

      // Otherwise, close the dropdown
      setIsDesktopOpen(false);
    }

    if (isDesktopOpen) {
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }
  }, [isDesktopOpen]);

  const selectedCategory = categories?.find((c) => c.id === hoveredCategory);

  return (
    <div ref={desktopDropdownRef} className="relative">
      {/* ---------- DESKTOP DROPDOWN ---------- */}
      <div className="hidden md:flex">
        <div
          onClick={() => setIsDesktopOpen(!isDesktopOpen)}
          className="flex  items-center bg-red-500 rounded-md p-1 md:p-2 cursor-pointer">
          <h3 className="text-white font-bold">All Categories</h3>
          <Menu className="h-5 w-5l text-white ms-10" />
        </div>
      </div>

      {/* Dropdown Menu - CHANGE: Made fully responsive with adaptive sizing */}
      {isDesktopOpen && (
        <div className="absolute top-full left-0 right-0 md:left-0 md:right-auto mt-2 z-50 shadow-2xl rounded-lg overflow-hidden bg-background">
          {/* Mobile: Full screen modal style */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsDesktopOpen(false)}
          />

          <div
            className="relative md:flex md:gap-0 flex-col md:flex-row rounded-lg"
            style={{ minHeight: "auto" }}>
            {/* Categories List - CHANGE: Responsive height and width */}
            <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto max-h-72 md:max-h-96">
              {categories?.map((category) => (
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setIsDesktopOpen(false)}
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 md:py-3 text-left transition-all duration-150 border-l-4 hover:cursor-pointer",
                    hoveredCategory === category.id
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "border-l-4 border-transparent hover:bg-card",
                  )}>
                  <span className="text-lg md:text-xl flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={20}
                      height={20}
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-semibold transition-colors duration-150 truncate text-sm md:text-base",
                        hoveredCategory === category.id
                          ? "text-red-600"
                          : "text-forground",
                      )}>
                      {category.name}
                    </p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-gray-400 flex-shrink-0",
                      hoveredCategory === category.id
                        ? "rotate-180 text-red-500"
                        : "",
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Subcategories & Offers Panel - CHANGE: Mobile stacked layout, desktop side-by-side */}
            {hoveredCategory && selectedCategory && (
              <div className="md:flex md:gap-0 flex-col md:flex-row">
                {/* Subcategories */}
                <div className="w-full md:w-72  p-4 md:p-5 space-y-2 md:space-y-3 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto max-h-72 md:max-h-96">
                  <div className="mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200">
                    <h3 className="font-bold  text-base md:text-lg">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Browse our collection
                    </p>
                  </div>

                  <div className="space-y-1">
                    {selectedCategory.sub_categories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/category/${selectedCategory.slug}/${subcat.slug}`}
                        onClick={() => setIsDesktopOpen(false)}>
                        <div className="w-full text-left px-3 py-2 md:py-2.5 hover:bg-white rounded-md transition-all duration-150 group hover:cursor-pointer">
                          <p className="font-medium group-hover:text-red-600 transition-colors duration-150 text-sm md:text-base">
                            {subcat.name}
                          </p>
                          {subcat.description && (
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600 hidden md:block">
                              {subcat.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Offers Panel - CHANGE: Made responsive with proper mobile sizing */}
                {selectedCategory.products &&
                  selectedCategory.products.length > 0 && (
                    <div className="w-full md:w-96 p-4 md:p-6 border-t md:border-t-0 md:border-l border-red-100 overflow-y-auto max-h-72 md:max-h-96">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-4 md:mb-5">
                        <Sparkles
                          size={18}
                          className="md:w-5 md:h-5 text-red-500 flex-shrink-0"
                        />
                        <h3 className="font-bold text-base md:text-lg">
                          Special Offers
                        </h3>
                      </div>

                      {/* Offers Grid - CHANGE: Responsive card sizing */}
                      <div className="space-y-2 md:space-y-3">
                        {selectedCategory.products.map(
                          (categoryProduct, index) => (
                            <div
                              className="bg-card rounded-xl border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                              key={index}>
                              <Product
                                product={categoryProduct}
                                isDeviceOpen={isDesktopOpen}
                                setIsDeviceOpen={setIsDesktopOpen}
                              />
                            </div>
                          ),
                        )}
                      </div>

                      {/* View All Button */}
                      <button className="w-full mt-3 md:mt-4 py-2 md:py-2.5 border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 text-xs md:text-sm">
                        View All Offers
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- MOBILE DRAWER NAVIGATION ---------- */}
      <div className="md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <div className="flex gap-4 items-center bg-red-500 rounded-md p-1 md:p-3 cursor-pointer">
              <Menu className="h-5 w-5l text-white" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0">
            <SheetHeader className="p-4 border-b border-gray-200">
              <SheetTitle className="text-lg font-bold text-foreground">
                All Categories
              </SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto h-[calc(100vh-60px)] p-3 space-y-2">
              {categories?.map((category) => (
                <Collapsible
                  key={category.id}
                  open={hoveredCategory === category.id}
                  onOpenChange={(open) =>
                    open
                      ? setHoveredCategory(category.id)
                      : setHoveredCategory(null)
                  }>
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-md  transition-colors ${
                        isCategoryActive(category.slug)
                          ? "bg-red-500"
                          : "bg-card"
                      }`}>
                      <Link href={`/category/${category.slug}`}>
                        <div
                          className="flex items-center gap-2"
                          onClick={() => setIsMobileOpen(false)}>
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={20}
                            height={20}
                          />
                          <span className="font-medium text-foreground">
                            {category.name}
                          </span>
                        </div>
                      </Link>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "text-gray-400 flex-shrink-0",
                          hoveredCategory === category.id
                            ? "rotate-180 text-red-500 transation-all duration-200"
                            : "",
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-2 py-1 bg-card rounded-md border mt-1 space-y-2">
                    {category?.sub_categories.map((sub) => (
                      <Link
                        href={`/category/${category.slug}/${sub.slug}`}
                        key={sub.id}
                        onClick={() => setIsMobileOpen(false)}>
                        <div
                          className={`px-2 py-2 text-sm text-foreground hover:text-red-600 cursor-pointer flex justify-between items-center ${
                            isSubCategoryActive(sub.slug)
                              ? "bg-red-400"
                              : "bg-background/50"
                          } my-1 rounded-md`}>
                          {sub.name} <ArrowRight size={14} />
                        </div>
                      </Link>
                    ))}

                    {category?.products && category.products.length > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
                          <Sparkles size={14} className="text-red-500" />
                          Offers
                        </h4>

                        {/* Horizontal scrollable offers list */}
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 scroll-smooth">
                          {category?.products.map((categoryProduct, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 w-52 sm:w-65 rounded-xl border border-red-100 hover:border-red-300">
                              <Product
                                product={categoryProduct}
                                isDeviceOpen={isMobileOpen}
                                setIsDeviceOpen={setIsMobileOpen}
                              />
                            </div>
                            // <CategoryDropdownProduct
                            // key={index}
                            //     product={categoryProduct}
                            //     setIsDeviceOpen={setIsMobileOpen}
                            //     isDeviceOpen={isMobileOpen}
                            //   />
                          ))}
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
