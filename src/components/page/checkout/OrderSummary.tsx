import EmptyCart from "@/components/EmptyCart";
import { useAppSelector } from "@/features/hooks";
import { currency } from "@/services/helper";
import React from "react";

export default function OrderSummary({
  shippingCost,
}: {
  shippingCost: number;
}) {
  const { cartTotal, items } = useAppSelector((state) => state.cart);

  return (
    <div className="bg-card border rounded-lg p-4 h-fit">
      {items.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          {/* Order Items */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 pb-2 border-b font-medium">
              <span>Product</span>
              <span className="text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 py-2 bg-muted rounded-md p-2">
                <div>
                  <span className="text-sm">{item.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    x {item.quantity}
                  </span>
                </div>
                <div className="text-right font-medium">
                  {currency}
                  {item.price.toFixed(2)}
                </div>
              </div>
            ))}

<hr /> 

            {/* Subtotal */}
            <div className="grid grid-cols-2 py-1">
              <span className="font-medium">SubTotal</span>
              <span className="text-right font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            {/* {appliedCoupon && (
                <div className="grid grid-cols-2 gap-4 py-2 text-green-600">
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span className="text-right">-${discountAmount.toFixed(2)}</span>
                </div>
              )} */}

            {/* Shipping */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <span>{shippingCost === 0 ? "Free Shipping" : "Shipping"}</span>
                <span className="text-right">
                {currency}
                {shippingCost}
                </span>
            </div>

            {/* Total */}
            <div className="grid grid-cols-2 py-1">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-right text-lg font-semibold">
                {currency}
                {(cartTotal + shippingCost).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
