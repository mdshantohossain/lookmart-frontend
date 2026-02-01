import { API_URL } from "@/config/env";
import { ProductType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch(API_URL + "/trending-products");
    const data = await response.json();
    return data;
  },
);

const initialState: {
  isLoading: boolean;
  products: ProductType[];
  error: string | undefined;
} = {
  isLoading: false,
  products: [],
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
