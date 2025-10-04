// src/components/ProductCard.tsx
"use client";
import React from "react";

type Props = {
  id: string;
  title: string;
  price?: number | string | null;
  images?: string[]; // data URLs หรือ URLs
  description?: string;
};

const PLACEHOLDER = "/placeholder.png"; // วางไฟล์ placeholder.png ลง public/ หรือ เปลี่ยนเป็น data-url

export default function ProductCard({ id, title, price, images, description }: Props) {
  const firstImage = images && images.length > 0 ? images[0] : PLACEHOLDER;
  const priceNum = typeof price === "number" ? price : Number(price);
  const priceText = Number.isFinite(priceNum) ? `${priceNum.toLocaleString()} ฿` : "-";

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = PLACEHOLDER;
  }

  return (
    <div className="border rounded overflow-hidden bg-white">
      <div className="relative h-44 bg-gray-100">
        <img
          src={firstImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImgError}
        />
        {images && images.length > 1 && (
          <div className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-0.5 rounded shadow">
            +{images.length - 1}
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="font-medium">{title}</div>
        {description ? <div className="text-xs text-gray-500 mt-1">{description}</div> : null}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold">{priceText}</div>
          <button className="px-3 py-1 border rounded text-sm">ดูรายละเอียด</button>
        </div>
      </div>
    </div>
  );
}
