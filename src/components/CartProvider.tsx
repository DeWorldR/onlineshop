// src/components/CartProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image?: string | null;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setItems([]);
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
