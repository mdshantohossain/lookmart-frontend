"use client";

import Image from "next/image";
import type React from "react";

import { useEffect, useRef, useState, useCallback } from "react";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Fashion Live",
    logo: "https://picsum.photos/id/340/200/300",
  },
  {
    id: 2,
    name: "Hand Crafted",
    logo: "https://picsum.photos/id/341/200/300",
  },
  {
    id: 3,
    name: "Mestonix",
    logo: "https://picsum.photos/id/342/200/300",
  },
  {
    id: 4,
    name: "Sunshine",
    logo: "https://picsum.photos/id/343/200/300",
  },
  {
    id: 5,
    name: "Pure",
    logo: "https://picsum.photos/id/344/200/300",
  },
  {
    id: 6,
    name: "Tech Corp",
    logo: "https://picsum.photos/id/345/200/300",
  },
  {
    id: 7,
    name: "Creative Studio",
    logo: "https://picsum.photos/id/346/200/300",
  },
  {
    id: 8,
    name: "Digital Agency",
    logo: "https://picsum.photos/id/347/200/300",
  },
];

export default function BrandSlideSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Touch/Mouse event handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const lastTouchX = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  const brandWidth = 200; // Approximate width including spacing
  const totalWidth = brands.length * brandWidth;

  // Manual navigation functions
  const moveLeft = useCallback(() => {
    setCurrentOffset((prev) => {
      const newOffset = prev + brandWidth;
      return newOffset > 0 ? -(totalWidth - brandWidth) : newOffset;
    });
  }, [brandWidth, totalWidth]);

  const moveRight = useCallback(() => {
    setCurrentOffset((prev) => {
      const newOffset = prev - brandWidth;
      return newOffset < -totalWidth ? 0 : newOffset;
    });
  }, [brandWidth, totalWidth]);

  // Auto-scroll animation
  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      if (!isAutoPlaying || isDragging) return;

      const elapsed = timestamp - startTimeRef.current;
      const autoOffset = (elapsed * 0.03) % totalWidth;

      setCurrentOffset(-autoOffset);
      animationRef.current = requestAnimationFrame(animate);
    },
    [isAutoPlaying, isDragging, totalWidth]
  );

  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      startTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isAutoPlaying, isDragging]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setIsDragging(true);
    touchStartX.current = e.touches[0].clientX;
    lastTouchX.current = e.touches[0].clientX;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastTouchX.current;
    velocityRef.current = deltaX;
    lastTouchX.current = currentX;
    touchEndX.current = currentX;

    // Update offset based on touch movement
    setCurrentOffset((prev) => {
      const newOffset = prev + deltaX;
      // Allow some overscroll but with resistance
      if (newOffset > brandWidth) return brandWidth * 0.3;
      if (newOffset < -(totalWidth + brandWidth))
        return -(totalWidth + brandWidth * 0.3);
      return newOffset;
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const difference = touchStartX.current - touchEndX.current;
    const velocity = Math.abs(velocityRef.current);

    // Determine swipe direction and threshold
    if (Math.abs(difference) > 50 || velocity > 5) {
      if (difference > 0) {
        // Swiped left - move right
        moveRight();
      } else {
        // Swiped right - move left
        moveLeft();
      }
    } else {
      // Snap back to nearest position
      setCurrentOffset((prev) => {
        const nearestPosition = Math.round(prev / brandWidth) * brandWidth;
        return Math.max(Math.min(nearestPosition, 0), -totalWidth);
      });
    }

    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 2000); // Resume auto-play after 2 seconds
  };

  // Mouse event handlers (for desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsAutoPlaying(false);
    setIsDragging(true);
    touchStartX.current = e.clientX;
    lastTouchX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const deltaX = currentX - lastTouchX.current;
    lastTouchX.current = currentX;
    touchEndX.current = currentX;

    setCurrentOffset((prev) => {
      const newOffset = prev + deltaX;
      if (newOffset > brandWidth) return brandWidth * 0.3;
      if (newOffset < -(totalWidth + brandWidth))
        return -(totalWidth + brandWidth * 0.3);
      return newOffset;
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        moveRight();
      } else {
        moveLeft();
      }
    } else {
      setCurrentOffset((prev) => {
        const nearestPosition = Math.round(prev / brandWidth) * brandWidth;
        return Math.max(Math.min(nearestPosition, 0), -totalWidth);
      });
    }

    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div
            ref={sliderRef}
            className="flex items-center space-x-12 md:space-x-16 lg:space-x-20 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${currentOffset}px)`,
              transitionDuration: isDragging ? "0ms" : "300ms",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:w-40 lg:w-48 select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0 pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
