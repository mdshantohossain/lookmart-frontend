import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { CartItemType } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function CartItem({
  item,
  variant,
}: {
  item: CartItemType;
  variant: "desktop" | "mobile";
}) {
  const { removeCartItem } = useCart();

  const removeItem = (id: string) => {
    removeCartItem(id);
    toast.success("Product removed from cart");
  };

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
  };

  if (variant === "mobile") {
    return (
      <div key={item.id} className="bg-card border rounded-lg p-4">
        <div className="flex items-start space-x-4 aspect-square">
          <Link href={`/products/${item.slug}`}>
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="w-20 h-20 object-cover rounded border flex-shrink-0"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Link className="line-clamp-3 hover:text-red-500" href={`/products/${item.slug}`}>{item.name}</Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">ID: {item.id}</p>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Price: </span>
                <span className="font-semibold">${item.price.toFixed(2)}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Total: </span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b items-center">
      {/* Product */}
      <div className="col-span-5 flex items-center space-x-4">
        <Link href={`/products/${item.slug}`}>
          <Image
            src={item.image}
            width={120}
            height={120}
            className="object-cover rounded border flex-shrink-0"
            alt={item.name}
          />
        </Link>
        <div>
          <Link className="line-clamp-2 hover:text-red-500" href={`/products/${item.slug}`}>
            <h3 className="font-medium">{item.name}</h3>
          </Link>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-center">
        <span className="font-semibold">${item.price.toFixed(2)}</span>
      </div>

      {/* Quantity */}
      <div className="col-span-2">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id!, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id!, Number.parseInt(e.target.value) || 1)
            }
            className="w-16 text-center"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id!, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Total */}
      <div className="col-span-2 text-center">
        <span className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      {/* Remove */}
      <div className="col-span-1 text-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id!)}
          className="text-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
