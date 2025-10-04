"use client";

import { useSearchParams } from "next/navigation";
import ProductList from "@/components/home/ProductList";
import { useCart } from "@/components/cart/CartProvider";

export default function CollectionPage() {
  const params = useSearchParams();
  const category = params?.get("category") ?? null;
  const collection = params?.get("collection") ?? null; // e.g. "autumn2025"

  // map collection-slug -> product ids (ตัวอย่าง)
  let collectionIds: string[] | null = null;
  if (collection === "autumn2025") {
    // ตัวอย่าง: เซ็ต = 1 เสื้อ + 1 กางเกง + 1 เครื่องประดับ
    collectionIds = ["shirt-black", "jeans", "ring"];
  } else if (collection === "summer2025") {
    collectionIds = ["polo", "cargo", "belt"];
  }

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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <ProductList category={category} collectionIds={collectionIds} onAdd={handleAdd} />
    </div>
  );
}
