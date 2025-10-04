// src/components/cart/Cart.tsx
"use client";
import { useCart } from "@/components/cart";
import Image from "next/image";

export default function Cart() {
  const { cart, update, remove, clear, totalItems } = useCart();
  const total = cart.reduce((s,i)=>s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return <div className="text-center py-10">ตะกร้าว่าง — <a href="/collection" className="text-blue-600">ไปเลือกสินค้า</a></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {cart.map(it => (
        <div key={it.id} className="flex items-center gap-4 border p-3 rounded mb-3">
          <img src={it.image || "/placeholder.png"} alt={it.title} className="w-20 h-20 object-cover" />
          <div className="flex-1">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-gray-500">฿{it.price.toLocaleString()}</div>
          </div>
          <input type="number" min={1} value={it.quantity} onChange={(e)=>update(it.id, Math.max(1, Number(e.target.value)||1)) } className="w-20 border rounded p-1 text-center" />
          <button onClick={()=>remove(it.id)} className="px-3 py-1 bg-red-500 text-white rounded">ลบ</button>
        </div>
      ))}

      <div className="mt-4 flex justify-between items-center">
        <div className="font-bold">รวม: ฿{total.toLocaleString()}</div>
        <div className="flex gap-2">
          <button onClick={()=>clear()} className="px-4 py-2 border rounded">ล้างตะกร้า</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">ชำระเงิน</button>
        </div>
      </div>
    </div>
  )
}
