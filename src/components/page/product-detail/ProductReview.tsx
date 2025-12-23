"use client";
import CheckoutAuthModal from "@/components/modals/checkout-modal/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/features/hooks";
import { ReviewType } from "@/types";
import images from "@/utils/images";
import { Star, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductReview({ reviews }: { reviews: ReviewType[] }) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // hooks
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewRating(0);
    setReviewText("");
    setReviewerName("");
    setReviewerEmail("");
  };
  return (
   <>
    <TabsContent value="reviews" className="mt-2">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-6">Reviews</h3>
              <div className="space-y-6">
                {reviews &&
                  reviews?.map((review: ReviewType) => (
                    <div
                      key={review.id}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={review?.user?.profile_photo || images.userIcon}
                          alt={review?.user?.name ?? review?.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">
                              {review?.user?.name || review?.name}
                            </h4>
                            <p className="text-xs text-muted-foreground italic">
                              {review.created_at}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < Number(review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed break-words">
                          {review.message}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg sm:text-xl font-semibold mb-6">
                Add a review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewRating(i + 1)}
                      className="p-1 transition-transform active:scale-95"
                    >
                      <Star
                        className={`h-6 w-6 sm:h-8 sm:w-8 ${
                          i < reviewRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <Textarea
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-[120px] resize-none text-sm"
                  required
                />

                {isAuthenticated ? (
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={!reviewRating || !reviewText.trim()}
                  >
                    Submit Review
                  </Button>
                ) : (
                  <div className="flex flex-wrap gap-1 text-sm">
                    <span className="text-gray-600">
                      Please log in to place a review.
                    </span>
                    <button
                      type="button"
                      className="text-red-500 font-bold hover:underline"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Login
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
     {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] px-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <CheckoutAuthModal />
          </div>
        </div>
      )}
    
    </>
  );
}
