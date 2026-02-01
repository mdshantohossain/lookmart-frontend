const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

export const APP_URL = isProduction
  ? process.env.APP_URL
  : process.env.NEXT_PUBLIC_APP_URL;
export const APP_NAME = isProduction
  ? process.env.APP_NAME
  : process.env.NEXT_PUBLIC_APP_NAME;
export const API_URL = isProduction
  ? process.env.API_URL
  : process.env.NEXT_PUBLIC_API_URL;
export const GOOGLE_CLIENT_ID = isProduction
  ? process.env.GOOGLE_CLIENT_ID
  : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const FACEBOOK_CLIENT_ID = isProduction
  ? process.env.FACEBOOK_CLIENT_ID
  : process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
export const REVALIDATE_SECRET = isProduction
  ? process.env.REVALIDATE_SECRET
  : process.env.REVALIDATE_SECRET;
