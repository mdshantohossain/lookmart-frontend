"use client";

import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="bg-background">{children}</div>;
}
