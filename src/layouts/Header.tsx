"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User,
  ShoppingCart,
  Heart,
  Sun,
  Moon,
  Menu,
  Home,
} from "lucide-react";

import WhatAppImage from "@/assets/images/whatsapp.png";
import { Search as SearchIcon } from "lucide-react";
import ProductSearch from "@/components/page/home/ProductSearch";
import { useAppSelector } from "@/features/hooks";
import DropdownCart from "@/components/DropdownCart";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import AppLogo from "@/components/AppLogo";
import useCurrentUrl from "@/hooks/useCurrentUrl";

export default function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<string>("up");
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);


  // hooks
  const { cartTotal, items } = useAppSelector((state) => state.cart);
  
  const wishlist = useAppSelector((state) => state.wishlist);
  const { isPage } = useCurrentUrl();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === "true";
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return;
    }

    //  No saved preference → detect system theme
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDark(osPrefersDark);
    if (osPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // save the system preference to localStorage
    localStorage.setItem("darkMode", String(osPrefersDark));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => {
      window.removeEventListener("scroll", updateScrollDir);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;

    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <header
        className={`border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-transform duration-300 ${
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto px-8 py-1">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <AppLogo location />
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-2xl mx-auto px-4">
              <ProductSearch />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-muted rounded-lg transition"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Wishlist Icon with Badge */}
              <Link
                href="/wishlist"
                title="Wishlist"
                className="relative p-2 hover:bg-muted rounded-lg transition hidden md:block"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              </Link>

              {/* Cart Icon with Badge and Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCartDropdownOpen(true)}
                onMouseLeave={() => setIsCartDropdownOpen(false)}
              >
                <div className="relative p-2 hover:bg-muted rounded-lg transition">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                </div>

                {/* Cart Dropdown */}
                {isCartDropdownOpen && (
                  <DropdownCart
                    items={items}
                    cartTotal={cartTotal}
                    setIsCartDropdownOpen={setIsCartDropdownOpen}
                  />
                )}
              </div>

              {/* User Icon */}
              <div className="p-2 hover:bg-muted rounded-lg transition hidden md:block">
                <Link href="/dashboard">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* bottom header */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40">
            {/* Category Dropdown */}
            <CategoryDropdown />

            {/* Navigation */}
            <Navigation
              isOpen={isNavigationOpen}
              setIsOpen={setIsNavigationOpen}
            />

            <a
              href="https://wa.me/+8801799630818"
              target="_blank"
              className="order-2 md:order-3"
            >
              <div className=" flex gap-2 items-center">
                <Image
                  src={WhatAppImage}
                  className="w-6 h-6"
                  alt="contact icon"
                />
                <span>01799630818</span>
              </div>
            </a>
          </div>

          {/* Shown when search icon in bottom footer is clicked */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              showSearchOnMobile
                ? "max-h-40 mt-3 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <ProductSearch />
          </div>
        </div>
      </header>

      {/* --- MOBILE FIXED BOTTOM NAVIGATION --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-full h-full hover:text-red-500 gap-1 ${
              isPage("home") ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <Home
              size={20}
              className={`${isPage("/dashboard") ? "text-red-500" : ""}`}
            />
            <span
              className={`text-[12px] font-medium ${
                isPage("/") ? "text-red-500" : ""
              }`}
            >
              Home
            </span>
          </Link>

          {/* 2. Search Toggle */}
          <button
            onClick={() => {
              setShowSearchOnMobile(!showSearchOnMobile);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
              showSearchOnMobile ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <SearchIcon size={20} />
            <span className="text-[12px] font-medium">Search</span>
          </button>

          {/* 3. wishlist */}
          <Link
            href="/wishlist"
            className={`flex flex-col items-center justify-center w-full h-full hover:text-red-500 gap-1 cursor-pointer ${
              isPage("/wishlist") ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {/* You can wire this to open the CategoryDropdown in a modal */}
            <Heart className="w-5 h-5" />
            <span className="text-[12px] font-medium">Wishlist</span>
          </Link>

          {/* 4. Account */}
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full hover:text-red-500 gap-1 ${
              isPage("/dashboard") ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <User size={20} />
            <span className="text-[12px] font-medium">Account</span>
          </Link>

          {/* 5. Menu (Opens Navigation) */}
          <button
            onClick={() => setIsNavigationOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-red-500 gap-1"
          >
            <Menu size={20} />
            <span className="text-[12px] font-medium">Menu</span>
          </button>
        </div>
      </div>
    </>
  );
}
