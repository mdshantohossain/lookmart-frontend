"use client";
import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProcessedVariantKeyType, ProductType, SelectedVariantType } from "@/types";
import Image from "next/image";
import renderStars from "@/components/generateStarts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { useProcessColorAndSize } from "@/hooks/useProcessColorAndSize";
import RelatedProducts from "@/components/page/product-detail/RelatedProducts";
import ProductReview from "@/components/page/product-detail/ProductReview";
import ProductImageGallery from "@/components/page/product-detail/ProductImageGallery";

interface ProductDetailProps {
   product: ProductType;
   relatedProducts: ProductType[];
}

export default function ProductDetail({product, relatedProducts}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariantType | null>(null);
  const [selectedVariantKey, setSelectedVariantKey] =
    useState<ProcessedVariantKeyType>({} as ProcessedVariantKeyType);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // hooks
  const { isExistsOnCart, addToCart } = useCart();
  const { isExistsOnWishlist, addWishlist } = useWishlist();
  const router = useRouter();

  // process color and size of variants
  const { processedVariants, firstVariant, firstColor, first_variant_keys } =
    useProcessColorAndSize(product?.variants);

  const isExistedToCart = isExistsOnCart(product?.id || 0);
  const isWishlisted = isExistsOnWishlist(product?.id || 0);

  // default variant when first render
  useEffect(() => {
    if (!firstVariant) return;

    setSelectedColor(firstColor);
    setSelectedVariantKey(first_variant_keys);
    setSelectedSize(first_variant_keys?.variant_key.split("-")[1] || first_variant_keys?.variant_key);
    setSelectedVariant(firstVariant);
  }, [firstVariant, firstColor, first_variant_keys]);

  // when selected image change
  useEffect(() => {
    if (!selectedVariant) return;

    if (selectedVariant.default) {
      setSelectedVariantKey(selectedVariant.default);
      setSelectedSize(selectedVariant.default.variant_key.split("-")[1] || selectedVariant.default.variant_key);
      return;
    }

    const variants = Object.values(selectedVariant.sizes || {});
    if (!variants.length) return;

    const matched =
      variants.find((v) => {
        const size = v.variant_key.split("-")[1] || ''
        if(size === selectedSize) return v
        
       return v.variant_key === selectedVariantKey.variant_key
      }) ||
      variants[0];

    setSelectedVariantKey(matched);
    setSelectedSize(matched.variant_key.split("-")[1] || matched.variant_key);

  }, [selectedVariant]);

  const allImages = useMemo(() => {
    if (!product) return [];

    return [
      { image: product.image_thumbnail },
      ...(product.other_images || []),
    ];
  }, [product?.image_thumbnail, product?.other_images]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (!product) return notFound();

  // handle add to cart
  const handleAddToCart = (product: ProductType) => {
    if (!isExistedToCart) {
      addToCart({
        product_id: product.id,
        name: product.name,
        price:
          Number(selectedVariantKey.selling_price) || product.selling_price,
        image: product.image_thumbnail,
        slug: product.slug,
        quantity: quantity,
        vid: selectedVariantKey.vid,
        variant_id: selectedVariantKey.id,
        variant_key: selectedVariantKey?.variant_key,
        variants: processedVariants,
      });
    }
  };

  const handleShopNow = (product: ProductType) => {
    handleAddToCart(product);
    return router.push("/checkout");
  };

  // handle add to wishlist
  const addToWishlist = (product: ProductType) => {
    if (isExistsOnWishlist(product.id)) return;
    addWishlist(product);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground flex flex-wrap gap-1 items-center">
          <span>Home</span> <span className="mx-1">›</span>
          <span>Products</span> <span className="mx-1">›</span>
          <span className="text-foreground line-clamp-1 max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          {/* Product Image Gallery */}
          <ProductImageGallery
            images={allImages}
            productName={product.name}
            isMobile={isMobile}
            video_thumbnail={product.video_thumbnail}
          />

          {/* Product details */}
          <div className="space-y-6 order-2">
            <div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-balance">
                {product.name}
              </span>

              <div className="flex items-center gap-4 mb-4 flex-wrap mt-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {renderStars(product.reviews_avg_rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews_count} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500">
                  ${product.selling_price}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-lg sm:text-xl text-muted-foreground line-through">
                      ${product.original_price}
                    </span>
                    {product.discount && (
                      <Badge variant="destructive">
                        {product.discount} Off
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {product.short_description}
            </p>

            <div className="space-y-4 pt-4 border-t">
              {/* Color selector */}
              {Object.keys(processedVariants).length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">
                    Color ({selectedColor})
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(processedVariants).map((v, index) => {
                      const [color, variant] = v;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setSelectedColor(color);
                          }}
                          className={`relative group transition-all hover:cursor-pointer`}
                        >
                          <div
                            className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                              selectedColor === color
                                ? "border-red-500"
                                : "border-gray-200 hover:border-red-500/50"
                            }`}
                          >
                            <Image
                              src={variant.image}
                              alt={color}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {selectedVariant?.sizes &&
                Object.keys(selectedVariant?.sizes).length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedVariant?.sizes).map(
                        ([size, variantKeys], index) => {
                          return (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedSize(size);
                                setSelectedVariantKey(variantKeys);
                              }}
                              className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium  hover:cursor-pointer ${
                                selectedSize === size
                                  ? "border-red-500 bg-red-500 text-white"
                                  : "border-gray-200 bg-transparent hover:border-gray-400"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="pt-6 space-y-4">
              <div>
                {/* MOBILE FIX: Changed flex layout to better handle small screens */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Quantity Row */}
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        className="h-10 w-10 rounded-l-lg hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-12 text-center font-medium text-lg">
                        {quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        className="h-10 w-10 rounded-r-lg hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons Grid - Stacks nicely on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 w-full">
                    <Button
                      disabled={isExistedToCart}
                      onClick={() => handleAddToCart(product)}
                      size="lg"
                      className={`text-base w-full h-10 cursor-pointer ${
                        isExistedToCart
                          ? "bg-green-200 text-green-600 hover:bg-green-100"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {" "}
                      {isExistedToCart ? (
                        <>
                          <ShoppingBag className="w-5 h-6 mr-2" /> In Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 mr-2" /> Add to Cart
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleShopNow(product)}
                      size="lg"
                      className="text-base w-full bg-red-500 hover:bg-red-600 h-10"
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-white" />
                      <span className="text-white">Buy Now</span>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 w-full sm:w-12 border-gray-300 hover:bg-gray-50"
                      disabled={isWishlisted}
                      onClick={() => addToWishlist(product)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        )}
                      />
                      {/* Show text only on mobile since icon is alone on desktop */}
                      <span className="ml-2 sm:hidden">Wishlist</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 border-t">
              {product.policies.map((policy, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-2 text-sm"
                >
                  {policy.image ? (
                    <Image
                      src={policy.image}
                      width={16}
                      height={16}
                      alt={policy.title}
                    />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  )}

                  <span>{policy.title}</span>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Category:</strong> {product.category.name}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full grid grid-cols-2 max-w-md mb-4">
            <TabsTrigger value="description" className="hover:cursor-pointer">
              Description
            </TabsTrigger>
            <TabsTrigger value="reviews" className="hover:cursor-pointer">
              Reviews ({product.reviews_count})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-2">
            <Card>
              <CardContent className="p-4 sm:p-6">
                {/* MOBILE FIX: 'prose' class + max-w-full ensures images inside description scale down */}
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.long_description,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <ProductReview reviews={product.reviews} />
        </Tabs>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
