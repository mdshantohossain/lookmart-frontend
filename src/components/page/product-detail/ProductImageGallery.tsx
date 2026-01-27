import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlayCircle, PlayIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import staticImages from "@/utils/images";
import { Play } from "next/font/google";

type Props = {
  images: { image: string }[];
  video_thumbnail?: string;
  productName: string;
  isMobile: boolean;
};

type MediaItem = { type: "image" | "video"; src: string };

export default function ProductImageGallery({
  images,
  video_thumbnail,
  productName,
  isMobile,
}: Props) {
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFullscreen, setShowFullscreen] = useState(false);

  const media: MediaItem[] = useMemo(() => {
    const items: MediaItem[] = [];

    if (video_thumbnail) {
      items.push({ type: "video", src: video_thumbnail });
    }

    images.forEach((img) => {
      items.push({ type: "image", src: img.image });
    });

    return items;
  }, [images, video_thumbnail]);

  // handle scroll other images
  const scrollGallery = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 100;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // current selected image
  const currentMedia = media[selectedImageIndex];

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleImageMouseEnter = () => {
    if (!isMobile) setZoomLevel(2);
  };

  const handleImageMouseLeave = () => {
    setZoomLevel(1);
  };

  return (
    <>
      <div className="space-y-4 order-1">
        {/* Main image with zoom */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in h-80 sm:h-96 md:h-[500px] w-full"
          onMouseMove={handleImageMouseMove}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
          onClick={() => setShowFullscreen(true)}
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          >
            {currentMedia?.type === "image" ? (
              <Image
                src={currentMedia?.src}
                fill
                alt={productName}
                className="object-fit"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <video
                src={currentMedia.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-fill"
              />
            )}
          </div>

          {/* Zoom indicator */}
          {!isMobile && zoomLevel === 1 && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm">
              Hover to zoom
            </div>
          )}

          {/* main media navigation arrows for mobile */}
          {isMobile && images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </button>
            </>
          )}
        </div>

        <div className="relative px-2">
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scroll-hide scrollbar-hide p-1"
            style={{ scrollBehavior: "smooth" }}
          >
            {media.map((item, index) => (
              <button
                key={`${item.type}-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-red-500"
                    : "border-gray-200 hover:border-red-500/50"
                }`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      className="w-full h-full object-fill"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg">
                      <PlayCircle />
                    </span>
                  </>
                ) : (
                  <Image
                    src={item.src || images[0]?.image}
                    alt={`${productName} thumbnail`}
                    fill
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          {/* MOBILE FIX: Hidden on mobile (sm:flex) to avoid horizontal scrolling overflow issues */}
          {images.length > 4 && (
            <>
              <button
                onClick={() => scrollGallery("left")}
                className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 border shadow-sm hover:bg-muted hover:cursor-pointer rounded-full p-1.5 transition-colors hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollGallery("right")}
                className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 border shadow-sm hover:bg-muted hover:cursor-pointer rounded-full p-1.5 transition-colors hidden sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              onClick={() => setShowFullscreen(false)}
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            <Image
              src={currentMedia?.src}
              alt={productName}
              fill
              className="object-contain select-none"
              style={{ userSelect: "none" }}
            />

            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 overflow-x-auto max-w-md">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 rounded border-2 overflow-hidden transition-colors ${
                      selectedImageIndex === index
                        ? "border-white"
                        : "border-white/50"
                    }`}
                  >
                    <Image
                      src={img.image || staticImages.emptyImage}
                      alt={`Thumbnail ${index + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
