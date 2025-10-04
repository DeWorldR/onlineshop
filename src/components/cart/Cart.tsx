// src/components/cart/Cart.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { cart, update, remove, clear, totalItems, totalAmount } = useCart();
  const router = useRouter();

  // defensive: ensure numbers
  const safeTotalAmount = typeof totalAmount === "number" && Number.isFinite(totalAmount) ? totalAmount : 0;

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold">ตะกร้าว่าง</h2>
        <p className="mt-2">
          <a href="/collection" className="text-indigo-600 hover:underline">
            ไปเลือกสินค้า
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">ตะกร้าของคุณ ({totalItems})</h2>

      <div className="space-y-3">
        {cart.map((it) => (
          <div key={it.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow transition">
            <div className="flex items-center gap-3">
              {/* if use next/image ensure it has valid src; fallback to img tag if external */}
              {it.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.image} alt={it.title} width={80} height={80} className="rounded object-contain" />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>
              )}
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-500">
                  ฿{it.price} x {it.quantity}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={it.quantity}
                onChange={(e) => {
                  const q = Math.max(1, Number(e.target.value) || 1);
                  update(it.id, q);
                }}
                className="w-20 border p-1 rounded text-center"
              />
              <button onClick={() => remove(it.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-4 mt-4">
        <div className="font-bold text-lg">รวมทั้งหมด: ฿{safeTotalAmount.toLocaleString()}</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              clear();
              router.push("/collection");
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ล้างตะกร้า
          </button>
          <button onClick={() => router.push("/checkout")} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            ชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}
