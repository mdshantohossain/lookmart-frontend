import { CartItemType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type CartType = {
  cartTotal: number;
  items: CartItemType[];
};

const initialState: CartType = {
  cartTotal: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cartTotal += Number(action.payload.price * action.payload.quantity);
      state.items.push({
        id: uuidv4(),
        product_id: action.payload.product_id,
        name: action.payload.name,
        price: Number(action.payload.price),
        image: action.payload.image,
        quantity: action.payload.quantity || 1,
        vid: action.payload.vid,
        variant_id: action.payload.variant_id || "",
        variant_key: action.payload.variant_key || "",
        slug: action.payload.slug,
        variants: action.payload.variants,
      });
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        product_id: number;
        quantity: number;
      }>
    ) => {
      // current item index
      const index = state.items.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (index !== -1) {
        // current item
        const item = state.items[index];

        // remove old total for this item
        state.cartTotal -= item.price * item.quantity;

        // update quantity
        state.items[index].quantity = action.payload.quantity;

        // add new total for this item
        state.cartTotal += item.price * action.payload.quantity;
      }
    },
    removeCartItem: (state, action) => {
      // current item index
      const index = state.items.findIndex((item) => item.id === action.payload);

      // current item
      const removedItem = state.items[index];

      if (removedItem) {
        state.cartTotal -= removedItem.price * removedItem.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateCartItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.newVariant };
      }
    }
  },
});

export const { addCartItem, updateQuantity, removeCartItem, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
