// src/components/home/ProductList.tsx
"use client";

import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  material?: string;
};

export default function ProductList({
  products,
  category,
  onAdd,
}: {
  products?: Product[];             // ถ้าส่งมาจากภายนอก
  category?: string | null;         // หมวดที่ต้องการแสดง (null = all)
  onAdd?: (p: Product) => void;     // ฟังก์ชันเพิ่มตะกร้า (optional)
}) {
  // ถ้า caller ไม่ส่ง products เข้ามา ให้ใช้ default list (fallback)
  const defaultProducts: Product[] = [
    { id: "shirt-black", name: "เสื้อยืด-สีดำ", price: 499, category: "เสื้อ", image: "/products/shirt.jpg" },
    { id: "polo", name: "เสื้อโปโล", price: 499, category: "เสื้อ", image: "/products/เสื้อโปโล.jpg" },
    { id: "jeans", name: "กางเกงยีนส์", price: 799, category: "กางเกง", image: "/products/jeans.jpg" },
    { id: "cargo", name: "กางเกงคาร์โก้", price: 699, category: "กางเกง", image: "/products/กางเกงคาร์โก้.jpg" },
    { id: "belt", name: "เข็มขัดหนัง", price: 199, category: "เครื่องประดับ", image: "/products/leather belt.jpg" },
    { id: "ring", name: "แหวนเงิน", price: 199, category: "เครื่องประดับ", image: "/products/ring.jpg" },
    { id: "watch", name: "นาฬิกา", price: 399, category: "เครื่องประดับ", image: "/products/watch.webp" },
  ];

  const list = products ?? defaultProducts;

  // กรองตาม category ถ้ามี
  const visible = category ? list.filter((p) => p.category === category) : list;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (visible.length === 0) {
    return <div className="text-center text-gray-500 py-10">ไม่พบสินค้าหมวดนี้</div>;
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {visible.map((p) => (
            <div key={p.id} onClick={() => setSelectedProduct(p)} className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all bg-white">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-700">{p.price.toLocaleString()} ฿</p>
            </div>
          ))}
        </div>
      </div>

      {/* modal details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative shadow-xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-2 right-2 text-gray-600 text-2xl">✕</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded" />
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="mt-2 text-xl font-semibold text-gray-800">{selectedProduct.price.toLocaleString()} ฿</p>
                <p className="mt-4 text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                <p className="mt-2 text-sm text-gray-500">วัสดุ: {selectedProduct.material}</p>

                <button
                  onClick={() => {
                    try {
                      if (typeof onAdd === "function") onAdd(selectedProduct);
                      else {
                        // fallback: เก็บ localStorage แบบง่ายๆ
                        const raw = localStorage.getItem("cart") || "[]";
                        const cart = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
                        const idx = cart.findIndex((it: any) => it.id === selectedProduct.id);
                        if (idx >= 0) cart[idx].qty = (cart[idx].qty || 1) + 1;
                        else cart.push({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image ?? null, qty: 1 });
                        localStorage.setItem("cart", JSON.stringify(cart));
                        const totalCount = cart.reduce((s: number, i: any) => s + (i.qty || 0), 0);
                        window.dispatchEvent(new CustomEvent("cart-changed", { detail: { count: totalCount } }));
                      }
                    } catch (err) {
                      console.error(err);
                    }
                    setSelectedProduct(null);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  เพิ่มสินค้าในตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
