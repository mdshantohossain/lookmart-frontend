import {
  addCartItem,
  updateCartItem,
  removeCartItem as removeItem,
  updateQuantity,
} from "@/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  CartItemType,
  ProcessedVariantKeyType,
  UpdatedVariantKeyType,
} from "@/types";
import { toast } from "react-toastify";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, cartTotal } = useAppSelector((state) => state.cart);

  const isExistsOnCart = (product_id: number) => {
    return items.some((item) => item.product_id === product_id);
  };

  const addToCart = (product: Omit<CartItemType, "id">) => {
    if (isExistsOnCart(product.product_id)) return;

    dispatch(addCartItem(product));

    toast.success("Product added to cart");
  };

  const updateItemQuantity = (values: {
    product_id: number;
    quantity: number;
  }) => {
    dispatch(updateQuantity(values));
  };

  const removeCartItem = (id: string) => {
    dispatch(removeItem(id));
    toast.success("Product removed from cart");
  };

  // Inside your cart store/hook:
  const updateCartItemVariant = ({
    id,
    newVariant,
  }: {
    id: string;
    newVariant: UpdatedVariantKeyType;
  }) => {
    dispatch(updateCartItem({ id, newVariant }));
  };

  return {
    items,
    cartTotal,
    isExistsOnCart,
    addToCart,
    removeCartItem,
    updateItemQuantity,
    updateCartItemVariant,
  };
};
