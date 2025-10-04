// src/components/ProductCard.tsx
"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

type Props = {
  id: string;
  title: string;
  price?: number | null;
  image?: string | null;
  description?: string | null;
  onView?: (id: string) => void;
};

export default function ProductCard({ id, title, price, image, description, onView }: Props) {
  // ป้องกัน undefined
  const priceNumber = typeof price === "number" && !isNaN(price) ? price : 0;

  return (
    <article className="bg-white rounded shadow-sm overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-52 object-cover" />
      ) : (
        <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
          No image
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        {description ? <p className="text-sm text-gray-500 mt-1">{description}</p> : null}

        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold">
            {priceNumber.toLocaleString()} ฿
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(id)}
              className="inline-flex items-center gap-2 px-3 py-1 border rounded text-sm"
            >
              <ShoppingBag className="w-4 h-4" /> ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
