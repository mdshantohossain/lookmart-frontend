import { useProcessColorAndSize } from "@/hooks/useProcessColorAndSize";
import { ProductType } from "@/types";
import { formatPrice, getDeliveryDateInfo } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function CategoryDropdownProduct({
  product,
  setIsDeviceOpen,
  isDeviceOpen,
  className,
}: {
  product: ProductType;
  setIsDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeviceOpen: boolean;
  className: string;
}) {
  // hooks
  const router = useRouter();
  const { isExistsOnCart, addToCart } = useCart();

  // price formatting
  const { integer, decimal } = formatPrice(product.selling_price);

  // total delivery day
  const { date, dayOfWeek } = getDeliveryDateInfo(
    product.total_day_to_delivery
  );

  // process color and size of variants
  const variants = useProcessColorAndSize(product.variants);

  // handle shop now
  const handleShopNow = (product: ProductType) => {
    isDeviceOpen && setIsDeviceOpen(false);
    if (!isExistsOnCart(product.id)) {
      addToCart({
        product_id: product.id,
        name: product.name,
        quantity: 1,
        price: product.selling_price,
        image: product.image_thumbnail,
        slug: product.slug,
      });
    }

    return router.push("/checkout");
  };

  return (
    <div className={className}>
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 h-28 md:h-40 overflow-hidden">
        <Link
          onClick={() => setIsDeviceOpen(false)}
          href={`/products/${product.slug}`}
        >
          <Image
            src={product.image_thumbnail}
            fill
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-md">
            -{product.discount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 md:p-3">
        <Link
          href={{
            pathname: "/products",
            query: { product: product.slug },
          }}
          onClick={() => setIsDeviceOpen(false)}
          className="text-xs md:text-sm font-semibold line-clamp-2 mb-2 group-hover:text-red-600 transition-colors cursor-pointer"
        >
          {product.name}
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="text-base md:text-lg font-bold text-red-600">
            ${product.selling_price}
          </span>
          {product.original_price && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              ${product.original_price.toFixed(0)}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/checkout`}
          onClick={(e) => {
            e.stopPropagation();
            handleShopNow(product);
          }}
        >
          <Button className="w-full bg-gradient-to-r hover:cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 transform group-hover:scale-105">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
