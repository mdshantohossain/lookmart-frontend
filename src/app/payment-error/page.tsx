"use client";

import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ParmentErrorPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/");
  //   }
  // }, [token, router]);

  // if (!token) return null;

  return (
    <div className="flex items-center justify-center px-4 py-10 bg-background">
      <Card className="w-full max-w-md">
        <FormSubmissionSuccess
          icon="circle-x"
          title="Payment Unsuccessful"
          message="Your payment was not successful. Your order has been created but is currently unpaid. You can retry the payment anytime from your dashboard."
          buttonTitle="Retry Payment"
          href={() => router.replace("/checkout")}
        />
      </Card>
    </div>
  );
}
