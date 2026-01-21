import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { addWishlistItem, removeWishlistItem } from "@/features/wishlilstSlice";
import { CartItemType, ProductType } from "@/types";
import { toast } from "react-toastify";
import { useCreateWishlist } from "./api/useWishlist";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export const useWishlist = () => {
  const wishlists = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistMutaion = useCreateWishlist();

  const isExistsOnWishlist = (product_id: number) => {
    return wishlists.some((item) => item.id === product_id);
  };

  const addWishlist = (product: ProductType) => {
    if (!isAuthenticated) {
      return router.push("/login");
    }

    if (isExistsOnWishlist(product.id)) return; // return if exists

    // add to wishlist
    dispatch(addWishlistItem(product));

    toast.success("Product added to wishlist");
  };

  const removeWishlist = (id: number) => {
    if (typeof id === 'string' &&  id === 'all') {
      removeWishlistItem(id);
      return;
    }

    removeWishlistItem(id)
    toast.success("Product moved from wishlist");
  };

  return { isExistsOnWishlist, addWishlist, removeWishlist };
};
