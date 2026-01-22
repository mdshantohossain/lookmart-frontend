"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getCategories } from "@/hooks/api/get-categories";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<number|string>("all");
  const router = useRouter();


    const { data: categories, isLoading } = getCategories();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(
        `/products?query=${encodeURIComponent(query)}&category=${category}`
      );
    }
  };

  if(!categories) return null;

  return (
    <div className="flex items-center w-full max-w-lg border border-gray-300 rounded-lg bg-background shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all overflow-hidden">
      {/* Category Dropdown */}
      <div className="hidden sm:block border-r border-gray-300 bg-muted/20">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-full py-2.5 pl-3 pr-8 bg-transparent text-sm text-foreground focus:outline-none cursor-pointer hover:bg-muted/50 transition-colors appearance-none"
          style={{ textAlignLast: "center" }}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 py-2.5 px-3 text-foreground bg-transparent placeholder-muted-foreground focus:outline-none text-sm"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}