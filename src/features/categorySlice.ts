import { API_URL } from "@/config/env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await fetch(API_URL + "/categories");
    const data = await response.json();
    return data;
  },
);

const initialState: {
  categories: any;
  error: string | undefined;
} = {
  categories: [],
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {});
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
