import { API_URL } from "@/config/env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AppInfoType {
  isLoading: boolean;
  data: {
    name: string;
    email: string;
    logo: string;
    favicon: string;
    phone: string;
    address: string;
    location: string;
    description: string;
  };
  error: undefined | string;
}

export const fetchAppInfo = createAsyncThunk("app/fetchAppInfo", async () => {
  const { data } = await axios.get(API_URL + "/app-info");
  return data.data;
});

const initialState: AppInfoType = {} as AppInfoType;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadAppInfoState: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAppInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAppInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default appSlice.reducer;
