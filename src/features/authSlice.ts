import { AddressType, UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  addresses: AddressType[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  addresses: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: UserType;
        token: string;
        addresses: AddressType[];
      }>,
    ) => {
      Cookies.set("auth_token", action.payload.token, { expires: 7 });

      state.user = action.payload.user;
      state.addresses = action.payload.addresses;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.addresses = [];
      state.isAuthenticated = false;
      Cookies.remove("auth_token");
    },
    addAddress: (state, action: PayloadAction<AddressType>) => {
      const index = state.addresses.findIndex(
        (address) => address.id === action.payload.id,
      );

      if (index === -1) {
        state.addresses.push(action.payload);
      } else {
        state.addresses[index] = action.payload;
      }
    },
    filterAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload,
      );
    },
  },
});

export const { loginSuccess, addAddress, filterAddress, logout } =
  authSlice.actions;

export default authSlice.reducer;
