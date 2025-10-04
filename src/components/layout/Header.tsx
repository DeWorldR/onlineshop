"use client";
import { Search, User, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [total, setTotal] = useState(0);

  // ตัวอย่างจำลองดึงจำนวนสินค้าในตะกร้า (จาก localStorage)
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setTotal(cart.length);
  }, []);

  const handleUserClick = () => {
    if (session) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="w-1/3"></div>
        <div className="w-1/3 text-center">
          <h1 className="text-2xl font-bold tracking-widest">ONLINESHOP</h1>
        </div>
        <div className="w-1/3 flex justify-end gap-4 items-center">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" onClick={handleUserClick} />
          <Star className="w-5 h-5 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 text-gray-200 cursor-pointer" />
          <Link
            href="./cart"
            className="bg-indigo-700 text-white px-3 py-1 rounded flex items-center"
          >
            Cart
            <span className="ml-2 bg-red-500 rounded-full px-2 text-sm">
              {total}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
