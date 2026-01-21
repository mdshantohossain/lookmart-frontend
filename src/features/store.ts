import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cartSlice";
import categoryReducer from "@/features/categorySlice";
import productReducer from "@/features/productSlice";
import appReducer from "@/features/appSlice";
import authReducer from "@/features/authSlice";
import wishlistReducer from "@/features/wishlilstSlice";
import currentLocationReducer from "@/features/currentLocationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app", "auth", "cart", "wishlist"],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  cart: cartReducer,
  categories: categoryReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  currentLocation: currentLocationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

//  Persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
