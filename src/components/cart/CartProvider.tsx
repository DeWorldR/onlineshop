// src/components/cart/CartProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  totalAmount: number;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // load from storage (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // normalize
        const normalized = parsed.map((it: any) => ({
          id: String(it.id),
          title: String(it.title ?? ""),
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 1,
          image: it.image ?? undefined,
        }));
        setCart(normalized);
      }
    } catch (e) {
      console.error("cart load err", e);
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("cart save err", e);
    }
  }, [cart]);

  const add = (item: CartItem) =>
    setCart((s) => {
      const found = s.find((i) => i.id === item.id);
      if (found) {
        return s.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...s, item];
    });

  const remove = (id: string) => setCart((s) => s.filter((i) => i.id !== id));
  const update = (id: string, quantity: number) =>
    setCart((s) => s.map((i) => (i.id === id ? { ...i, quantity } : i)));
  const clear = () => setCart([]);

  const totals = useMemo(() => {
    const totalItems = cart.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);
    const totalAmount = cart.reduce((sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.price) || 0), 0);
    return { totalItems, totalAmount };
  }, [cart]);

  const value: CartCtx = {
    cart,
    add,
    remove,
    update,
    clear,
    totalItems: totals.totalItems,
    totalAmount: totals.totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
