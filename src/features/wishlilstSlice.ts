import { ProductType, WishlistType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductType[] = [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistItem: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload);
    },

    removeWishlistItem: (state, payload) => {
      state = state.filter((item) => item.id !== payload.payload);
    },
  },
});

export const { addWishlistItem, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
