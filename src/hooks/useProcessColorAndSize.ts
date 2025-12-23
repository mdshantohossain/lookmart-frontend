import {
  ProcessedVariantKeyType,
  ProcessedVariantType,
  VariantType,
} from "@/types";
import { useMemo } from "react";

export const useProcessColorAndSize = (variants?: VariantType[]) => {
  return useMemo(() => {
    const processedVariants: ProcessedVariantType = {} as ProcessedVariantType;

    if (!variants || variants.length === 0) {
      return {
        processedVariants,
        firstColor: null,
        firstVariant: null,
        first_variant_keys: {} as ProcessedVariantKeyType,
      };
    }

    variants.forEach((variant) => {
      if (!variant.variant_key) return;

      let parts = variant.variant_key.split("-");
      let color = parts[0]?.trim() || "";
      let size = parts[1]?.trim() || "";

      // If color missing → create unique default
      if (!color) {
        color = `default-${Object.keys(processedVariants).length + 1}`;
      }

      // Init color group
      if (!processedVariants[color]) {
        processedVariants[color] = {
          image: variant.image || "",
          sizes: {},
          default: null,
        };
      }

      const processedVariant: ProcessedVariantKeyType = {
        id: variant.id,
        vid: variant.vid ?? null,
        variant_key: variant.variant_key ?? "",
        variant_sku: variant.sku ?? "",
        selling_price: variant.selling_price ?? "",
      };

      if (size) {
        // Case 1: Has size
        processedVariants[color].sizes[size] = processedVariant;
      } else {
        // Case 2: No size → default
        processedVariants[color].default = processedVariant;
      }
    });

    //  Get first color
    const firstColor = Object.keys(processedVariants)[0];

    //  Get first variant (first size)
    const firstVariant = processedVariants[firstColor] ?? null;

    const first_variant_keys =
      Object.values(processedVariants[firstColor]?.sizes)[0] ||
      processedVariants[firstColor]?.default ||
      null;

    return {
      processedVariants,
      firstColor,
      firstVariant,
      first_variant_keys,
    };
  }, [variants]);
};
