"use client";
import { store, persistor } from "@/features/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/config/env";

export default function ReduxWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
            {children}
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
