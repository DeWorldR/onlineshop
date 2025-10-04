"use client";

import { useEffect, useRef, useState } from "react";

export type NewProduct = {
  id: string;
  title: string;
  price: number;
  images?: string[]; // array of data-urls or external urls
  description?: string;
  category?: string;
  createdAt?: string;
};

export default function AddProductModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (p: NewProduct) => void;
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("แฟชั่น");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]); // dataURL or url
  const fileRef = useRef<HTMLInputElement | null>(null);

  // CONFIG
  const MAX_FILES = 4; // สูงสุดรูปต่อสินค้า
  const MAX_TOTAL_BYTES = 2.5 * 1024 * 1024; // ประมาณ 2.5 MB สำหรับรวมทุกภาพ (ปรับได้)
  const MAX_WIDTH = 1200; // ย่อกว้างสูงสุด
  const DEFAULT_QUALITY = 0.7; // jpeg quality 0..1

  useEffect(() => {
    if (!open) clearForm();
  }, [open]);

  function clearForm() {
    setTitle("");
    setPrice("");
    setCategory("แฟชั่น");
    setDescription("");
    setImages([]);
    if (fileRef.current) fileRef.current.value = "";
  }

  // helper: convert File -> dataURL (compressed via canvas)
  async function fileToCompressedDataUrl(file: File, maxWidth = MAX_WIDTH, quality = DEFAULT_QUALITY) {
    // read as blob/url -> create Image element
    const dataUrl = await new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(String(reader.result));
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

    // create image
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const image = new Image();
      image.onload = () => res(image);
      image.onerror = rej;
      image.src = dataUrl;
    });

    // scale keeping aspect ratio
    const scale = Math.min(1, maxWidth / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    // draw and export as jpeg
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", quality);
  }

  // approximate bytes from base64 dataURL
  function approxBytesFromDataUrl(dataUrl: string) {
    // strip prefix "data:*/*;base64,"
    const idx = dataUrl.indexOf("base64,");
    const b64 = idx >= 0 ? dataUrl.slice(idx + 7) : dataUrl;
    // approx bytes = (length * 3) / 4
    return Math.ceil((b64.length * 3) / 4);
  }

  // handle picking files (compress & limit)
  async function onFilesPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // limit how many more images allowed
    const allowedSlots = Math.max(0, MAX_FILES - images.length);
    if (allowedSlots <= 0) {
      alert(`คุณสามารถอัปโหลดได้สูงสุด ${MAX_FILES} รูปต่อสินค้า`);
      return;
    }

    const incoming = Array.from(files).slice(0, allowedSlots);

    // check current total size estimate
    let currentTotal = images.reduce((acc, src) => acc + approxBytesFromDataUrl(src), 0);

    for (const file of incoming) {
      try {
        // compress file
        let dataUrl = await fileToCompressedDataUrl(file, MAX_WIDTH, DEFAULT_QUALITY);

        // if too large, try reducing quality progressively
        let approx = approxBytesFromDataUrl(dataUrl);
        let q = DEFAULT_QUALITY;
        while (currentTotal + approx > MAX_TOTAL_BYTES && q > 0.25) {
          q = q - 0.15; // reduce quality
          dataUrl = await fileToCompressedDataUrl(file, MAX_WIDTH, q);
          approx = approxBytesFromDataUrl(dataUrl);
        }

        // if still too big after compression, skip or warn
        if (currentTotal + approx > MAX_TOTAL_BYTES) {
          const proceed = confirm(
            "รูปนี้จะทำให้พื้นที่เก็บข้อมูลเต็ม — ต้องการบันทึกโดยไม่รวมรูปนี้หรือไม่? (OK = ข้ามรูป, Cancel = ยกเลิกการอัปโหลด)"
          );
          if (!proceed) break;
          continue; // skip this file
        }

        setImages((s) => [...s, dataUrl]);
        currentTotal += approx;
      } catch (err) {
        console.error("Failed to read/compress file", err);
        alert("อ่าน/บีบอัดไฟล์ไม่สำเร็จหนึ่งไฟล์ — ข้ามไฟล์นั้นไป");
      }
    }

    // reset file input so same file can be reselected later
    if (fileRef.current) fileRef.current.value = "";
  }

  // add image by URL (external)
  function addUrlImage(url: string) {
    if (!url) return;
    // do a quick size check by head request is not possible here; just append
    if (images.length >= MAX_FILES) {
      alert(`จำกัด ${MAX_FILES} รูปต่อสินค้า`);
      return;
    }
    setImages((s) => [...s, url]);
  }

  function removeImageAt(i: number) {
    setImages((s) => s.filter((_, idx) => idx !== i));
  }

  function sanitizeNumberInput(v: string) {
    // allow digits and dot
    return v.replace(/[^0-9.]/g, "");
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return alert("กรุณาใส่ชื่อสินค้า");
    const priceNum = parseFloat(price || "0");
    const finalPrice = Number.isFinite(priceNum) ? priceNum : 0;

    const p: NewProduct = {
      id:
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title: title.trim(),
      price: finalPrice,
      images: images,
      description: description.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    console.log("NEW PRODUCT (to add):", { ...p, imagesCount: p.images?.length });
    onAdd(p);
    onClose();
    clearForm();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-3xl bg-white rounded shadow-lg p-6">
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-600">✕</button>
        <h3 className="text-lg font-semibold mb-4">ลงขายสินค้าใหม่</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ชื่อสินค้า</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 border rounded px-3 py-2" placeholder="เช่น เสื้อเชิ้ตคลาสสิก" />

            <div className="flex gap-3 mt-3">
              <div className="flex-1">
                <label className="block text-sm font-medium">ราคา (บาท)</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(sanitizeNumberInput(e.target.value))}
                  className="w-full mt-1 border rounded px-3 py-2"
                  placeholder="0"
                />
              </div>

              <div className="w-40">
                <label className="block text-sm font-medium">หมวดหมู่</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 border rounded px-2 py-2">
                  <option value="แฟชั่น">แฟชั่น</option>
                  <option value="รองเท้า">รองเท้า</option>
                  <option value="เครื่องประดับ">เครื่องประดับ</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
            </div>

            <label className="block text-sm font-medium mt-4">รูปสินค้า (อัปโหลด หลายรูป)</label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFilesPicked} className="mt-1" />
            <p className="text-xs text-gray-500 mt-1">สูงสุด {MAX_FILES} รูป; รวมไม่เกิน ~{Math.round(MAX_TOTAL_BYTES/1024)} KB</p>

            <label className="block text-sm font-medium mt-4">ลิงก์รูป (เพิ่มแบบ URL)</label>
            <UrlAdder onAdd={addUrlImage} />

            <label className="block text-sm font-medium mt-4">คำอธิบาย (option)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full mt-1 border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">พรีวิวรูป (คลิกปุ่มลบเพื่อเอาออก)</label>
            <div className="mt-2 grid grid-cols-2 gap-3 max-h-[420px] overflow-auto">
              {images.length === 0 ? (
                <div className="col-span-2 text-sm text-gray-500 italic">ยังไม่มีรูป</div>
              ) : (
                images.map((src, i) => (
                  <div key={i} className="relative group border rounded overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`img-${i}`} className="w-full h-40 object-cover" />
                    <div className="absolute top-1 right-1 flex gap-1">
                      <button type="button" onClick={() => removeImageAt(i)} className="bg-white/90 text-sm px-2 py-0.5 rounded">ลบ</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">ยกเลิก</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">ลงขายสินค้า</button>
        </div>
      </form>
    </div>
  );
}

// helper component for adding url images
function UrlAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2 mt-1">
      <input placeholder="https://..." value={v} onChange={(e) => setV(e.target.value)} className="flex-1 border rounded px-2 py-1" />
      <button type="button" onClick={() => { if (!v) return; onAdd(v); setV(""); }} className="px-3 py-1 border rounded">เพิ่ม</button>
    </div>
  );
}
