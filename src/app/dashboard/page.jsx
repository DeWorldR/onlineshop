"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (!current) {
      router.push("/signin");
    } else {
      setUser(current);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        สวัสดีคุณ {user.name} 👋
      </h1>
      <p className="text-gray-700 mb-6">
        บทบาทของคุณ:{" "}
        <span className="font-semibold text-blue-600">
          {user.role === "seller" ? "ผู้ขาย" : "ผู้ซื้อ"}
        </span>
      </p>

      <button
        onClick={handleLogout}
        className="px-6 py-2 border border-blue-600 text-blue-700 rounded-lg hover:bg-blue-100 transition-all"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}
