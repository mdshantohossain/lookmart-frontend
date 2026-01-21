"use client";
import { Suspense } from "react";

import VerifyEmailContent from "./VerifyEmailContent";
import Loading from "@/app/loading";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
