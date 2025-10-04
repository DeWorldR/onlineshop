// "use client";
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/cart/CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
