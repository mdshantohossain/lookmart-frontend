import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TopCategorySkeleton() {
  return (
    <div className="category-item flex-shrink-0 text-center flex justify-center items-center flex-col">
      <div className="w-20 h-20 relative relative rounded-full shadow-lg flex items-center justify-center mb-3 hover:shadow-xl transition-shadow cursor-pointer mx-auto">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
      <Skeleton className="w-25 h-4" />
    </div>
  );
}
