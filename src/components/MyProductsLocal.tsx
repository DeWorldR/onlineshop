// src/components/MyProductsLocal.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CreateProductForm from "./CreateProductForm";

type Product = {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  owner?: string;
  createdAt?: string;
};

export default function MyProductsLocal() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const owner = session?.user?.email ?? session?.user?.name ?? "anonymous";

  useEffect(() => {
    if (status === "loading") return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function load() {
    setLoading(true);
    try {
      const raw = localStorage.getItem(`products:${owner}`);
      const arr = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(arr) ? arr : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id: string) {
    if (!confirm("ลบสินค้านี้จริงหรือไม่?")) return;
    const raw = localStorage.getItem(`products:${owner}`);
    const arr = raw ? JSON.parse(raw) : [];
    const filtered = (arr || []).filter((p: Product) => p.id !== id);
    localStorage.setItem(`products:${owner}`, JSON.stringify(filtered));
    load();
  }

  if (status === "loading") return null;
  if (!session) {
    return (
      <div>
        <p className="text-sm text-gray-600">กรุณาเข้าสู่ระบบเพื่อจัดการสินค้าของคุณ</p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">ลงขายสินค้าใหม่</h3>
          <CreateProductForm onCreated={load} />
        </div>

        <div className="md:w-2/3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">สินค้าที่คุณลง ({items.length})</h3>
            <button onClick={load} className="text-sm text-blue-600">รีเฟรช</button>
          </div>

          {loading ? (
            <p>กำลังโหลด...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-500">ยังไม่มีสินค้าที่ลงขาย</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((p) => (
                <div key={p.id} className="border rounded overflow-hidden bg-white">
                  {p.image ? (
                    // image preview: use native <img> for localStorage url
                    <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                  )}

                  <div className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">{p.title}</h4>
                        <div className="text-sm text-gray-500 mt-1">{p.price.toLocaleString()} ฿</div>
                        <div className="text-xs text-gray-400 mt-1">ลงเมื่อ: {p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(p.id)} className="text-xs text-gray-600">Copy id</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600">ลบ</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
