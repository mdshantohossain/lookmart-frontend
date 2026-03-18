"use client";

import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { Card } from "@/components/ui/card";
import { useVerifyOrder } from "@/services/api/verify-payment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../loading";

export default function ParmentErrorPage() {
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data: res, isPending } = useVerifyOrder(token!);

  useEffect(() => {
    if (!res) return;

    if (res.success) {
      setValid(true);
      setMessage(res.message);
    } else {
      router.replace("/");
    }
  }, [res]);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid order token");
      router.replace("/");
    }
  }, [token, router, valid]);

  if (isPending) return <Loading />;

  if (!valid) return null;

  return (
    <div className="flex items-center justify-center px-4 py-10 bg-background">
      <Card className="w-full max-w-md">
        <FormSubmissionSuccess
          icon="circle-x"
          title="Payment Unsuccessful"
          message={message}
          buttonTitle="Go to dashboard"
          href={() => router.replace("/dashboard/order")}
        />
      </Card>
    </div>
  );
}
