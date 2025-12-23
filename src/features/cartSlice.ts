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

      state.cartTotal += Number(action.payload.price);
      state.items.push({
        id: uuidv4(),
        product_id: action.payload.product_id,
        name: action.payload.name,
        price: Number(action.payload.price),
        image: action.payload.image,
        quantity: action.payload.quantity || 1,
        vid: action.payload.vid,
        variant_id: action.payload.variant_id || '',
        variant_key: action.payload.variant_key || '',
        slug: action.payload.slug,
        variants: action.payload.variants
      });
    },

    updateCart: (
      state,
      action: PayloadAction<{
        product_id: number;
        price: number;
        quantity: number;
      }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (index !== -1) {
        const oldItem = state.items[index];

        // old price = old price * old quantity
        const oldTotal = Number(oldItem.price) * oldItem.quantity;

        // new price total
        const newTotal =
          Number(action.payload.price) * Number(action.payload.quantity);

        // update cart total: remove old, add new
        state.cartTotal = state.cartTotal - oldTotal + newTotal;

        state.items[index] = {
          ...state.items[index],
          price: newTotal,
          quantity: action.payload.quantity,
        };
      }
    },
    removeCartItem: (state, action) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload);

      if (itemToRemove) {
        state.cartTotal -= (itemToRemove.price * itemToRemove.quantity);
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addCartItem, updateCart, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
