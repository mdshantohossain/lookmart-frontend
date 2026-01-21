"use client";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { X, ShoppingBasket } from "lucide-react";
import ConfirmItem from "./ConfirmItem";

export default function VariantConfirmationModal({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) {
  const { cartTotal, items, updateItemQuantity, removeCartItem, updateCartItemVariant } = useCart();

  // close modal if cart is empty
  if(items.length === 0) onClose();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
      <div className="bg-background rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-card">
          <div>
            <h2 className="text-xl font-bold">Review Your Order</h2>
            <p className="text-xs text-muted-foreground">Adjust your selection before confirming</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-100 rounded-full transition-colors cursor-pointer">
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {items.length > 0 ? (
            items.map((item) => (
              <ConfirmItem
               key={item.id}
                item={item} 
                updateQuantity={updateItemQuantity}
                removeCartItem={removeCartItem}
                updateCartItemVariant={updateCartItemVariant}
                />
            ))
          ) : (
            <div className="py-12 text-center">
              <ShoppingBasket className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty.</p>
              <Button variant="link" onClick={onClose}>Go back to shopping</Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Grand Total</p>
            <p className="text-3xl font-black text-foreground">${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 sm:px-8">Back</Button>
            <Button 
              disabled={items.length === 0}
              onClick={onConfirm} 
              className="flex-1 sm:px-12 bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}