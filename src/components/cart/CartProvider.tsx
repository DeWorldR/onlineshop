// src/components/cart/CartProvider.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartCtx = {
  cart: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("cart_v1", JSON.stringify(cart)); }
    catch {}
  }, [cart]);

  const add = (item: CartItem) => {
    setCart((s) => {
      const found = s.find((i) => i.id === item.id);
      if (found) {
        return s.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...s, item];
    });
  };

  const remove = (id: string) => setCart((s) => s.filter((i) => i.id !== id));
  const update = (id: string, quantity: number) => setCart((s) => s.map((i) => (i.id === id ? { ...i, quantity } : i)));
  const clear = () => setCart([]);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return <CartContext.Provider value={{ cart, add, remove, update, clear, totalItems }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
