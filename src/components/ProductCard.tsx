// src/components/ProductCard.tsx (ตัวอย่างย่อ)
import React from "react";

export default function ProductCard({
  id,
  title,
  price,
  image,
  description,
  category,
}: {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  description?: string;
  category?: string;
}) {
  return (
    <div className="border rounded overflow-hidden shadow-sm bg-white">
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <div className="font-medium text-lg">{title}</div>
        {description && <div className="text-sm text-gray-500 mt-1">{description}</div>}
        <div className="mt-3 flex items-center justify-between">
          <div className="font-semibold">{price.toLocaleString()} ฿</div>
          <button className="text-sm px-3 py-1 border rounded">ดู</button>
        </div>
      </div>
    </div>
  );
}
