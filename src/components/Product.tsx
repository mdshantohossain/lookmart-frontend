"use client";
import { cn } from "@/lib/utils";
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types";
import Link from "next/link";
import renderStars from "./generateStarts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAppSelector } from "@/features/hooks";
import { formatPrice, getDeliveryDateInfo } from "@/utils/helper";
import ProductMedia from "./ProductMedia";
import { useProcessColorAndSize } from "@/hooks/useProcessColorAndSize";
import React from "react";

type Props = {
  product: ProductType;
  isDeviceOpen?: boolean;
  setIsDeviceOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Product({
  product,
  isDeviceOpen,
  setIsDeviceOpen,
}: Props) {
  // hooks
  const navigation = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isExistsOnCart, addToCart } = useCart();
  const { isExistsOnWishlist, addWishlist } = useWishlist();

  const isExistedToCart = isExistsOnCart(product.id);
  const isWishlisted = isExistsOnWishlist(product.id);

  // price formatting
  const { integer, decimal } = formatPrice(product.selling_price);

  // delivery day
  const { date, dayOfWeek } = getDeliveryDateInfo(
    product.total_day_to_delivery
  );

  // process color and size of variants
  const { processedVariants, first_variant_keys } = useProcessColorAndSize(
    product?.variants
  );

  // add to wishlist
  const addToWishlist = (e: React.MouseEvent, product: ProductType) => {
    if (!isAuthenticated) {
      setIsDeviceOpen && setIsDeviceOpen && setIsDeviceOpen(false);
      return navigation.push("/login");
    }
    e.stopPropagation();
    addWishlist(product);
  };

  // add to cart
  const handleAddToCart = (product: ProductType) => {
    if (!isExistedToCart) {
      addToCart({
        product_id: product.id,
        name: product.name,
        quantity: 1,
        price:
          Number(first_variant_keys?.selling_price) || product.selling_price,
        image: product.image_thumbnail,
        slug: product.slug,
        vid: first_variant_keys?.vid || "",
        variant_id: first_variant_keys?.id,
        variant_key: first_variant_keys?.variant_key || "",
        variants: processedVariants,
      });
    }
  };

  // handle checkout
  const handleShopNow = (product: ProductType) => {
    isDeviceOpen && setIsDeviceOpen && setIsDeviceOpen(false);

    handleAddToCart(product);
    return navigation.push("/checkout");
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          addToWishlist(e, product);
        }}
        className="absolute top-1 right-1 z-10 p-1 cursor-pointer"
        aria-label="Add to wishlist"
        disabled={isWishlisted}>
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
        />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        onClick={() => setIsDeviceOpen && setIsDeviceOpen(false)}>
        <ProductMedia product={product} />
      </Link>

      {/* Product Info */}
      <div className="px-4 pt-4 pb-6">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-foreground mb-1 line-clamp-4 hover:cursor-pointer"
            onClick={() => setIsDeviceOpen && setIsDeviceOpen(false)}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex gap-2 mb-1">
          <div className="flex items-center">
            <span className="text-xs">
              {Number(product.reviews_avg_rating)?.toFixed(2)}
            </span>
            {renderStars(product.reviews_avg_rating)}
          </div>

          <span className="text-xs  text-muted-foreground">
            ({product?.reviews_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-1">
            <span className="text-lg align-super">$</span>
            <span className="text-3xl font-semibold">{integer}</span>
            <span className="text-sm align-super">{decimal}</span>
          </div>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.original_price}
            </span>
          )}
        </div>

        {/* total sold */}
        {product.total_sold && (
          <div className="flex items-center gap-1 mb-2">
            <TrendingUp className="w-3 h-3" />
            <span className="text-sm">{product.total_sold}</span>
          </div>
        )}

        {/* Delivery Tag */}
        <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-medium bg-green-50 dark:bg-green-900/20 w-fit px-2 py-1 rounded-full mb-4">
          <Truck className="w-3 h-3" />
          <span>
            {product.is_free_delivery === 1
              ? "Free delivery: "
              : "Delivery on: "}{" "}
            {date}, {dayOfWeek}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleShopNow(product)}
            className="w-[83%] bg-red-600 hover:bg-red-500 text-white cursor-pointer"
            size="sm">
            Shop Now
          </Button>

          <Button
            disabled={isExistedToCart}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className={`
    cursor-pointer rounded-full border-none
    ${
      isExistedToCart
        ? "bg-green-200 text-green-600 hover:bg-green-100"
        : "bg-muted text-black dark:text-white hover:bg-red-600 hover:text-white"
    }
  `}>
            {isExistedToCart ? <ShoppingBag /> : <ShoppingCart />}
          </Button>
        </div>
      </div>
    </div>
  );
}
