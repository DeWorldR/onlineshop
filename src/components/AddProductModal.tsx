"use client";

import { useEffect, useState } from "react";

export type NewProduct = {
  id: string;
  title: string;
  price: number;
  image?: string | null; // data URL หรือ URL
  description?: string;
  category?: string;
  createdAt?: string;
};

export default function AddProductModal({
  open,
  onClose,
  onAdd,
  categories = ["แฟชั่น", "เครื่องประดับ", "นาฬิกา", "แว่นตา", "น้ำหอม"],
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (p: NewProduct) => void;
  categories?: string[];
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string | number>("1290");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState(""); // alternative URL input (optional)
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // เมื่อเปลี่ยนไฟล์ ให้แปลงเป็น data URL เพื่อ preview
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(String(reader.result));
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  // ถ้า modal ปิด ให้เคลียร์ฟอร์ม
  useEffect(() => {
    if (!open) {
      setTitle("");
      setPrice("1290");
      setImageFile(null);
      setImagePreview(null);
      setImageURL("");
      setDescription("");
      setCategory(categories[0] ?? "");
      setError(null);
    }
  }, [open, categories]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("กรุณากรอกชื่อสินค้า");
      return;
    }
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      setError("กรุณากรอกราคาเป็นตัวเลขที่ถูกต้อง");
      return;
    }
    if (!category) {
      setError("กรุณาเลือกหมวดหมู่");
      return;
    }

    setSubmitting(true);

    try {
      // ถ้ามี imageFile ให้แปลงเป็น dataURL (ถ้ายังไม่มี preview)
      let finalImage: string | null = null;
      if (imagePreview) {
        finalImage = imagePreview;
      } else if (imageURL) {
        finalImage = imageURL;
      } else {
        finalImage = null;
      }

      const newProduct: NewProduct = {
        id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        title: title.trim(),
        price: numericPrice,
        image: finalImage,
        description: description.trim() || undefined,
        category,
        createdAt: new Date().toISOString(),
      };

      // callback ให้ parent เก็บ (ProfilePage จะใส่เข้า localStorage)
      onAdd(newProduct);

      // ปิด modal
      onClose();
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    // portal จะดีกว่า แต่เรียบง่ายก็เรนเดอร์ตรงนี้ก็ได้
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-8">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
        aria-hidden
      />

      {/* modal */}
      <div className="relative z-60 w-full max-w-2xl bg-white rounded shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold">ลงขายสินค้าใหม่</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">ชื่อสินค้า</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="เช่น เสื้อเชิ้ตคลาสสิก"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">ราคา (บาท)</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="numeric"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">รูปสินค้า (อัปโหลด)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">(หรือวาง URL ด้านล่าง)</div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">ลิงก์รูป (option)</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="https://..."
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">คำอธิบาย (option)</label>
              <textarea
                rows={4}
                className="w-full border rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {imagePreview && (
              <div className="col-span-2">
                <div className="text-sm font-medium mb-1">ภาพตัวอย่าง</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="preview" className="w-48 h-48 object-cover rounded border" />
              </div>
            )}
          </div>

          {error && <div className="text-sm text-red-600 mt-3">{error}</div>}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-60"
            >
              {submitting ? "กำลังบันทึก..." : "ลงขายสินค้า"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
