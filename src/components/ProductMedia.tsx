import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// --- Sub-Component: Handles Image vs Video Logic ---
const ProductMedia = ({ product }: { product: ProductType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If not, it gracefully falls back to just the image.
  const hasVideo = !!product.video_thumbnail;

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {}); // catch creates promise error ignore
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video
      }
    }
  }, [isHovered, hasVideo]);

  return (
    <div 
      className="relative h-64 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image */}
      <Image
        src={product.image_thumbnail}
        alt={product.name}
        fill
        className={cn(
          "object-cover transition-scale duration-400",
          !hasVideo && isHovered ? "scale-110" : "scale-100"
        )}
      />

      {/* Hover Video (Optional) */}
      {hasVideo && ( 
        <video
          ref={videoRef}    
          src={product.video_thumbnail}
          muted
          loop 
          playsInline
          preload="metadata"
          className={cn(
            "absolute inset-0 w-full h-full object-fill transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm z-10">
          -{product.discount} OFF
        </div>
      )}
    </div>
  );
};


export default ProductMedia;