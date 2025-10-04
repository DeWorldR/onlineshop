// src/components/layout/Header.tsx
"use client";

import { Search, User, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  // total เก็บจำนวนสินค้า — เริ่มต้น 0 เสมอ (deterministic for SSR)
  const [total, setTotal] = useState<number>(0);
  // mounted: ถ้า true แสดง badge / ค่า dynamic ได้ (ป้องกัน SSR mismatch)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      // อ่าน localStorage เฉพาะฝั่ง client
      const raw = localStorage.getItem("cart");
      if (!raw) {
        setTotal(0);
        return;
      }
      const cart = JSON.parse(raw);
      // คำนวณจำนวนรวม (ถ้าตามโครงคือ array ของ items)
      const count = Array.isArray(cart)
        ? cart.reduce((s: number, it: any) => s + (it.quantity || 1), 0)
        : 0;
      setTotal(count);
    } catch (e) {
      setTotal(0);
    }
  }, []);

  const handleUserClick = () => {
    if (session) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <header id="site-header" className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 shadow">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="w-1/3" />

        <div className="w-1/3 text-center">
          <h1 className="text-2xl font-bold tracking-widest">ONLINESHOP</h1>
        </div>

        <div className="w-1/3 flex justify-end gap-4 items-center">
          <button aria-label="Search" className="p-1">
            <Search className="w-5 h-5" />
          </button>

          <button aria-label="Account" onClick={handleUserClick} className="p-1">
            <User className="w-5 h-5" />
          </button>

          <button aria-label="Favorites" className="p-1">
            <Star className="w-5 h-5" />
          </button>

          {/* Link ไปที่ /cart — อย่าใส่จำนวน dynamic ที่ต่างกับ SSR จนกว่าจะ mounted */}
          <Link
            href="/cart"
            className="relative inline-flex items-center p-1 rounded bg-indigo-700 hover:bg-indigo-800"
            aria-label={`Go to cart (${mounted ? total : 0})`}
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {/* แสดงคำว่า "Cart" เสมอ (deterministic) เพื่อหลีกเลี่ยง mismatch,
                แต่ถ้าต้องการซ่อนคำตอน SSR ให้ใช้ same approach (show only when mounted) */}
            <span className="sr-only">Cart</span>

            {/* แสดง badge ก็ต่อเมื่อ mounted แล้ว เพื่อไม่ให้ server/client mismatch */}
            {mounted && total > 0 && (
              <span className="ml-2 absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {total}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
