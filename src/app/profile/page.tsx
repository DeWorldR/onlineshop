// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ProductCard";
import AddProductModal, { NewProduct } from "@/components/AddProductModal";
import { ShoppingBag, User } from "lucide-react";

const STORAGE_KEY = "my_products_v1";

type Purchase = {
  id: string;
  title: string;
  date: string; // ISO or readable
  amount: number;
  status?: string;
};

export default function ProfilePage() {
  // products ที่ผู้ใช้ลงขาย (จาก localStorage)
  const [products, setProducts] = useState<NewProduct[]>([]);
  const [open, setOpen] = useState(false);

  // mock purchase history (คุณอาจเปลี่ยนให้ fetch จาก API)
  const [purchases, setPurchases] = useState<Purchase[]>([
    // ตัวอย่างข้อมูล (ถ้าต้องการ ให้ลบ/replace ด้วย API)
    {
      id: "ord_001",
      title: "เสื้อเชิ้ตผ้าลินิน",
      date: new Date().toISOString(),
      amount: 1290,
      status: "จัดส่งแล้ว",
    },
    {
      id: "ord_002",
      title: "นาฬิกาข้อมือคลาสสิค",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      amount: 8950,
      status: "รอตรวจสอบ",
    },
  ]);

  // load products จาก localStorage (client-side)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
    } catch (e) {
      setProducts([]);
    }
  }, []);

  // persist products เมื่อเปลี่ยน (optional)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      // ignore
    }
  }, [products]);

  function handleAdd(p: NewProduct) {
    setProducts((s) => [p, ...s]);
  }

  function handleDelete(id: string) {
    if (!confirm("ต้องการลบสินค้านี้หรือไม่?")) return;
    setProducts((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="pt-16">
        <Navbar />
      </div>

      {/* HERO */}
      <section className="bg-black text-white text-center pt-20 pb-24">
        <p className="uppercase tracking-widest text-sm text-gray-300">ยินดีต้อนรับ</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 tracking-tight">
          SIRAWUT
        </h1>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* top row: heading + add product button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">สินค้าที่คุณลง</h2>
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-5 py-2 rounded shadow hover:opacity-95"
          >
            ลงขายสินค้าใหม่
          </button>
        </div>

        {/* MAIN GRID: left (orders), center (purchase history), right (sales history) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* left column: quick links / orders */}
          <div>
            <h3 className="text-lg font-semibold mb-6">ผลิตภัณฑ์ของคุณ</h3>

            <div className="border-t pt-6">
              <div className="flex items-start gap-3 text-gray-700">
                <div className="p-2 border rounded text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">คำสั่งซื้อ</p>
                  <p className="text-sm text-gray-500">ยังไม่มีคำสั่งซื้อ</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <ul className="space-y-4 text-sm text-gray-700">
              <li>
                <a className="underline">ประวัติบัญชี</a>
              </li>
              <li>
                <a className="underline">ที่อยู่จัดส่ง</a>
              </li>
              <li>
                <a className="underline">การตั้งค่า</a>
              </li>
            </ul>
          </div>

          {/* center column: ประวัติการซื้อ (purchase history) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ประวัติการซื้อ</h3>
            <p className="text-sm text-gray-500 mb-6">
              รายการสั่งซื้อที่ผ่านมา — แสดงรายการซื้อล่าสุดของคุณ
            </p>

            {purchases.length === 0 ? (
              <div className="text-gray-500">ยังไม่มีการสั่งซื้อ</div>
            ) : (
              <ul className="space-y-4">
                {purchases.map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center justify-between border rounded p-4 bg-white shadow-sm"
                  >
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(it.date).toLocaleString()} · {it.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{it.amount.toLocaleString()} ฿</div>
                      <button className="text-xs text-blue-600 mt-2">ดูรายละเอียด</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* right column: ประวัติการขาย (สินค้าที่ลง) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ประวัติการขาย</h3>
            <p className="text-sm text-gray-500 mb-6">
              สินค้าที่คุณลงขาย (แสดงรายการ/สถานะการขาย)
            </p>

            {products.length === 0 ? (
              <div className="text-gray-500">ยังไม่มีสินค้าที่ลงขาย</div>
            ) : (
              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p.id} className="flex items-start gap-4 border rounded p-3 bg-white">
                    <div className="w-24 h-24 bg-gray-100 overflow-hidden rounded">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{p.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{p.price.toLocaleString()} ฿</div>
                          <div className="text-xs text-gray-400 mt-2">ลงขายแล้ว</div>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(p.id);
                            alert("Copy id: " + p.id);
                          }}
                          className="text-xs px-2 py-1 border rounded"
                        >
                          Copy id
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-xs px-2 py-1 border rounded text-red-600"
                        >
                          ลบสินค้า
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddProductModal open={open} onClose={() => setOpen(false)} onAdd={handleAdd} />
    </div>
  );
}
