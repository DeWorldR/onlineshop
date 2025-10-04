"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-3">
       MJU SHOP
      </h1>
      <p className="text-gray-600 mb-8">
        ยินดีต้อนรับสู่แพลตฟอร์มซื้อขายออนไลน์สำหรับผู้ซื้อและผู้ขาย
      </p>
      <div className="flex gap-4">
        <Link
          href="/signin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-all"
        >
          เข้าสู่ระบบ
        </Link>
        <Link
          href="/signup"
          className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-100 transition-all"
        >
          สมัครสมาชิก
        </Link>
      </div>
    </main>
  );
}
