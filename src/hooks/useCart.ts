import {
  addCartItem,
  updateCart,
  removeCartItem as removeItem,
} from "@/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { CartItemType } from "@/types";
import { toast } from "react-toastify";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);

  const isExistsOnCart = (product_id: number) => {
    return items.some((item) => item.product_id === product_id);
  };

  const addToCart = (product: Omit<CartItemType, "id">) => {
    if (isExistsOnCart(product.product_id)) return;

    dispatch(addCartItem(product));

    toast.success("Product added to cart");
  };

  const updateCartItem = (values: {
    product_id: number;
    price: number;
    quantity: number;
  }) => {
    dispatch(updateCart(values));
  };

  const removeCartItem = (id: string) => {
    dispatch(removeItem(id));
    toast.success("Product removed from cart");
  };

  return { items, isExistsOnCart, addToCart, removeCartItem, updateCartItem };
};
