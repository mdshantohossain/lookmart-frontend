import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import ReduxWrapper from "@/wrapper/ReduxWrapper";
import { ToastContainer } from "react-toastify";
import { API_URL, APP_NAME } from "@/config/env";
import { AppProvider } from "@/providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const generateMetadata = async () => {
  const res = await fetch(`${API_URL}/app-info`);
  const {data: app} = await res.json();

  return {
    title: app?.name || `${APP_NAME}`,
    description: app?.description ||
      "Look Mart BD offers the best products in Electronics, Fashion, Home Appliances, and more. Official warranty & fast delivery.",
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon.png" sizes="32x32" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
          <ReduxWrapper>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ToastContainer position="bottom-left" />
          </ReduxWrapper>
        </body>
      </html>
    </AppProvider>
  );
}
