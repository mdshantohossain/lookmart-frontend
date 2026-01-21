"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/features/hooks";
import { useRouter } from "next/navigation";
import CartItem from "@/components/page/cart/CartItem";
import EmptyContent from "@/components/EmptyContent";
import EmptyCart from "@/assets/images/cart.png";

export default function CartPage() {
  const [appliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  // hooks
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const total = subtotal - discountAmount;

  // update cart
  const updateCart = () => {
    // update quantity
  };

  if (cartItems.length === 0) {
    return (
      <EmptyContent
        title="Shopping Cart"
        message="Add some products to get started!"
        image={EmptyCart}
        buttonText="Continue Shopping"
        href="/"
      />
    );
  }

  return (
    <div className=" bg-background">
      <div className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl text-foreground md:text-3xl font-bold mb-8">
            Shopping Cart
          </h1>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="bg-card border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b font-semibold">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} variant="desktop" />
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} variant="mobile" />
            ))}
          </div>

          <div className="w-full justify-end flex py-4">
            <Button variant="outline" onClick={() => updateCart()}>
              Update Cart
            </Button>
          </div>

          {/* Cart Actions */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
            {/* Cart Summary */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-red-500 hover:bg-red-600 hover:cursor-pointer"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
