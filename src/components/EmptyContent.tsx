"use client"
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  image: StaticImageData;
  title: string;
  message: string;
  buttonText?: string;
  href?: string;
};

export default function EmptyContent({
  image,
  title,
  message,
  buttonText,
  href,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-15 relative mx-auto text-muted-foreground mb-4">
            <Image src={image} fill alt={message} />
          </div>

          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{message}</p>
          <Button onClick={() => router.push(href || "/")} className="hover:cursor-pointer">
            {buttonText || "Continue Shopping"}
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
