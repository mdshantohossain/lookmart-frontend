"use client";

import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex items-center justify-center px-4 py-10 bg-background">
      <Card className="w-full max-w-md">
        <FormSubmissionSuccess
          title="Payment Successful 🎉"
          message="Your order has been placed successfully. We’ve received your payment and your order is now being processed. You can track your order status from your dashboard."
          buttonTitle="Go to Dashboard"
          href={() => router.replace("/dashboard/order")}
        />
      </Card>
    </div>
  );
}
