"use client";

import { ShoppingBag, Heart, User, Star, LogOut } from "lucide-react";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ใช้ Header + Navbar เดียวกับหน้า Home */}
      <Header />
    <div className="pt-16">
        <Navbar />
    </div>
     

      {/* Hero Section */}
      <section className="bg-black text-white text-center py-20">
        <p className="uppercase tracking-widest text-sm text-gray-400">
          ยินดีต้อนรับ
        </p>
        <h1 className="text-4xl font-bold mt-2">SIRAWUT</h1>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Orders */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">ผลิตภัณฑ์ของคุณ</h2>
          <div className="flex items-start gap-3 text-gray-700">
            <ShoppingBag className="mt-1" />
            <div>
              <p className="font-medium">คำสั่งซื้อ</p>
              <p className="text-sm text-gray-500">ยังไม่ได้ทำการสั่งซื้อ</p>
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">ชิ้นงานที่คัดสรรมาเป็นพิเศษ</h2>
          <div className="flex items-start gap-3 text-gray-700">
            <Star className="mt-1" />
            <div>
              <p className="font-medium">รายการโปรด</p>
              <p className="text-sm text-gray-500">รายการโปรดของคุณจะแสดงในหน้านี้</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">บริการ</h2>
          <div className="flex items-start gap-3 text-gray-700">
            <User className="mt-1" />
            <div>
              <p className="font-medium">การดูแลและบริการ</p>
              <p className="text-sm text-gray-500">
                มีบริการช่วยเหลือและดูแลผลิตภัณฑ์โดยเฉพาะ
              </p>
            </div>
          </div>
        </div>
      </main>

        {/* Footer */} 
        <Footer />
    </div>
  );
}
