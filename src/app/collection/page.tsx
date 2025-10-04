"use client";
import ProductList from "@/components/home/ProductList";
import { useCart } from "@/components/cart/CartProvider";

export default function CollectionPage() {
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
    <div>
      <ProductList onAdd={handleAdd} />
    </div>
  );
}
