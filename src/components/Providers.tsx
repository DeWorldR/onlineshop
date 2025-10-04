// src/components/Providers.tsx
"use client";

import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
// เปลี่ยนมา import จาก folder cart (barrel) — ปลอดภัยกว่าถ้าคุณมี src/components/cart/index.ts
import { CartProvider } from "@/components/cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function updateTopOffset() {
      try {
        const header = document.getElementById("site-header");
        const nav = document.getElementById("site-nav");
        const h = header ? header.getBoundingClientRect().height : 0;
        const n = nav ? nav.getBoundingClientRect().height : 0;
        const total = Math.round(h + n + 8);
        document.documentElement.style.setProperty("--site-top-offset", `${total}px`);
      } catch {
        document.documentElement.style.setProperty("--site-top-offset", "112px");
      }
    }

    updateTopOffset();
    window.addEventListener("resize", updateTopOffset);
    return () => window.removeEventListener("resize", updateTopOffset);
  }, []);

  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
