"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  material?: string;
  category?: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  qty: number;
};

const STORAGE_KEY = "cart";

function ProductCard({ product, onClick }: { product: Product; onClick: (p: Product) => void }) {
  return (
    <div onClick={() => onClick(product)} className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.price.toLocaleString()} ฿</p>
      <div className="text-xs text-gray-500 mt-1">หมวด: {product.category ?? "อื่นๆ"}</div>
    </div>
  );
}

/**
 * props:
 * - onAdd?: callback when adding to cart
 * - category?: string to filter (one category)
 * - collectionIds?: array of product ids (explicit set)
 */
export default function ProductList({ onAdd, category, collectionIds }: { onAdd?: (p: Product) => void; category?: string | null; collectionIds?: string[] | null }) {
  const products: Product[] = [
    { id: "shirt-black", name: "เสื้อยืด-สีดำ", price: 499, image: "/products/shirt.jpg", description: "เสื้อยืดผ้าฝ้าย", material: "ผ้าฝ้าย", category: "เสื้อ" },
    { id: "polo", name: "เสื้อโปโล", price: 499, image: "/products/เสื้อโปโล.jpg", description: "เสื้อโปโล", material: "ผ้า Cotton", category: "เสื้อ" },
    { id: "jeans", name: "กางเกงยีนส์", price: 799, image: "/products/jeans.jpg", description: "กางเกงยีนส์", material: "Denim", category: "กางเกง" },
    { id: "cargo", name: "กางเกงคาร์โก้", price: 699, image: "/products/กางเกงคาร์โก้.jpg", description: "กางเกงคาร์โก้", material: "Twill", category: "กางเกง" },
    { id: "belt", name: "เข็มขัดหนัง", price: 199, image: "/products/leather belt.jpg", description: "เข็มขัดหนัง", material: "หนังแท้", category: "เครื่องประดับ" },
    { id: "ring", name: "แหวนเงิน", price: 199, image: "/products/ring.jpg", description: "แหวนเงิน", material: "เงิน", category: "เครื่องประดับ" },
    { id: "watch", name: "นาฬิกา", price: 399, image: "/products/watch.webp", description: "นาฬิกา", material: "สแตนเลส", category: "นาฬิกา" },
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ถ้ามี collectionIds ให้ใช้เฉพาะ id เหล่านั้น (ลำดับไม่สำคัญ)
  let filtered: Product[] = products;
  if (Array.isArray(collectionIds) && collectionIds.length > 0) {
    filtered = products.filter((p) => collectionIds.includes(p.id));
  } else if (category) {
    filtered = products.filter((p) => p.category === category);
  }

  function fallbackAddToCart(product: Product) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || "[]";
      const parsed = JSON.parse(raw);
      const cart: CartItem[] = Array.isArray(parsed) ? parsed : [];

      const idx = cart.findIndex((it) => it.id === product.id);
      if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image ?? null, qty: 1 });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      const totalCount = cart.reduce((s, i) => s + i.qty, 0);
      window.dispatchEvent(new CustomEvent("cart-changed", { detail: { count: totalCount } }));
      try {
        const bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cart_channel") : null;
        if (bc) bc.postMessage({ type: "cart-update", cart });
      } catch {}
    } catch (err) {
      console.error("fallbackAddToCart error", err);
    }
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-semibold mb-6">
          {collectionIds && collectionIds.length > 0 ? "คอลเลคชัน" : category ? `หมวด: ${category}` : "สินค้า"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative shadow-xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">✕</button>

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
                      else fallbackAddToCart(selectedProduct);
                    } catch (err) {
                      console.error("onAdd error", err);
                      fallbackAddToCart(selectedProduct);
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
