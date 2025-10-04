"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../cart"; // ✅ ต้องมี Cart Context (เช่น useCart Hook)

export default function Cart() {
  const { cart, update, remove, clear } = useCart();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // 🧺 ถ้าตะกร้าว่าง
  if (cart.length === 0)
    return (
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold">ตะกร้าว่าง</h2>
        <p className="mt-2">
          <Link href="/products" className="text-indigo-600 hover:underline">
            ไปเลือกสินค้า
          </Link>
        </p>
      </div>
    );

  // 🛒 ถ้ามีสินค้า
  return (
    <div className="bg-white p-6 rounded shadow space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">ตะกร้าของคุณ</h2>

      {/* รายการสินค้า */}
      <div className="space-y-3">
        {cart.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:shadow transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src={it.image}
                alt={it.title}
                width={80}
                height={80}
                className="rounded object-contain"
              />
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-500">
                  ฿{it.price} x {it.quantity}
                </div>
              </div>
            </div>

            {/* ส่วนแก้จำนวน / ลบ */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={it.quantity}
                onChange={(e) =>
                  update(it.id, Math.max(1, Number(e.target.value) || 1))
                }
                className="w-20 border p-1 rounded text-center"
              />
              <button
                onClick={() => remove(it.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* รวมทั้งหมด */}
      <div className="flex justify-between items-center border-t pt-4 mt-4">
        <div className="font-bold text-lg">รวมทั้งหมด: ฿{total.toLocaleString()}</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              clear();
              router.push("/products");
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ล้างตะกร้า
          </button>
          <button
            onClick={() => router.push("/checkout")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}
