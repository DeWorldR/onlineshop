// src/components/CreateProductForm.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  onCreated?: () => void;
};

export default function CreateProductForm({ onCreated }: Props) {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState("");

  if (status === "loading") return null;
  if (!session) return <p className="text-sm text-red-600">กรุณาเข้าสู่ระบบเพื่อลงสินค้า</p>;

  const owner = session.user?.email ?? session.user?.name ?? "anonymous";

  function reset() {
    setTitle("");
    setPrice("");
    setImage("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || price === "") return alert("กรุณากรอกชื่อและราคา");

    const product = {
      id: `${Date.now()}`,
      title: title.trim(),
      price: Number(price),
      image: image.trim() || null,
      owner,
      createdAt: new Date().toISOString(),
    };

    const key = `products:${owner}`;
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(product);
    localStorage.setItem(key, JSON.stringify(arr));

    reset();
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <label className="block">
        <div className="text-sm font-medium mb-1">ชื่อสินค้า</div>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" placeholder="เช่น เสื้อเชิ้ตคลาสสิก" required />
      </label>

      <label className="block">
        <div className="text-sm font-medium mb-1">ราคา (บาท)</div>
        <input value={price} onChange={(e)=>setPrice(e.target.value === "" ? "" : Number(e.target.value))} type="number" className="w-full p-2 border rounded" placeholder="1290" required />
      </label>

      <label className="block">
        <div className="text-sm font-medium mb-1">ลิงก์รูป (URL) (option)</div>
        <input value={image} onChange={(e)=>setImage(e.target.value)} className="w-full p-2 border rounded" placeholder="https://..." />
      </label>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">ลงขาย</button>
      </div>
    </form>
  );
}
