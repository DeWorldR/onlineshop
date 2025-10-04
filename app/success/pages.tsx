"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-sky-800 mb-4">✅ การสั่งซื้อสำเร็จ</h1>
        <p className="text-gray-700 mb-6">
          ขอบคุณสำหรับการสั่งซื้อของคุณ!<br />
          ระบบได้บันทึกข้อมูลเรียบร้อยแล้ว
        </p>

        <Link
          href="/"
          className="inline-block bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          กลับไปหน้าแรก
        </Link>
      </div>
    </div>
  );
}
