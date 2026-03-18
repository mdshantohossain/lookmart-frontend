"use client";

import { Card } from "@/components/ui/card";
import RegisterContent from "./RegisterContent";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <RegisterContent />
      </Card>
    </div>
  );
}
