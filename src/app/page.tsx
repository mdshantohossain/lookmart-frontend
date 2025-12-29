"use client";
import ExclusiveProducts from "@/components/page/home/ExclusiveProducts";
import TrendingProducts from "@/components/page/home/TrendingProducts";
import BrandSlideSection from "@/components/page/home/BrandSlideSection";
import CategorySection from "@/components/page/home/CategorySection";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { fetchCategories } from "@/features/categorySlice";
import { fetchProducts } from "@/features/productSlice";
import TestimonialsSection from "@/components/page/home/TestimonialsSection";
import Slider from "@/components/page/home/Slider";
import { fetchAppInfo } from "@/features/appSlice";
import AddSection from "@/components/page/home/AddSection";

const images = [
  {
    src: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    alt: "Slide 1",
  },
  {
    src: "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
    alt: "Slide 2",
  },
  {
    src: "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
    alt: "Slide 3",
  },
  {
    src: "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
    alt: "Slide 4",
  },
];

export default function HomePage() {
  const dispatch = useAppDispatch();

  const { items, cartTotal } = useAppSelector(state => state.cart)

  console.log(items, cartTotal)
  
  useEffect(() => {
    // Cookies.remove("auth_token");
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchAppInfo());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        <Slider
          images={images}
          className="aspect-[21/9] md:aspect-[21/7] max-h-[600px]"
        />
      </div>

      <main className="mx-auto px-4 md:px-8 py-8">
        <AddSection />
        <CategorySection />
        <ExclusiveProducts />
        <TrendingProducts />
        <TestimonialsSection />
        <BrandSlideSection />
      </main>
    </div>
  );
}
 