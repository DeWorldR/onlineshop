// src/components/home/ProductList.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

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

const STORAGE_KEY = "my_products_v1"; // ต้องตรงกับที่คุณเก็บใน Profile/AddProductModal
const FALLBACK_LOCAL_CART_KEY = "cart";

function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: (p: Product) => void;
}) {
  return (
    <div
      onClick={() => onClick(product)}
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.price.toLocaleString()} ฿</p>
      {product.category ? <div className="text-xs text-gray-400 mt-1">หมวด: {product.category}</div> : null}
    </div>
  );
}

/**
 * ProductList
 * - onAdd? optional: ถ้ามี จะเรียกเมื่อกดปุ่มเพิ่มในตะกร้า (ใช้กับ CartContext)
 * - optional prop `onlyCategory` ถ้าต้องการให้หน้าที่เรียกแสดงเฉพาะหมวด
 */
export default function ProductList({
  onAdd,
  onlyCategory,
}: {
  onAdd?: (p: Product) => void;
  onlyCategory?: string | null;
}) {
  // built-in products (your default catalog)
  const builtIn: Product[] = [
    { id: "shirt-black", name: "เสื้อยืด-สีดำ", price: 499, image: "/products/shirt.jpg", description: "เสื้อยืดผ้าฝ้ายเนื้อนุ่ม", material: "ผ้าฝ้าย 100%", category: "เสื้อ" },
    { id: "polo", name: "เสื้อโปโล", price: 499, image: "/products/เสื้อโปโล.jpg", description: "เสื้อโปโลคอตั้ง", material: "ผ้า Cotton", category: "เสื้อ" },
    { id: "jeans", name: "กางเกงยีนส์", price: 799, image: "/products/jeans.jpg", description: "กางเกงยีนส์ทรงตรง", material: "Denim 100%", category: "กางเกง" },
    { id: "cargo", name: "กางเกงคาร์โก้", price: 699, image: "/products/กางเกงคาร์โก้.jpg", description: "กางเกงคาร์โก้", material: "Twill", category: "กางเกง" },
    { id: "belt", name: "เข็มขัดหนัง", price: 199, image: "/products/leather belt.jpg", description: "เข็มขัดหนังแท้", material: "หนังแท้", category: "เครื่องประดับ" },
    { id: "ring", name: "แหวนเงิน", price: 199, image: "/products/ring.jpg", description: "แหวนเงินแท้", material: "เงิน 92.5%", category: "เครื่องประดับ" },
    { id: "watch", name: "นาฬิกา", price: 399, image: "/products/watch.webp", description: "นาฬิกาข้อมือ", material: "สแตนเลส", category: "นาฬิกา" },
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  // load products from localStorage (user added)
  useEffect(() => {
    function loadFromStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setUserProducts([]);
          return;
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          setUserProducts([]);
          return;
        }
        // normalize to Product shape - support legacy `image` or `images` fields
        const normalized = parsed.map((it: any) => ({
          id: String(it.id ?? `${Date.now()}-${Math.random()}`),
          name: String(it.title ?? it.name ?? "Untitled"),
          price: Number(it.price) || 0,
          image: Array.isArray(it.images) ? it.images[0] ?? it.image ?? undefined : it.image ?? undefined,
          description: it.description ?? "",
          material: it.material ?? "",
          category: it.category ?? "อื่นๆ",
        })) as Product[];
        setUserProducts(normalized);
      } catch (err) {
        console.error("load user products failed", err);
        setUserProducts([]);
      }
    }

    loadFromStorage();

    // listen for custom event dispatched by other pages/components after add/delete
    const onCustom = () => loadFromStorage();
    window.addEventListener("my_products_changed", onCustom as EventListener);

    // storage event for cross-tab sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadFromStorage();
    };
    window.addEventListener("storage", onStorage);

    // BroadcastChannel (if used)
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        bc = new BroadcastChannel("my_products_channel");
        bc.onmessage = () => loadFromStorage();
      }
    } catch {}

    return () => {
      window.removeEventListener("my_products_changed", onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
      if (bc) bc.close();
    };
  }, []);

  // merge built-in + user (user should override if ids collide)
  const merged = useMemo(() => {
    const map = new Map<string, Product>();
    for (const p of builtIn) map.set(p.id, p);
    for (const p of userProducts) map.set(p.id, p); // user adds/overrides
    return Array.from(map.values());
  }, [builtIn, userProducts]);

  // optional filter by category (onlyCategory prop)
  const visible = useMemo(() => {
    if (!onlyCategory) return merged;
    return merged.filter((p) => (p.category ?? "").toLowerCase() === onlyCategory.toLowerCase());
  }, [merged, onlyCategory]);

  // fallback add to cart (localStorage) if onAdd not provided
  function fallbackAddToCart(product: Product) {
    try {
      const raw = localStorage.getItem(FALLBACK_LOCAL_CART_KEY) || "[]";
      const parsed = JSON.parse(raw);
      const cart: CartItem[] = Array.isArray(parsed) ? parsed : [];

      const idx = cart.findIndex((it) => it.id === product.id);
      if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image ?? null,
          qty: 1,
        });
      }

      localStorage.setItem(FALLBACK_LOCAL_CART_KEY, JSON.stringify(cart));
      const totalCount = cart.reduce((s, i) => s + i.qty, 0);
      window.dispatchEvent(new CustomEvent("cart-changed", { detail: { count: totalCount } }));
    } catch (err) {
      console.error("fallbackAddToCart error", err);
    }
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {visible.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} onClick={setSelectedProduct} />
              {/* ถ้าต้องการปุ่มเพิ่มตรงการ์ด ให้ใส่ปุ่มนี้ */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    if (typeof onAdd === "function") {
                      try {
                        onAdd(p);
                      } catch (err) {
                        console.error("onAdd failed:", err);
                        fallbackAddToCart(p);
                      }
                    } else {
                      fallbackAddToCart(p);
                    }
                  }}
                  className="px-3 py-2 bg-indigo-600 text-white rounded text-sm"
                >
                  เพิ่มในตะกร้า
                </button>
                <button onClick={() => setSelectedProduct(p)} className="px-3 py-2 border rounded text-sm">ดูสินค้า</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
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
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      if (typeof onAdd === "function") {
                        onAdd(selectedProduct);
                      } else {
                        fallbackAddToCart(selectedProduct);
                      }
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    เพิ่มในตะกร้า
                  </button>
                  <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 border rounded">ปิด</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
