// src/app/collection/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/components/home/ProductList";
import { useCart } from "@/components/cart/CartProvider";

// แยกเนื้อหาออกมาใน component ย่อย
function CollectionContent() {
  const search = useSearchParams();
  const categoryParam = search?.get("cat") ?? null;
  const { add } = useCart();

  function handleAdd(product: any) {
    add({
      id: product.id,
      title: product.name,
      price: Number(product.price) || 0,
      quantity: 1,
      image: product.image,
    });
  }

  const onlyCategory = categoryParam && categoryParam !== "" ? categoryParam : null;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">
          {onlyCategory ? `หมวด: ${onlyCategory}` : "สินค้าทั้งหมด"}
        </h1>
        <ProductList onAdd={handleAdd} onlyCategory={onlyCategory} />
      </main>
    </div>
  );
}

// component หลักที่ใส่ <Suspense>
export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">กำลังโหลด...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
