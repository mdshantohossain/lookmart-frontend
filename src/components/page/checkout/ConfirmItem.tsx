import {
  CartItemType,
  ProcessedVariantKeyType,
  SelectedVariantType,
  UpdatedVariantKeyType,
} from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { memo, useCallback, useEffect, useState } from "react";

type Props = {
  item: CartItemType;
  updateQuantity: (values: { product_id: number; quantity: number }) => void;
  removeCartItem: (id: string) => void;
  updateCartItemVariant: ({
    id,
    newVariant,
  }: {
    id: string;
    newVariant: UpdatedVariantKeyType
  }) => void;
};


const ConfirmItem = ({
  item,
  updateQuantity,
  removeCartItem,
  updateCartItemVariant,
}: Props) => {
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariantType | null>(null);
  const [selectedVariantKey, setSelectedVariantKey] =
    useState<ProcessedVariantKeyType>({} as ProcessedVariantKeyType);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // initial rendered
  useEffect(() => {
    const parts = item?.variant_key?.split("-") || [];

    // selected product color and size
    if (parts.length > 0) {
      setSelectedColor(parts[0]);
      setSelectedSize(parts[1]);
    } else {
      setSelectedColor(item?.variant_key || "");
    }
  }, [item]);

  // initial selected variant
  useEffect(() => {
    Object.entries(item?.variants || {}).forEach(([color, variant]) => {
      if (color === selectedColor) {
        setSelectedVariant(variant);
      }
    });
  }, [selectedColor]);

  const updateVariant = useCallback((newVariant: UpdatedVariantKeyType) =>
      updateCartItemVariant({ id: item.id, newVariant }),
   [item.id, selectedVariantKey]
  );


  useEffect(() => {
    if(!selectedVariantKey.variant_key) return;
    updateVariant({
      variant_key: selectedVariantKey.variant_key,
      vid: selectedVariantKey.vid,
      variant_id: selectedVariantKey.id,
      variant_sku: selectedVariantKey.variant_sku,
      price: Number(selectedVariantKey.selling_price || item.price),
    });
  }, [selectedVariantKey]);

  // when selected image change
  useEffect(() => {
    if (!selectedVariant) return;

    if (selectedVariant.default) {
      setSelectedVariantKey(selectedVariant.default);
      setSelectedSize(
        selectedVariant.default.variant_key.split("-")[1] ||
          selectedVariant.default.variant_key
      );
      return;
    }

    const variants = Object.values(selectedVariant.sizes || {});
    if (!variants.length) return;

    const matched =
      variants.find((v) => {
        const size = v.variant_key.split("-")[1] || "";
        if (size === selectedSize) return v;

        return v.variant_key === selectedVariantKey.variant_key;
      }) || variants[0];

    setSelectedVariantKey(matched);
    setSelectedSize(matched.variant_key.split("-")[1] || matched.variant_key);
  }, [selectedVariant]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-0">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border mx-auto sm:mx-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-lg line-clamp-1">{item.name}</h4>
          <button
            onClick={() => removeCartItem(item.id)}
            className="text-gray-400 hover:text-red-500 p-1">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-muted-foreground">
            Color: {selectedColor}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(item?.variants || {}).map((v, index) => {
              const [color, variant] = v;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedColor(color);
                  }}
                  className={`relative group transition-all hover:cursor-pointer`}>
                  <div
                    className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${
                      selectedColor === color
                        ? "border-red-500"
                        : "border-gray-200 hover:border-red-500/50"
                    }`}>
                    <Image
                      src={variant.image}
                      alt={color}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {/* Size selector */}
            {selectedVariant?.sizes &&
              Object.keys(selectedVariant?.sizes).length > 0 && (
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-3">
                    Size: {selectedSize}{" "}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedVariant?.sizes).map(
                      ([size, variantKeys], index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedSize(size);
                              setSelectedVariantKey(variantKeys);
                            }}
                            className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium hover:cursor-pointer ${
                              selectedSize === size
                                ? "border-red-500 bg-red-500 text-white"
                                : "border-gray-200 bg-transparent hover:border-gray-400"
                            }`}>
                            {size}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {/* Quantity Control */}
          <div className="flex items-center border rounded-lg bg-card">
            <button
              onClick={() =>
                updateQuantity({
                  product_id: item.product_id,
                  quantity: item.quantity - 1,
                })
              }
              disabled={item.quantity <= 1}
              className={`p-1 hover:bg-accent disabled:opacity-30 ${item.quantity <= 1 ? "" : "hover:cursor-pointer"} `}>
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 text-sm font-bold">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity({
                  product_id: item.product_id,
                  quantity: item.quantity + 1,
                })
              }
              className="p-1 hover:bg-accent hover:cursor-pointer">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right">
            <span className="font-bold text-lg text-red-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmItem);
