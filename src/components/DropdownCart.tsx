import { CartItemType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import EmptyCart from "./EmptyCart";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface DropdownCartProps {
  items: CartItemType[];
  cartTotal: number;
  setIsCartDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownCart({
  items,
  cartTotal,
  setIsCartDropdownOpen,
}: DropdownCartProps) {
  const router = useRouter();

  const { removeCartItem } = useCart();

  // handle navigation
  const handleNavigation = (path: string) => {
    setIsCartDropdownOpen(false);
    return router.push(path);
  };

  return (
    <div className="absolute right-0 top-4 mt-2 w-80 sm:w-96 bg-background border-gray-200 rounded-lg shadow-xl z-50 max-w-[calc(100vw-2rem)] sm:max-w-none transform translate-x-4 sm:translate-x-0">
      <div className="p-4">
        {items.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) =>  (
                  <div
                  key={item.id}
                  className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded "
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base text-foreground line-clamp-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCartItem(item.id)}
                        className="w-6 h-6 text-gray-400 hover:text-red-500 flex-shrink-0 hover:cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                ))}
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <span className="font-semibold text-foreground text-sm sm:text-base">
                Subtotal:
              </span>
              <span className="font-bold text-lg sm:text-xl text-red-500">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1 text-sm py-2 border-gray-800 text-foreground hover:bg-gray-800 hover:text-white bg-transparent"
                onClick={() => handleNavigation("/cart")}
              >
                View Cart
              </Button>
              <Button
                className="flex-1 text-sm py-2 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleNavigation("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}
