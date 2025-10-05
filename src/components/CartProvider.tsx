// "use client";
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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

  // load from localStorage on client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.error("cart load err", e);
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      // notify other tabs
      try {
        const bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cart_channel") : null;
        if (bc) bc.postMessage({ type: "cart-update", cart });
      } catch {}
      // custom event for Header to update badge etc.
      window.dispatchEvent(new CustomEvent("cart-changed", { detail: { count: cart.reduce((s, i) => s + i.quantity, 0) } }));
    } catch (e) {
      console.error("cart save err", e);
    }
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
  const update = (id: string, quantity: number) =>
    setCart((s) => s.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  const clear = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider value={{ cart, add, remove, update, clear, totalItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
