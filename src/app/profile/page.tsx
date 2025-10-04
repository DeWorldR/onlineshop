// src/app/profile/page.tsx
"use client";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MyProductsLocal from "@/components/MyProductsLocal";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="pt-16">
        <Navbar />
      </div>

      <section className="bg-black text-white text-center py-20">
        <p className="uppercase tracking-widest text-sm text-gray-400">ยินดีต้อนรับ</p>
        <h1 className="text-4xl font-bold mt-2">SIRAWUT</h1>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* ส่วนโปรไฟล์อื่น ๆ */}
        <MyProductsLocal />
      </main>

      <Footer />
    </div>
  );
}
