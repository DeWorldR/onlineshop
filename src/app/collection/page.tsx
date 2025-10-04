// src/app/collection/page.tsx
"use client";

import ProductList from "@/components/home/ProductList";
import { useCart } from "@/components/cart"; // hook ที่เราสร้างไว้
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CollectionPage() {
  const { add } = useCart();

  function handleAdd(product: any) {
    // normalize item -> CartItem
    add({
      id: product.id,
      title: product.name,
      price: Number(product.price) || 0,
      quantity: 1,
      image: product.image,
    });
  }

  return (
    <div>
      <Header />
      <div className="pt-16"><Navbar /></div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <ProductList onAdd={handleAdd} />
      </main>

      <Footer />
    </div>
  );
}
